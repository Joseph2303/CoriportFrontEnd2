$(document).ready(function () {
    cargarTabla();
});


function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/registroAusencias",
        type: "GET"
    }).done(function (response) {
        $("#dataTableRA").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        for (k in respObj) { 

            let justificacion;
            if (respObj[k].idJustificacionAusencia) {
                if (respObj[k].justificacion_ausencia.estado === "Aceptado") {
                    justificacion = "Justificado";
                } else {
                    justificacion = "Pendiente";
                }
            } else{
                justificacion = "Sin Justificar";
            }
            
            let filaHTML = `<tr data-employee-id="${respObj[k].empleado.idEmpleado}" data-justificacion="${encodeURIComponent(JSON.stringify(respObj[k].justificacion_ausencia))}" data-empleado="${encodeURIComponent(JSON.stringify(respObj[k].empleado))}">
                <td >${respObj[k].idRegistroAusencia}</td>
                <td>${respObj[k].fecha}</td>
                <td id="empleado">${respObj[k].empleado.nombre}</td>
                <td id="justificacion">${justificacion}</td>
            </tr>`;

            let fila = $(filaHTML);
            $("#dataTableRA").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}


