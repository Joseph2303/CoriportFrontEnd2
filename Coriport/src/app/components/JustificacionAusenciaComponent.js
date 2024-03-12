function updateJustificacion(justificacionAusencias) {
    let updatedJustificacionData = {
        "fechaSolicitud": justificacionAusencias.fechaSolicitud,
        "fechaAusencia": justificacionAusencias.fechaAusencia,
        "archivos": justificacionAusencias.archivos,
        "justificacion": justificacionAusencias.justificacion,
        "estado": justificacionAusencias.estado,
        "descripcion": justificacionAusencias.descripcion,
        "NombreEncargado": justificacionAusencias.NombreEncargado,
        "idEmpleado": justificacionAusencias.idEmpleado
    };

    let data = 'data=' + JSON.stringify(updatedJustificacionData);
   
    $.ajax({
        url: "http://localhost:8000/api/justificacionAusencia/update/" + justificacionAusencias.id,
        type: "PUT",
        data: data
    }).done(function (response) {
        mostrarMensajeDeInfo("Se ha actualizado exitosamente");
        document.getElementById('fondo-status').style.display = 'none';
        deseleccionarCheckboxes();
    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseText);
    });
}


$.ajax({
    url: "http://localhost:8000/api/justificacionAusencias",
    type: "GET"
}).done(function (response) {
    var respObj = response.data;
    for (k in respObj) {
        $("#justificacion-table").append(
            `<tr data-employee-id="${respObj[k].idEmpleado}" data-empleado="${encodeURIComponent(JSON.stringify(respObj[k].empleado))}">
             <td >`+ respObj[k].idJustificacionAusencia + `</td>
             <td>`+ respObj[k].fechaSolicitud + `</td>
             <td>`+ respObj[k].fechaAusencia + `</td>
             <td>`+ respObj[k].archivos + `</td>
             <td>`+ respObj[k].justificacion + `</td>
             <td>`+ respObj[k].estado + `</td>
             <td>`+ respObj[k].descripcion + `</td>
             <td>`+ respObj[k].NombreEncargado + `</td>
             <td id="empleado" >`+ respObj[k].empleado.nombre + `</td>
             <td><input type="checkbox" class="checkbox-accion" onchange=""></td>
             </tr>`
        );
    }
}).fail(function (error) {
    console.log(error)
});

