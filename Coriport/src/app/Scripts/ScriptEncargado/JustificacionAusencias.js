var tabla = document.getElementById("justificacion-table");
var boxStatus = document.getElementById("fondo-status")

tabla.addEventListener('change', function (event) {
    let seleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    if (event.target.type === 'checkbox') {
        if (seleccionados.length > 1) {
            event.target.checked = false;
            alert('¡Solo puede seleccionar una justificacion a la vez!')
        } else {
            if (seleccionados.length > 0) {
                boxStatus.style.display = "flex";
            } else {
                boxStatus.style.display = "none";
            }
        }
    }
});

$(document).on("click", "#empleado", function () {
    // Obtener la cadena JSON del atributo de datos
    var empleadoString = decodeURIComponent($(this).closest("tr").data("empleado"));

    // Convertir la cadena JSON a un objeto JavaScript
    var empleado = JSON.parse(empleadoString);

    var detallesHTML = `
        <table>
            <tr>
                <th>Nombre:</th>
                <td>${empleado.nombre}</td>
            </tr>
            <tr>
                <th>Apellido 1:</th>
                <td>${empleado.apellido1}</td>
            </tr>
            <tr>
                <th>Apellido 2:</th>
                <td>${empleado.apellido2}</td>
            </tr>
            <tr>
                <th>Teléfonos:</th>
                <td>${empleado.telefono1}/${empleado.telefono2}</td>
            </tr>
            <tr>
                <th>Cedula:</th>
                <td>${empleado.cedula}</td>
            </tr>
            <tr>
                <th>Fecha de contrato:</th>
                <td>${empleado.fechContrat}</td>
            </tr>
            <tr>
            <th>Email:</th>
            <td>${empleado.usuario.email}</td>
        </tr>       
             <tr>
        <th>Puesto:</th>
        <td>${empleado.puesto.puesto}</td>
    </tr>
            <!-- Agrega más filas según sea necesario -->
        </table>`;

    // Mostrar la pantalla emergente con los detalles del empleado
    $("#popup-content").html(detallesHTML);
    $("#popup").show();
});


// Evento para cerrar la pantalla emergente al hacer clic fuera de ella
$(document).mouseup(function (e) {
    var container = $("#popup");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});


function filtrar() {
    var inputBusqueda = document.getElementById('busquedaJustificacion');
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



document.getElementById("status-acept").addEventListener('click', function () {
    let seleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    if (seleccionados.length === 1) {
        let filaSeleccionada = seleccionados[0].closest('tr');

        encargado = JSON.parse(localStorage.getItem('identity'));

        let justificacionAusencias = {

            id: filaSeleccionada.cells[0].textContent,
            fechaSolicitud: filaSeleccionada.cells[1].textContent,
            fechaAusencia: filaSeleccionada.cells[2].textContent,
            archivos: filaSeleccionada.cells[3].textContent,
            justificacion: filaSeleccionada.cells[4].textContent,
            estado: 'Aceptado',
            descripcion: "Su solicitud se encuentra aceptada",
            NombreEncargado: encargado.empleado.nombre,            
            idEmpleado: filaSeleccionada.getAttribute('data-employee-id')

        };

        // Actualizar directamente el texto de las celdas
        filaSeleccionada.cells[5].textContent = justificacionAusencias.estado;
        filaSeleccionada.cells[6].textContent = justificacionAusencias.descripcion;
        filaSeleccionada.cells[7].textContent = justificacionAusencias.NombreEncargado;

        updateJustificacion(justificacionAusencias);
    }
});



document.getElementById("status-reject").addEventListener('click', function () {
    let seleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    if (seleccionados.length === 1) {
        document.getElementById("div-reject").style.display = "flex";

        document.getElementById("reject-acept-btn").addEventListener('click', function () {


            let filaSeleccionada = seleccionados[0].closest('tr');

            encargado = JSON.parse(localStorage.getItem('identity'));

            let justificacionAusencias = {
                id: filaSeleccionada.cells[0].textContent,
                fechaSolicitud: filaSeleccionada.cells[1].textContent,
                fechaAusencia: filaSeleccionada.cells[2].textContent,
                archivos: filaSeleccionada.cells[3].textContent,
                justificacion: filaSeleccionada.cells[4].textContent,
                estado: 'Rechazado',
                descripcion: $("#reject").val(),
                NombreEncargado: encargado.empleado.nombre,            
                idEmpleado: filaSeleccionada.getAttribute('data-employee-id')

            };

            updateJustificacion(justificacionAusencias);
        });

    }
});


function deseleccionarCheckboxes() {
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(function (checkbox) {
        checkbox.checked = false;
    });
}
