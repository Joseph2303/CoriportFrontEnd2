const modal = document.getElementById('modalFormulario');
const btnAbrirModal = document.getElementById('btnAbrirModal');
const spanCerrar = document.getElementsByClassName('close')[0];
const formulario = document.getElementById('formularioHorario');

var tabla = document.getElementById("horarioEmpleado-table");
var actualizarButton = document.getElementById("actualizar");
var eliminarButton = document.getElementById("eliminar"); // Agrega esta línea para seleccionar el botón de eliminar
var updateBtn = document.getElementById("update");

function filtrarHorarioEmpleado() {
    var inputBusqueda = document.getElementById('busquedaHorarioEmpleado');
    var filtro = inputBusqueda.value.toUpperCase();

    var filas = tabla.getElementsByTagName('tr');

    for (var i = 0; i < filas.length; i++) {
        if (filas[i].getElementsByTagName('th').length === 0) {
            var celdas = filas[i].getElementsByTagName('td');
            var mostrarFila = false;

            for (var j = 0; j < celdas.length; j++) {
                var textoCelda = celdas[j].textContent || celdas[j].innerText;
                if (textoCelda.toUpperCase().indexOf(filtro) > -1) {
                    mostrarFila = true;
                    break;
                }
            }
            
            filas[i].style.display = mostrarFila ? '' : 'none';
        }
    }
}

tabla.addEventListener('change', function (event) {
    let seleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    if (event.target.type === 'checkbox') {
        if (seleccionados.length > 1) {
            event.target.checked = false;

            alert('¡Solo puede seleccionar un horario a la vez!')
        } else {
            if (seleccionados.length > 0) {
                actualizarButton.style.display = 'inline-block';
                eliminarButton.style.display = 'inline-block'; // Muestra el botón de eliminar cuando se selecciona un horario
            } else {
                actualizarButton.style.display = 'none';
                eliminarButton.style.display = 'none'; // Oculta el botón de eliminar cuando no hay horarios seleccionados
            }
        }
    }
});

actualizarButton.addEventListener('click', function(){
    let seleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    let filaSeleccionada = seleccionados[0].closest('tr');
    let Empleado = filaSeleccionada.cells[1].textContent;
    let HoraEntrada = filaSeleccionada.cells[2].textContent;
    let HoraSalida = filaSeleccionada.cells[3].textContent;
    let DiaLibre = filaSeleccionada.cells[4].textContent;

    document.getElementById('empleadoHorarioUpdate').value = Empleado;
    document.getElementById('entradaHorarioUpdate').value = HoraEntrada;
    document.getElementById('salidaHorarioUpdate').value = HoraSalida;
    document.getElementById('diaLibreHorarioUpdate').value = DiaLibre;

});

eliminarButton.addEventListener('click', function(){
    document.getElementById('pantallaConfirmacion').style.display = 'flex';

});

function ocultarConfirmacion() {
    document.getElementById('pantallaConfirmacion').style.display = 'none';
}

deleteButton.addEventListener('click', function(){
    let seleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    let filaSeleccionada = seleccionados[0].closest('tr');
    let Id = filaSeleccionada.cells[0].textContent;
    destroy(Id)
});

updateBtn.addEventListener('click', function(){
    let horarioEmpleado = {
       Empleado: $("#empleadoHorarioUpdate").val(),
        HoraEntrada : $("#entradaHorarioUpdate").val(),
        HoraSalida : $("#salidaHorarioUpdate").val(),
        DiaLibre : $("#diaLibreHorarioUpdate").val()
    }
    
    updateHorario(horarioEmpleado)
});

function deseleccionarCheckboxes() {
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(function (checkbox) {
        checkbox.checked = false;
    });
}


