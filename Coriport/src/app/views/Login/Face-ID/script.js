const elVideo = document.getElementById('video');
const saveButton = document.getElementById('save-button');
const compareButton = document.getElementById('compare-button');
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
    promptPassword().then((password) => {
        if (password !== null && password === "1") {
            saveImage(canvas);
        } else {
            alert("Contraseña incorrecta. No puedes guardar el rostro.");
        }
    });
});

compareButton.addEventListener('click', () => {
    compareFace();
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

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                }).done(function (response) {
                    alert('Imagen y ID de empleado guardados en el servidor.');
                    console.log(response);
                }).fail(function (xhr, status, error) {
                    console.error('Error al guardar en el servidor:', error);
                    alert('Error al guardar en el servidor.');
                });
            } else {
                alert('No se detectó ningún rostro.');
            }
        })
        .catch(err => console.error(err));
}


async function compareFace() {
    const employeeId = employeeIdInput.value.trim();

    if (!employeeId) {
        alert('Por favor, introduce un ID de empleado.');
        return;
    }

    $.ajax({
        url: `http://localhost:8000/api/faceId/${employeeId}`,
        type: 'GET',
        success: function(responseData) {
            if (responseData.status === 200) {
                const { imageData, descriptor: storedDescriptor } = responseData.data;
                const img = new Image();
                img.src = URL.createObjectURL(new Blob([imageData]));

                img.onload = async () => {
                    const singleResult = await faceapi.detectSingleFace(elVideo).withFaceLandmarks().withFaceDescriptor();
                    if (singleResult) {
                        const faceMatcher = new faceapi.FaceMatcher([new faceapi.LabeledFaceDescriptors(employeeId, [new Float32Array(storedDescriptor)])]);
                        const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor);

                        if (bestMatch.label === employeeId) {
                            alert('El rostro coincide con el ID del empleado.');
                        } else {
                            alert('El rostro no coincide con el ID del empleado.');
                        }
                    } else {
                        alert('No se detectó ningún rostro en la imagen actual.');
                    }
                };
            } else {
                console.log(responseData)
                alert(responseData.message);
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr)
            alert('Error al comparar el rostro.');
        }
    });
}



function promptPassword() {
    return new Promise((resolve) => {
        const password = prompt("Por favor, ingrese la contraseña para guardar el rostro:");
        resolve(password);
    });
}
