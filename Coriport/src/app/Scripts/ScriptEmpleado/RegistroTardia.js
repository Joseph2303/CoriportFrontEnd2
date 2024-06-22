var tabla = document.getElementById("registro-table");

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
        </table>`;

    // Mostrar la pantalla emergente con los detalles del empleado
    $("#popup-content").html(detallesHTML);
    $("#popup").show();
});

$(document).on("click", "#justificacion", function () {
    var justificacionEstado = $(this).text().trim(); // Obtener el estado de la justificación

    if (justificacionEstado === "Justificado") { // Verificar si el estado es "Justificado"
        // Obtener la cadena JSON del atributo de datos
        var justificacionString = decodeURIComponent($(this).closest("tr").data("justificacion"));
        // Convertir la cadena JSON a un objeto JavaScript
        var justificacion = JSON.parse(justificacionString);
        var detallesHTML = `
        <table>
            <tr>
                <th>Fecha de la solicitud:</th>
                <td>${justificacion.fechaSolicitud}</td>
            </tr>
            <tr>
                <th>Fecha de la ausencia:</th>
                <td>${justificacion.fechaAusencia}</td>
            </tr>
            <tr>
                <th>Archivo:</th>
                <td>${justificacion.archivo}</td>
            </tr>
            <tr>
                <th>Justificacion de la ausencia:</th>
                <td>${justificacion.justificacion}</td>
            </tr>
            <tr>
                <th>Estado:</th>
                <td>${justificacion.estado}</td>
            </tr>
            <tr>
                <th>Descripcion:</th>
                <td>${justificacion.descripcion}</td>
            </tr>
            <tr>
                <th>Nombre del encargado:</th>
                <td>${justificacion.encargado}</td>
            </tr>       
 
        </table>`;

        // Mostrar la pantalla emergente con los detalles del justificacion
        $("#popup-content").html(detallesHTML);
        $("#popup").show();
    } else if (justificacionEstado === "Pendiente") {
        // Obtener la cadena JSON del atributo de datos
        var justificacionString = decodeURIComponent($(this).closest("tr").data("justificacion"));
        // Convertir la cadena JSON a un objeto JavaScript
        var justificacion = JSON.parse(justificacionString);

        function addUpdate() {
            let justificacionUpdate = {
                "id": justificacion.idJustificacionTardia,
                "fechaSolicitud": justificacion.fechaSolicitud,
                "fechaTardia": justificacion.fechaTardia,
                "archivo": justificacion.archivos,
                "justificacion": $("#justificacionText").val(),
                "estado": justificacion.estado,
                "descripcion": justificacion.descripcion,
                "encargado": justificacion.encargado,
            }
            updateJustificacion(justificacionUpdate)
        }

        var detallesHTML = `
        <table>
            <tr>
                <th>Fecha de la solicitud:</th>
                <td>${justificacion.fechaSolicitud}</td>
            </tr>
            <tr>
                <th>Fecha de la tardia:</th>
                <td>${justificacion.fechaTardia}</td>
            </tr>
            <tr>
                <th>Archivo:</th>
                <td>${justificacion.archivo}</td>
            </tr>
            <tr>
                <th>Justificacion de la Tardia:</th>
                <td><textarea id="justificacionText">${justificacion.justificacion}</textarea></td>
            </tr>
            <tr>
                <th>Estado:</th>
                <td>${justificacion.estado}</td>
            </tr>
            <tr>
                <th>Descripcion:</th>
                <td>${justificacion.descripcion}</td>
            </tr>
            <tr>
                <th>Nombre del encargado:</th>
                <td>${justificacion.encargado}</td>
            </tr>       
            <tr>
                <td colspan="2"><button id="updateJustificacion">Guardar Cambios</button></td>
            </tr>
        </table>`;
        // Mostrar la pantalla emergente con los detalles del justificacion
        $("#popup-content").html(detallesHTML);
        $("#popup").show();
        $("#updateJustificacion").click(addUpdate);

    } else {
        var filaSeleccionada = $(this).closest("tr");
        let data = {
            id: filaSeleccionada.attr('data-idRegistro'),
            fechaRegistro: filaSeleccionada.find("td:first").text()
        }
        $("#idRegistro").val(data.id);
        $("#fechaTardia").val(data.fechaRegistro);
        document.getElementById('justificacionAdd').style.display = 'flex';
    }
});

$(document).mouseup(function (e) {
    var container = $("#popup");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});

function filtrar() {
    var inputBusqueda = document.getElementById('buscarRegistro');
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