// script.js

// Obtener elementos del DOM
const modal = document.getElementById('modalFormulario');
const btnAbrirModal = document.getElementById('btnAbrirModal');
const spanCerrar = document.getElementsByClassName('close')[0];
const formulario = document.getElementById('formularioHorario');

// Abrir el modal
btnAbrirModal.onclick = function() {
    modal.style.display = 'block';
}

// Cerrar el modal
spanCerrar.onclick = function() {
    modal.style.display = 'none';
}

// Cerrar el modal cuando el usuario hace clic fuera de él
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Agregar nuevo horario al enviar el formulario
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const empleado = document.getElementById('empleado').value;
    const horaEntrada = document.getElementById('horaEntrada').value;
    const horaSalida = document.getElementById('horaSalida').value;
    const diaLibre = document.getElementById('diaLibre').value;

    // Crear una nueva fila
    const nuevaFila = document.createElement('tr');

    // Crear la celda del nombre del empleado
    const celdaEmpleado = document.createElement('td');
    celdaEmpleado.textContent = empleado;
    nuevaFila.appendChild(celdaEmpleado);

    // Crear las celdas de los horarios
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    dias.forEach(dia => {
        const celdaHorario = document.createElement('td');
        if (dia === diaLibre) {
            celdaHorario.textContent = 'Libre';
        } else {
            celdaHorario.textContent = `${horaEntrada} - ${horaSalida}`;
        }
        nuevaFila.appendChild(celdaHorario);
    });

    // Agregar la nueva fila a la tabla
    document.querySelector('#horarioTabla tbody').appendChild(nuevaFila);

    // Limpiar el formulario
    formulario.reset();

    // Cerrar el modal
    modal.style.display = 'none';
});
