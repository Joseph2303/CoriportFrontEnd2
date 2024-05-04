var tabla = document.getElementById("soliVacaciones-table");
var updateSoli = document.getElementById("div-form-update")
var updateBtn = document.getElementById("update");

function filtrarSoliVacaciones() {
    var inputBusqueda = document.getElementById('busquedaSoliVacaciones');
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
            mostrarMensajeDeError("¡Solo puede seleccionar una solicitud a la vez! ");

        } else {
            if (seleccionados.length > 0) {
                updateSoli.style.display = "flex";
            } else {
                updateSoli.style.display = "none";
            }
        }
    }
});

function deseleccionarCheckboxes() {
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(function (checkbox) {
        checkbox.checked = false;
    });
}


$(document).on("click", ".checkbox-accion", function () {
    let seleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    if (seleccionados.length === 1) {
    let filaSeleccionada = seleccionados[0].closest('tr');
    let fechInicio = filaSeleccionada.cells[1].textContent;
    let fechFin = filaSeleccionada.cells[2].textContent;
    document.getElementById('fechInicioUpdate').value = fechInicio;
    document.getElementById('fechFinUpdate').value = fechFin;
    }
});

updateBtn.addEventListener('click', function () {
    let seleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    let filaSeleccionada = seleccionados[0].closest('tr');

    let solicitudVacaciones = {
        id: filaSeleccionada.getAttribute('data-id'),
        fechInicio: $("#fechInicioUpdate").val(),
        fechFin: $("#fechFinUpdate").val()
    }

    updateSolicitud(solicitudVacaciones)
});