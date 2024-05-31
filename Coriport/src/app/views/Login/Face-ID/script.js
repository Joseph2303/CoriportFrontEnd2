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
                console.log(employeeData);
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                }).done(function (response) {
                    alert('Imagen y ID de empleado guardados en el servidor.');
                    console.log(response);
                }).fail(function (xhr, status, error) {
                    console.log(xhr);
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
    console.log('Entro a la funcion')
    const employeeId = employeeIdInput.value.trim();

    if (!employeeId) {
        alert('Por favor, introduce un ID de empleado.');
        return;
    }

    try {
        console.log('Entro al try')

        // Realizar una solicitud GET para obtener los datos del rostro almacenado en el servidor
        const responseData = await $.ajax({
            url: `http://localhost:8000/api/faceId/${employeeId}`,
            type: 'GET'
        });

        // Verificar si la solicitud fue exitosa
        if (responseData.status === 200) {
            console.log('Entro al if')

            const { imageData, descriptor: storedDescriptor } = responseData.data;

            // Crear una nueva imagen y cargar los datos de la imagen almacenada en el servidor
            const img = new Image();
            img.src = URL.createObjectURL(new Blob([imageData])) + `?t=${Date.now()}`;
 


            console.log(img.src);
            // Esperar a que la imagen se cargue completamente
            img.onload = async () => {
                console.log('entro al onload')
                console.log(elVideo);
                // Detectar el rostro en el video actual
                const singleResult = await faceapi.detectSingleFace(elVideo).withFaceLandmarks().withFaceDescriptor();
                console.log(singleResult)

                if (singleResult) {
                    console.log('entro al singleResult')

                    // Crear un FaceMatcher con el descriptor almacenado
                    const faceMatcher = new faceapi.FaceMatcher([new faceapi.LabeledFaceDescriptors(employeeId, [new Float32Array(storedDescriptor)])]);

                    // Encontrar la mejor coincidencia con el rostro detectado
                    const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor);

                    // Mostrar un mensaje dependiendo de si hay una coincidencia con el ID del empleado
                    if (bestMatch.label === employeeId) {
                        alert('El rostro coincide con el ID del empleado.');
                    } else {
                        alert('El rostro no coincide con el ID del empleado.');
                    }
                } else {
                    alert('No se detectó ningún rostro en la imagen actual.');
                }
            };
            console.log('no entro al onload')

        } else {
            console.log('Entro al else')

            // Manejar la situación donde no se encuentran datos para el ID de empleado proporcionado
            alert(responseData.message);
        }
    } catch (error) {
        console.log('Entro al catch')

        // Manejar cualquier error que pueda ocurrir durante la solicitud
        console.error(error);
        alert('Error al comparar el rostro.');
    }
}




function promptPassword() {
    return new Promise((resolve) => {
        const password = prompt("Por favor, ingrese la contraseña para guardar el rostro:");
        resolve(password);
    });
}
