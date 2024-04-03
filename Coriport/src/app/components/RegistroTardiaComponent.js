$(document).ready(function () {
    cargarTabla();
});

function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/registroTardias",
        type: "GET"
    }).done(function (response) {

        $("#dataTableRT").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        for (k in respObj) { 

            let justificacion = respObj[k].idJustificacionTardia ? "Justificado" : "Sin Justificar";
            let filaHTML = `<tr data-employee-id="${respObj[k].empleado.idEmpleado}" data-justificacion="${encodeURIComponent(JSON.stringify(respObj[k].justificacion_tardia))}" data-empleado="${encodeURIComponent(JSON.stringify(respObj[k].empleado))}">
                <td >${respObj[k].idRegistroTardia}</td>
                <td>${respObj[k].fecha}</td>
                <td>${respObj[k].hora}</td>
                <td id="empleado">${respObj[k].empleado.nombre}</td>
                <td id="justificacion">${justificacion}</td>
                <td><input type="checkbox" class="checkbox-accion" onchange=""></td>
            </tr>`;

            let fila = $(filaHTML);
            $("#dataTableRA").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}

