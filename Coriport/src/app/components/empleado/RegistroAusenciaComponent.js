$(document).ready(function () {
    cargarTabla();
});


function cargarTabla() {
    let usuario = JSON.parse(localStorage.getItem('identity')) 

    $.ajax({
        url: "http://localhost:8000/api/registroAusencias/" + usuario.empleado.idEmpleado,
        type: "GET"
    }).done(function (response) {

        $("#dataTableRA").empty(); 
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

function formatMinutos(hora) {
    // Asegurarse de que la hora sea una cadena
    if (typeof hora !== 'string') return hora;

    // Dividir la cadena de la hora en partes
    let partes = hora.split(':');

    // Si la longitud de partes es al menos 2 (HH y mm están presentes)
    if (partes.length >= 2) {
        return `${partes[0]}:${partes[1]}`;
    }

    // En caso contrario, devolver la hora sin modificar
    return hora;
}