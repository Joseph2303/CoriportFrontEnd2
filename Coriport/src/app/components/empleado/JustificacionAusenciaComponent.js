function updateJustificacion(justificacionAusencias) {
    let updatedJustificacionData = {
        "fechaSolicitud": justificacionAusencias.fechaSolicitud,
        "fechaAusencia": justificacionAusencias.fechaAusencia,
        "archivo": justificacionAusencias.archivos,
        "justificacion": justificacionAusencias.justificacion,
        "estado": justificacionAusencias.estado,
        "descripcion": justificacionAusencias.descripcion,
        "encargado": justificacionAusencias.NombreEncargado,
        "idEmpleado": justificacionAusencias.idEmpleado
    };

    let data = 'data=' + JSON.stringify(updatedJustificacionData);

    $.ajax({
        url: "http://localhost:8000/api/justificacionAusencia/update/" + justificacionAusencias.id,
        type: "PUT",
        data: data
    }).done(function (response) {
        mostrarMensajeDeInfo("Se ha actualizado exitosamente");
        document.getElementById("div-reject").style.display = "none";
        document.getElementById('fondo-status').style.display = 'none';
        deseleccionarCheckboxes();
        cargarTabla()
    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseText);
    });
}

$(document).ready(function () {
    cargarTabla();
});


function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/justificacionAusencias",
        type: "GET"
    }).done(function (response) {
        $("#dataTableJA").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        console.log(respObj)
        for (k in respObj) {
            let filaHTML = `<tr data-employee-id="${respObj[k].registro_ausencia.empleado.idEmpleado}" data-empleado="${encodeURIComponent(JSON.stringify(respObj[k].registro_ausencia.empleado))}">
                <td >${respObj[k].idJustificacionAusencia}</td>
                <td>${respObj[k].fechaSolicitud}</td>
                <td>${respObj[k].fechaAusencia}</td>
                <td>${respObj[k].archivo}</td>
                <td>${respObj[k].justificacion}</td>
                <td>${respObj[k].estado}</td>
                <td>${respObj[k].descripcion}</td>
                <td>${respObj[k].encargado}</td>
                <td id="empleado">${respObj[k].registro_ausencia.empleado.nombre}</td>
                <td><input type="checkbox" class="checkbox-accion" onchange=""></td>
            </tr>`;
            let fila = $(filaHTML);
            
            // Verificar si el estado inicial es "Aceptado"
            if (respObj[k].estado === "Aceptado") {
                fila.find('input[type="checkbox"]').prop('disabled', true); // Deshabilitar el checkbox
                fila.off('click'); // Quitar todos los eventos de clic en la fila
            } 
            
            // Añadir la fila a la tabla
            $("#dataTableJA").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}

