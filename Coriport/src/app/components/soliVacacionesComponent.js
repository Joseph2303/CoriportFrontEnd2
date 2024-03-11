

function findEmpleado(event) {
    event.preventDefault();

    let id = $("#searchEmpleadoId").val();
    $.ajax({
        url: "http://localhost:8000/api/empleado/show/" + id,
        type: "GET",
    }).done(function (response) {
        console.log(response);
    }).fail(function (error) {
        console.log(error);
    });
}

function updateSolicitud(solicitudVacaciones) {
    console.log(solicitudVacaciones)
    let updateData = {
        "fechSolicitud" : solicitudVacaciones.fechaSolicitud,
        "fechInicio" : solicitudVacaciones.fechInicio,
        "fechFin" : solicitudVacaciones.fechFin,
        "estado": solicitudVacaciones.estado,
        "responsableAut" : solicitudVacaciones.encargado,
        "descripcion": solicitudVacaciones.descripcion,
        "idEmpleado" : solicitudVacaciones.idEmpleado
    };

    let data = 'data=' + JSON.stringify(updateData);
    console.log(data)
    $.ajax({
        url: "http://localhost:8000/api/soliVacaciones/update/" +  solicitudVacaciones.id,
        type: "PUT",
        data: data
    }).done(function (response) {
        mostrarMensajeDeInfo("Se ha actualizado exitosamente");
        document.getElementById('fondo-status').style.display = 'none';
    }).fail(function (xhr, status, error) {
        console.log(xhr)
        mostrarMensajeDeError("ERROR!!: " + xhr.responseText);
    });
}


$.ajax({
    url: "http://localhost:8000/api/soliVacaciones",
    type: "GET"
}).done(function (response) {
    var respObj = response.data;
    for (k in respObj) {
        $("#dataTableSV").append(
            `<tr data-employee-id="${respObj[k].idEmpleado}" data-empleado="${encodeURIComponent(JSON.stringify(respObj[k].empleado))}">
             <td >`+ respObj[k].idSoliVacaciones + `</td>
             <td>`+ respObj[k].fechSolicitud + `</td>
             <td>`+ respObj[k].fechInicio + `</td>
             <td>`+ respObj[k].fechFin + `</td>
             <td>`+ respObj[k].descripcion + `</td>
             <td>`+ respObj[k].responsableAut + `</td>
            <td>`+ respObj[k].estado + `</td>
            <td id="empleado" >`+ respObj[k].empleado.nombre + `</td>
             <td><input type="checkbox" class="checkbox-accion" onchange=""></td>
             </tr>`
        );

    }
}).fail(function (error) {
console.log(error)
});





