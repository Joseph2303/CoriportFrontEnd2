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






