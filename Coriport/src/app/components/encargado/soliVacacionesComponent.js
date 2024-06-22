function updateSolicitud(solicitudVacaciones) {
    mostrarMensajeDeInfo("Cargando....");

    let updateData = {
        "fechSolicitud": solicitudVacaciones.fechaSolicitud,
        "fechInicio": solicitudVacaciones.fechInicio,
        "fechFin": solicitudVacaciones.fechFin,
        "estado": solicitudVacaciones.estado,
        "responsableAut": solicitudVacaciones.encargado,
        "descripcion": solicitudVacaciones.descripcion,
        "idEmpleado": solicitudVacaciones.idEmpleado,
       
    };

    let data = 'data=' + JSON.stringify(updateData);
    $.ajax({
        url: "http://localhost:8000/api/soliVacaciones/update/" + solicitudVacaciones.id,
        type: "PUT",
        data: data
    }).done(function (response) {
        let dataUpdate = {
            "cantidadDias": solicitudVacaciones.cantidadDias,
            "idEmpleado": solicitudVacaciones.idEmpleado
        };
        let data = 'data=' + JSON.stringify(dataUpdate);
        if (solicitudVacaciones.cantidadDias) {
            $.ajax({
                url: "http://localhost:8000/api/vacaciones/update/" + updateData.idEmpleado,
                type: "PUT",
                data: data
            }).done(function (response) {

                mostrarMensajeDeInfo("¡INFO!: " + response.message);
                document.getElementById("div-reject").style.display = "none";
                document.getElementById('fondo-status').style.display = 'none';
                deseleccionarCheckboxes();
                cargarTabla();
            }).fail(function (xhr, status, error) {
                mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
            });
        }

    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
    });
}


$(document).ready(function () {
    cargarTabla();
});

function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/soliVacaciones",
        type: "GET"
    }).done(function (response) {
        $("#dataTableSV").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        for (k in respObj) {
            let filaHTML = `<tr data-employee-id="${respObj[k].idEmpleado}" data-empleado="${encodeURIComponent(JSON.stringify(respObj[k].empleado))}">
                <td >${respObj[k].idSoliVacaciones}</td>
                <td>${respObj[k].fechSolicitud}</td>
                <td>${respObj[k].fechInicio}</td>
                <td>${respObj[k].fechFin}</td>
                <td>${respObj[k].descripcion}</td>
                <td>${respObj[k].responsableAut}</td>
                <td>${respObj[k].estado}</td>
                <td id="empleado">${respObj[k].empleado.nombre}</td>
                <td><input type="checkbox" class="checkbox-accion" onchange=""></td>
            </tr>`;
            let fila = $(filaHTML);

            // Verificar si el estado inicial es "Aceptado"
            if (respObj[k].estado === "Aceptado") {
                fila.find('input[type="checkbox"]').prop('disabled', true); // Deshabilitar el checkbox
                fila.off('click'); // Quitar todos los eventos de clic en la fila
            }

            // Añadir la fila a la tabla
            $("#dataTableSV").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}






