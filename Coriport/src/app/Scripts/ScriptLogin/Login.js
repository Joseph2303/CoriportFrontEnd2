//////////////////////////Vistas/////////////////////////////////
const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
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
  window.addEventListener('load', function() {
		  var preloader = document.querySelector('.preloader');
		  
		  preloader.classList.add('hide');

		  setTimeout(function() {
			  preloader.style.display = 'none';
		  }, 7000); 
	  });


	function mostrarEmergente() {
		document.getElementById('pantallaEmergente').style.display = 'flex';
	}
	
	function cerrarEmergente() {
		document.getElementById('pantallaEmergente').style.display = 'none';
	}
	


	const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const captureButton = document.getElementById('captureButton');

        // Acceder a la cámara del dispositivo
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream;
            })
            .catch(function(error) {
                console.error('Error al acceder a la cámara:', error);
            });

        // Función para capturar una imagen de la cámara
        captureButton.addEventListener('click', function() {
            const context = canvas.getContext('2d');
            // Configurar el tamaño del canvas para que coincida con el tamaño del video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            // Dibujar el video en el canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            // Convertir el contenido del canvas a una URL de imagen
            const imageDataURL = canvas.toDataURL('image/jpeg');
            // Ahora puedes enviar imageDataURL como el valor de la imagen en el formulario, o realizar otras operaciones con él
            console.log(imageDataURL);
        });

        document.getElementById('myForm').addEventListener('submit', function(event) {
            event.preventDefault();
            // Aquí puedes agregar la lógica para enviar el formulario
        });