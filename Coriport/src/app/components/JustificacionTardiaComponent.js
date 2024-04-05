function updateJustificacion(justificacionTardia) {
    let updatedJustificacionData = {
        "fechaTardia": justificacionTardia.fechaTardia,
       // "archivo": justificacionTardia.archivo,
        "justificacion": justificacionTardia.justificacion,
        "estado": justificacionTardia.estado,
        "encargado": justificacionTardia.encargado,
        "descripcion": justificacionTardia.descripcion,
        "fechaSolicitud": justificacionTardia.fechaSolicitud,
    };

    let data = 'data=' + JSON.stringify(updatedJustificacionData);

    $.ajax({
        url: "http://localhost:8000/api/justificacionTardia/update/" + justificacionTardia.id,
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
        url: "http://localhost:8000/api/justificacionTardias",
        type: "GET"
    }).done(function (response) {
        $("#dataTableJT").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        console.log(respObj)
        for (k in respObj) {
            let filaHTML = `<tr data-employee-id="${respObj[k].registro_tardia.empleado.idEmpleado}" data-empleado="${encodeURIComponent(JSON.stringify(respObj[k].registro_tardia.empleado))}">
                <td >${respObj[k].idJustificacionTardia}</td>
                <td>${respObj[k].fechaSolicitud}</td>
                <td>${respObj[k].fechaTardia}</td>
                <td>${respObj[k].archivo}</td>
                <td>${respObj[k].justificacion}</td>
                <td>${respObj[k].estado}</td>
                <td>${respObj[k].descripcion}</td>
                <td>${respObj[k].encargado}</td>
                <td id="empleado">${respObj[k].registro_tardia.empleado.nombre}</td>
                <td><input type="checkbox" class="checkbox-accion" onchange=""></td>
            </tr>`;
            let fila = $(filaHTML);
            
            // Verificar si el estado inicial es "Aceptado"
            if (respObj[k].estado === "Aceptado") {
                fila.find('input[type="checkbox"]').prop('disabled', true); // Deshabilitar el checkbox
                fila.off('click'); // Quitar todos los eventos de clic en la fila
            } 
            
            // Añadir la fila a la tabla
            $("#dataTableJT").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}

