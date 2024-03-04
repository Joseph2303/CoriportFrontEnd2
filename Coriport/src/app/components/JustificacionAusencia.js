function sendJustiAusencia(event) {
    event.preventDefault();

    let justificacionData = {
        "fechaSolicitud": $("#fechaSolicitud").val(),
        "fechaAusencia": $("#fechaAusencia").val(),
        "archivos": $("#archivos").val(),
        "justificacion": $("#justificacion").val(),
        "estado": $("#estado").val(),
        "descripcion": $("#descripcion").val(),
        "NombreEncargado": $("#NombreEncargado").val(),
        "idEmpleado": $("#idEmpleado").val()
    };

    let data = 'data=' + JSON.stringify(justificacionData);

    $.ajax({
        url: "http://localhost:8000/api/justificacionAusencia/store",
        type: "POST",
        data: data
    }).done(function (response) {
        console.log(response);
        
    }).fail(function (error) {
        console.log(error);
    });
}

function findJustiAusen(event) {
    event.preventDefault();

    let id = $("#searchJustiAusenciaId").val();
    $.ajax({
        url: "http://localhost:8000/api/justificacionAusencia/show/" + id,
        type: "GET",
    }).done(function (response) {
        console.log(response);
    }).fail(function (error) {
        console.log(error);
    });
}

function deleteJustiAusencia(justificacionAusencia) {
    console.log(justificacionAusencia.cells[0].textContent)
    $.ajax({
        url: "http://localhost:8000/api/justificacionAusencia/delete/" + justificacionAusencia.cells[0].textContent,
        type: "DELETE",

    }).done(function (response) {
        console.log(response);
    }).fail(function (error) {
        console.log(error);
    });
}

function updateJustificacion() {
    let updatedJustificacionData = {
        "idJustificacion": $("#idJustificacion").val(),
        "fechaSolicitud": $("#updateFechaSolicitud").val(),
        "fechaAusencia": $("#updateFechaAusencia").val(),
        "archivos": $("#updateArchivos").val(),
        "justificacion": $("#updateJustificacion").val(),
        "estado": $("#updateEstado").val(),
        "descripcion": $("#updateDescripcion").val(),
        "NombreEncargado": $("#updateNombreEncargado").val(),
        "idEmpleado": $("#updateIdEmpleado").val()
    };

    let data = 'data=' + JSON.stringify(updatedJustificacionData);

    $.ajax({
        url: "http://localhost:8000/api/justificacionAusencia/update/" + updatedJustificacionData.idJustificacion,
        type: "PUT",
        data: data
    }).done(function (response) {
        console.log(response);
        mostrarMensajeDeInfo("Se ha actualizado exitosamente");
        document.getElementById('fondoNegroFormUpdateJustificacion').style.display = 'none';
    }).fail(function (xhr, status, error) {
        console.log(error);
        mostrarMensajeDeError("ERROR!!: " + xhr.responseText);
    });
}

$.ajax({
    url: "http://localhost:8000/api/justificacionAusencias",
    type: "GET"
}).done(function (response) {
    var respObj = response.data;
    for (k in respObj) {
        $("#dataTableJustificacion").append(
            `<tr data-justificacion-id="${respObj[k].idJustificacion}" data-employee-id="${respObj[k].idEmpleado}">
             <td >`+ respObj[k].idJustificacion + `</td>
             <td>`+ respObj[k].fechaSolicitud + `</td>
             <td>`+ respObj[k].fechaAusencia + `</td>
             <td>`+ respObj[k].archivos + `</td>
             <td>`+ respObj[k].justificacion + `</td>
             <td>`+ respObj[k].estado + `</td>
             <td>`+ respObj[k].descripcion + `</td>
             <td>`+ respObj[k].NombreEncargado + `</td>
             <td>`+ respObj[k].idEmpleado + `</td>
             <td><input type="checkbox" class="checkbox-accion" onchange=""></td>
             </tr>`
        );
    }
}).fail(function () {

});


$("#sendJustiAusencia").click(sendJustiAusencia);
$("#deleteJustiAusencia").click(deleteJustiAusencia);
$("#updateJustificacion").click(updateJustificacion);