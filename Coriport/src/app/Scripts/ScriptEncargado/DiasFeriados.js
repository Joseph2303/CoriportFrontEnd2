var tabla = document.getElementById("feriado-table");
var eliminarButton = document.getElementById("eliminar");
var actualizarButton = document.getElementById("actualizar");
var deleteButton = document.getElementById("delete");
var updateBtn = document.getElementById("update");

function filtrar() {
    var inputBusqueda = document.getElementById('busquedaFeriado');
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

            alert('¡Solo puede seleccionar un día feriado a la vez!')
        } else {
            if (seleccionados.length > 0) {
                actualizarButton.style.display = 'inline-block';
                eliminarButton.style.display = 'inline-block';
            } else {
                actualizarButton.style.display = 'none';
                eliminarButton.style.display = 'none';
            }

        }
    }
});

actualizarButton.addEventListener('click', function(){
    let seleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    let filaSeleccionada = seleccionados[0].closest('tr');
    let id = filaSeleccionada.cells[0].textContent;
    let fecha = filaSeleccionada.cells[1].textContent;
    let descripcion = filaSeleccionada.cells[2].textContent;
    let tipoFeriado = filaSeleccionada.cells[3].textContent;

    document.getElementById('idFeriadoUpdate').value = id;
    document.getElementById('fechaFeriadoUpdate').value = fecha;
    document.getElementById('descripcionFeriadoUpdate').value = descripcion;
    document.getElementById('tipoFeriadoUpdate').value = tipoFeriado;

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
    let id = filaSeleccionada.cells[0].textContent;
    destroy(id)
});

updateBtn.addEventListener('click', function(){
    let diaFeriado = {
        id : $("#idFeriadoUpdate").val(),
        fecha : $("#fechaFeriadoUpdate").val(),
        descripcion : $("#descripcionFeriadoUpdate").val(),
        tipoFeriado : $("#tipoFeriadoUpdate").val()
    }
    
    updateFeriado(diaFeriado)
});

function deseleccionarCheckboxes() {
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(function (checkbox) {
        checkbox.checked = false;
    });
}