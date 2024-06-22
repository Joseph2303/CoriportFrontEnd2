const elVideo = document.getElementById('video');
const saveButton = document.getElementById('save-button');
const compareButton = document.getElementById('compare-button');
const compareButton2 = document.getElementById('compare-button2');
const employeeIdInput = document.getElementById('employee-id');

navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);

const cargarCamera = () => {
    navigator.getMedia(
        {
            video: true,
            audio: false
        },
        stream => elVideo.srcObject = stream,
        console.error
    );  
};

// Cargar Modelos
Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('/Coriport/src/app/views/Login/Face-ID/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/Coriport/src/app/views/Login/Face-ID/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/Coriport/src/app/views/Login/Face-ID/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/Coriport/src/app/views/Login/Face-ID/models'),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri('/Coriport/src/app/views/Login/Face-ID/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/Coriport/src/app/views/Login/Face-ID/models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('/Coriport/src/app/views/Login/Face-ID/models'),
]).then(cargarCamera);

elVideo.addEventListener('play', async () => {
    const canvas = faceapi.createCanvasFromMedia(elVideo);
    document.body.append(canvas);

    const displaySize = { width: elVideo.width, height: elVideo.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(elVideo)
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender()
            .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(elVideo, 0, 0, canvas.width, canvas.height);

        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }, 100);
});

saveButton.addEventListener('click', () => {
    const canvas = document.querySelector('canvas');
    promptLoginAndCheckRole().then((isAuthorized) => {
        if (isAuthorized) {
            saveImage(canvas);
        } else {
            mostrarMensajeDeError("No tienes permisos para guardar el rostro.");
        }
    });
});

function promptLoginAndCheckRole() {
    return new Promise((resolve, reject) => {
        const modal = document.getElementById("loginModal");
        const closeModal = document.getElementsByClassName("close")[0];
        const loginButton = document.getElementById("loginButton");

        modal.style.display = "block";

        closeModal.onclick = function () {
            modal.style.display = "none";
            resolve(false);
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                resolve(false);
            }
        }

        loginButton.onclick = function () {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (!email || !password) {
                alert("Email y contraseña son requeridos.");
                return;
            }

            modal.style.display = "none";
            mostrarMensajeDeInfo("Verificando datos, espere un momento...");

            let obj = {
                email: email,
                contrasena: password
            };
            let data = 'data=' + JSON.stringify(obj);

            $.ajax({
                type: "POST",
                url: "http://localhost:8000/api/user/login",
                data: data,
                success: function (respObj) {
                    const token = respObj;

                    $.ajax({
                        type: "GET",
                        url: "http://localhost:8000/api/user/getidentity",
                        headers: {
                            "beartoken": token
                        },
                        success: function (identity) {
                            if (identity['tipoUsuario'] === 'Encargado') {
                                resolve(true);
                            } else {
                                mostrarMensajeDeError("Error, solo el encargado tiene permiso de guardar.");
                                resolve(false);
                            }
                        },
                        error: function (xhr, status, error) {
                            mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
                            resolve(false);
                        }
                    });

                },
                error: function (xhr, status, error) {
                    mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
                    if (xhr.status === 500 || xhr.status === 0) {
                        mostrarMensajeDeError("El servidor no responde. Por favor, inténtalo de nuevo más tarde.");
                    }
                    resolve(false);
                }
            });
        }
    });
}



compareButton.addEventListener('click', () => {
    const canvas = document.querySelector('canvas'); // Obtener el canvas desde el DOM
    compareFace(canvas); // Pasar el canvas como argumento a compareFace
});

compareButton2.addEventListener('click', () => {
    const canvas = document.querySelector('canvas'); // Obtener el canvas desde el DOM
    compareFace2(canvas); // Pasar el canvas como argumento a compareFace
});

function saveImage(canvas) {
    const context = canvas.getContext('2d');
    const elVideo = document.getElementById('video');
    const displaySize = { width: elVideo.width, height: elVideo.height };
    const employeeId = employeeIdInput.value.trim();

    if (!employeeId) {
        alert('Por favor, introduce un ID de empleado.');
        return;
    }

    faceapi.detectSingleFace(elVideo)
        .withFaceLandmarks()
        .withFaceDescriptor()
        .then(async (detection) => {
            if (detection) {
                const resizedDetection = faceapi.resizeResults(detection, displaySize);
                const { x, y, width, height } = resizedDetection.detection.box;

                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = width;
                tempCanvas.height = height;
                const tempContext = tempCanvas.getContext('2d');
                tempContext.drawImage(elVideo, x, y, width, height, 0, 0, width, height);

                const imageData = tempCanvas.toDataURL('image/png');

                const employeeData = {
                    idEmpleado: employeeId,
                    imageData: imageData,
                    descriptor: Array.from(detection.descriptor)
                };

                let data = 'data=' + JSON.stringify(employeeData);
                const url = 'http://localhost:8000/api/faceId/store';
                console.log(employeeData);
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                }).done(function (response) {
                    mostrarMensajeDeInfo('Imagen y ID de empleado guardados en el servidor.');
                }).fail(function (xhr, status, error) {
                    console.error('Error al guardar en el servidor:', error);
                    mostrarMensajeDeError("Error al guardar en el servidor.");

                });
            } else {
                alert('No se detectó ningún rostro.');
            }
        })
        .catch(err => console.error(err));
}


function compareFace(canvas) {
    const context = canvas.getContext('2d');
    const elVideo = document.getElementById('video');
    const displaySize = { width: elVideo.width, height: elVideo.height };
    const employeeId = employeeIdInput.value.trim();

    if (!employeeId) {
        alert('Por favor, introduce un ID de empleado.');
        return;
    }

    faceapi.detectSingleFace(elVideo)
        .withFaceLandmarks()
        .withFaceDescriptor()
        .then(async (detection) => {
            if (detection) {
                const resizedDetection = faceapi.resizeResults(detection, displaySize);
                const { x, y, width, height } = resizedDetection.detection.box;

                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = width;
                tempCanvas.height = height;
                const tempContext = tempCanvas.getContext('2d');
                tempContext.drawImage(elVideo, x, y, width, height, 0, 0, width, height);

                const imageData = tempCanvas.toDataURL('image/png');
                const currentDescriptor = detection.descriptor;

                // Fetch the saved data for the employee
                const url = `http://localhost:8000/api/faceId/${employeeId}`;
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json'
                }).done(function (response) {
                    if (response && response.data) {
                        const savedDescriptor = response.data.descriptor;
                        const labeledFaceDescriptors = [
                            new faceapi.LabeledFaceDescriptors(employeeId, [new Float32Array(savedDescriptor)])
                        ];
                        
                        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

                        const bestMatch = faceMatcher.findBestMatch(currentDescriptor);
                        if (bestMatch.label === employeeId) {
                            mostrarMensajeDeInfo('Rostro coincide con el ID de empleado guardado.');
                            send2(employeeId);
                        } else {
                            mostrarMensajeDeError('Rostro no coincide con el ID de empleado guardado.');
                        }
                    } else {
                        mostrarMensajeDeError('No se encontraron datos guardados para este ID de empleado.');
                    }
                }).fail(function (xhr, status, error) {
                    console.log(xhr);
                    console.error('Error al obtener datos del servidor:', error);
                    mostrarMensajeDeError('Error al obtener datos del servidor.');
                });
            } else {
                mostrarMensajeDeError('No se detectó ningún rostro.');
            }
        })
        .catch(err => console.error(err));
}


function compareFace2(canvas) {
    const context = canvas.getContext('2d');
    const elVideo = document.getElementById('video');
    const displaySize = { width: elVideo.width, height: elVideo.height };
    const employeeId = employeeIdInput.value.trim();

    if (!employeeId) {
        mostrarMensajeDeError('Por favor, introduce un ID de empleado.');
        return;
    }

    faceapi.detectSingleFace(elVideo)
        .withFaceLandmarks()
        .withFaceDescriptor()
        .then(async (detection) => {
            if (detection) {
                const resizedDetection = faceapi.resizeResults(detection, displaySize);
                const { x, y, width, height } = resizedDetection.detection.box;

                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = width;
                tempCanvas.height = height;
                const tempContext = tempCanvas.getContext('2d');
                tempContext.drawImage(elVideo, x, y, width, height, 0, 0, width, height);

                const imageData = tempCanvas.toDataURL('image/png');
                const currentDescriptor = detection.descriptor;

                // Fetch the saved data for the employee
                const url = `http://localhost:8000/api/faceId/${employeeId}`;
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json'
                }).done(function (response) {
                    if (response && response.data) {
                        const savedDescriptor = response.data.descriptor;
                        const labeledFaceDescriptors = [
                            new faceapi.LabeledFaceDescriptors(employeeId, [new Float32Array(savedDescriptor)])
                        ];
                        
                        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

                        const bestMatch = faceMatcher.findBestMatch(currentDescriptor);
                        if (bestMatch.label === employeeId) {
                            mostrarMensajeDeInfo('Rostro coincide con el ID de empleado guardado.');
                            update2(employeeId);
                        } else {
                            mostrarMensajeDeError('Rostro no coincide con el ID de empleado guardado.');
                        }
                    } else {
                        mostrarMensajeDeError('No se encontraron datos guardados para este ID de empleado.');
                    }
                }).fail(function (xhr, status, error) {
                    console.log(xhr);
                    console.error('Error al obtener datos del servidor:', error);
                    mostrarMensajeDeError('Error al obtener datos del servidor.');
                });
            } else {
                mostrarMensajeDeError('No se detectó ningún rostro.');
            }
        })
        .catch(err => console.error(err));
}








