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
    // Creación del canvas con los elementos de la face api
    const canvas = faceapi.createCanvasFromMedia(elVideo);
    // Añadirlo al body
    document.body.append(canvas);

    // Tamaño del canvas
    const displaySize = { width: elVideo.width, height: elVideo.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        // Hacer las detecciones de cara
        const detections = await faceapi.detectAllFaces(elVideo)
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender()
            .withFaceDescriptors();

        // Ponerlas en su sitio
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        // Limpiar el canvas
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar la imagen del video en el canvas
        context.drawImage(elVideo, 0, 0, canvas.width, canvas.height);

        // Dibujar las landmarks
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

    if (localStorage.getItem(`employee_${employeeId}`)) {
        alert('Este ID de empleado ya está registrado.');
        return;
    }

    // Obtener las detecciones de cara
    faceapi.detectSingleFace(elVideo)
        .withFaceLandmarks()
        .withFaceDescriptor()
        .then(async (detection) => {
            if (detection) {
                const resizedDetection = faceapi.resizeResults(detection, displaySize);
                const { x, y, width, height } = resizedDetection.detection.box;

                // Crear un canvas temporal para recortar la imagen del rostro
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = width;
                tempCanvas.height = height;
                const tempContext = tempCanvas.getContext('2d');
                tempContext.drawImage(elVideo, x, y, width, height, 0, 0, width, height);

                // Obtener la imagen recortada como una cadena Base64
                const imageData = tempCanvas.toDataURL('image/png');

                // Guardar la imagen y el ID de empleado en el localStorage
                const employeeData = {
                    id: employeeId,
                    image: imageData,
                    descriptor: Array.from(detection.descriptor)
                };
                localStorage.setItem(`employee_${employeeId}`, JSON.stringify(employeeData));

                alert('Imagen y ID de empleado guardados en el localStorage.');
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

    const employeeData = localStorage.getItem(`employee_${employeeId}`);

    if (!employeeData) {
        alert('No se encontró ninguna imagen guardada para este ID de empleado.');
        return;
    }

    const { image: storedImage, descriptor: storedDescriptor } = JSON.parse(employeeData);

    const img = new Image();
    img.src = storedImage;

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
}

function promptPassword() {
    return new Promise((resolve) => {
        const password = prompt("Por favor, ingrese la contraseña para guardar el rostro:");
        resolve(password);
    });
}
