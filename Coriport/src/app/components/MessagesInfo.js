function mostrarMensajeDeInfo(mensaje) {
    const nuevoContenedor = document.createElement('div');
    nuevoContenedor.classList.add('mensaje-container', 'mensaje-info');
    nuevoContenedor.innerHTML = `
        <div class="icon-container">
            <i class="fas fa-info-circle"></i>
        </div>
        <div class="mensaje">${mensaje}</div>`;
    document.body.appendChild(nuevoContenedor);

    setTimeout(function () {
        nuevoContenedor.remove();
    }, 5000);
}

function mostrarMensajeDeError(mensaje) {
    const nuevoContenedor = document.createElement('div');
    nuevoContenedor.classList.add('mensaje-container', 'mensaje-error');
    nuevoContenedor.innerHTML = `
        <div class="icon-container">
            <i class="fas fa-exclamation-circle"></i>
        </div>
        <div class="mensaje">${mensaje}</div>`;
    document.body.appendChild(nuevoContenedor);

    setTimeout(function () {
        nuevoContenedor.remove();
    }, 5000);
}
