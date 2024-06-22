var tiempoInactividad = 420000; // 7 minutos en milisegundos
var timeout;

function iniciarTemporizador() {
    timeout = setTimeout(cerrarSesion, tiempoInactividad);
}

function reiniciarTemporizador() {
    clearTimeout(timeout);
    iniciarTemporizador();
}

document.addEventListener("mousemove", reiniciarTemporizador);
document.addEventListener("keydown", reiniciarTemporizador);

function cerrarSesion() {
    localStorage.clear('token')
    localStorage.clear('identity')
    window.location.href = "/Coriport/src/app/views/Login/login.html";
}

iniciarTemporizador();
