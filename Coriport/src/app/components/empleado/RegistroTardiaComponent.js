$(document).ready(function () {
    cargarTabla();
});

function cargarTabla() {
    let usuario = JSON.parse(localStorage.getItem('identity')) 
    $.ajax({
        url: "http://localhost:8000/api/registroTardias/" + usuario.empleado.idEmpleado,
        type: "GET"
    }).done(function (response) {

        $("#dataTableRT").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        for (k in respObj) { 
            let justificacion;
            if (respObj[k].idJustificacionTardia) {
                if (respObj[k].justificacion_tardia.estado === "Aceptado") {
                    justificacion = "Justificado";
                } else {
                    justificacion = "Pendiente";
                }
            } else{
                justificacion = "Sin Justificar";
            }
            
            let filaHTML = `<tr data-idRegistro="${respObj[k].idRegistroTardia}" data-justificacion="${encodeURIComponent(JSON.stringify(respObj[k].justificacion_tardia))}" data-empleado="${encodeURIComponent(JSON.stringify(respObj[k].empleado))}">
                <td>${respObj[k].fecha}</td>
                <td>${respObj[k].cantMinutos}</td>
                <td id="justificacion">${justificacion}</td>
            </tr>`;

            let fila = $(filaHTML);

            $("#dataTableRT").append(fila);
        }
        mostrarMensajeDeInfo("Las aunsecias que se encuentran pendiente puedes editarlas");
    }).fail(function (error) {
        console.log(error)
    });
}

