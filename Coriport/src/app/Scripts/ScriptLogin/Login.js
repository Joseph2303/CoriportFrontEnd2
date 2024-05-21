//////////////////////////Vistas/////////////////////////////////
const inputs = document.querySelectorAll(".input");


function addcl() {
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl() {
	let parent = this.parentNode.parentNode;
	if (this.value == "") {
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});
//____________________________________________________//
function changeView2(view) {
	var container = document.getElementById('view-container');
	var url = 'viewsEncargados/' + view + '.php';
	fetch(url)
		.then(response => response.text())
		.then(data => {
			container.innerHTML = data;
		})
		.catch(error => {
			console.log('Error:', error);
		});
}
window.addEventListener('load', function () {
	var preloader = document.querySelector('.preloader');

	preloader.classList.add('hide');

	setTimeout(function () {
		preloader.style.display = 'none';
	}, 7000);
});


function mostrarEmergente() {
	document.getElementById('pantallaEmergente').style.display = 'flex';
}

function cerrarEmergente() {
	document.getElementById('pantallaEmergente').style.display = 'none';
}





const videoElement = document.getElementById('video');
const captureButton = document.getElementById('captureButton');
const enviarButton = document.getElementById('enviarButton');
let blob = null;
// Step 1: Access the camera
async function startCamera() {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({ video: true });
		videoElement.srcObject = stream;

		// Step 2: Record the video
		const mediaRecorder = new MediaRecorder(stream);
		let chunks = [];

		mediaRecorder.ondataavailable = function (event) {
			if (event.data.size > 0) {
				chunks.push(event.data);
			}
		};


		mediaRecorder.start();

		setTimeout(() => {
			mediaRecorder.stop();

		}, 3000); // Stop recording after 3 seconds
		mediaRecorder.onstop = function () {
			blob = new Blob(chunks, { type: 'video/webm' });
			chunks = [];

			alert("Dele enviar hpta")
		};
	} catch (error) {
		console.error('Error accessing the camera: ', error);
	}
}

function sendVideo() {
	const formData = new FormData();
	formData.append('file', blob, 'video.webm');

	fetch('http://localhost:8000/uploadfile/', {
		method: 'POST',
		body: formData
	})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);
			alert(data)
		})
		.catch(error => {
			console.error('Error:', error);
		});
}
captureButton.addEventListener('click', function () {
	startCamera();
});

enviarButton.addEventListener('click', (event)=>{
	sendVideo(blob)
});


