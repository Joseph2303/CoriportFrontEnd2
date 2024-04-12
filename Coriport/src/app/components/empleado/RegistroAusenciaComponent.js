$(document).ready(function () {
    cargarTabla();
});


function cargarTabla() {
    let usuario = JSON.parse(localStorage.getItem('identity')) 

    $.ajax({
        url: "http://localhost:8000/api/registroAusencias/" + usuario.empleado.idEmpleado,
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


            let filaHTML = `<tr data-idRegistro="${respObj[k].idRegistroAusencia}" data-justificacion="${encodeURIComponent(JSON.stringify(respObj[k].justificacion_ausencia))}" data-empleado="${encodeURIComponent(JSON.stringify(respObj[k].empleado))}">
                <td>${respObj[k].fecha}</td>
                <td id="justificacion">${justificacion}</td>
            </tr>`;

            let fila = $(filaHTML);
            $("#dataTableRA").append(fila);
        }
        mostrarMensajeDeInfo("Las aunsecias que se encuentran pendiente puedes editarlas");
    }).fail(function (error) {
        console.log(error)
    });


}

