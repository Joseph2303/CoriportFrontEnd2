function mostrarMensajeDeInfo(mensaje) {
    // Crear un contenedor específico para mensajes de error

    const nuevoContenedor = document.createElement('div');
    nuevoContenedor.id = 'contenedor-errores';
    nuevoContenedor.style.position = 'fixed';
    nuevoContenedor.style.top = '0';
    nuevoContenedor.style.left = '0';
    nuevoContenedor.style.width = '100%';
    nuevoContenedor.style.backgroundColor = 'rgba(39, 183, 245, 0.8)';
    nuevoContenedor.style.color = 'white';
    nuevoContenedor.style.padding = '10px';
    nuevoContenedor.style.zIndex = '9999';

    document.body.appendChild(nuevoContenedor);


    // Crear un div para el mensaje de error
    const divMensajeError = document.createElement('div');
    divMensajeError.textContent = mensaje;

    // Añadir el div del mensaje de error al contenedor
    nuevoContenedor.appendChild(divMensajeError);

    // Eliminar el mensaje de error después de cierto tiempo (por ejemplo, 5 segundos)
    setTimeout(function () {
        nuevoContenedor.remove();
    }, 6000);

}


function mostrarMensajeDeError(mensaje) {
    // Crear un contenedor específico para mensajes de error

    const nuevoContenedor = document.createElement('div');
    nuevoContenedor.id = 'contenedor-errores';
    nuevoContenedor.style.position = 'fixed';
    nuevoContenedor.style.top = '0';
    nuevoContenedor.style.left = '0';
    nuevoContenedor.style.width = '100%';
    nuevoContenedor.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    nuevoContenedor.style.color = 'white';
    nuevoContenedor.style.padding = '10px';
    nuevoContenedor.style.zIndex = '9999';

    document.body.appendChild(nuevoContenedor);


    // Crear un div para el mensaje de error
    const divMensajeError = document.createElement('div');
    divMensajeError.textContent = mensaje;

    // Añadir el div del mensaje de error al contenedor
    nuevoContenedor.appendChild(divMensajeError);

    // Eliminar el mensaje de error después de cierto tiempo (por ejemplo, 5 segundos)
    setTimeout(function () {
        nuevoContenedor.remove();
    }, 6000);

}