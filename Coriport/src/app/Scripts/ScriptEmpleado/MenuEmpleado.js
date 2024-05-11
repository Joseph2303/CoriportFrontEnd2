window.addEventListener('load', function () {
  var preloader = document.querySelector('.preloader');

  preloader.classList.add('hide');

  setTimeout(function () {
    preloader.style.display = 'none';
  }, 600);
});


function mostrarEmergente() {
   getUser() 
  document.getElementById('pantallaEmergente').style.display = 'flex';
}

function cerrarEmergente() {
  document.getElementById('pantallaEmergente').style.display = 'none';
}

function getUser() {
  
  let usuario = JSON.parse(localStorage.getItem('identity'))
  // Obtener referencias a los elementos HTML
  const nombreElement = document.getElementById('nombre');
  const puestoElement = document.getElementById('puesto');
  const emailElement = document.getElementById('email');
  const cedulaElement = document.getElementById('cedula');


  // Llenar los elementos HTML con los datos del localStorage
  nombreElement.textContent = usuario.empleado.nombre + ' ' + usuario.empleado.apellido1 + ' ' + usuario.empleado.apellido2;
  puestoElement.textContent = usuario.empleado.puesto.puesto;
  emailElement.textContent = usuario.email;
  cedulaElement.textContent = usuario.empleado.cedula;


}