$(document).ready(function () {
    cargarTabla();
});


function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/horarioEmpleado",
        type: "GET"
    }).done(function (response) {
        $("#dataHorarioEmpleado").empty();
        var respObj = response.data;
        
        for (k in respObj) {

            let HoraEntrada = formatHora(respObj[k].HoraEntrada);
            let HoraSalida = formatHora(respObj[k].HoraSalida);

            let filaHTML = `<tr> 
                <td>${HoraEntrada}</td>
                <td>${HoraSalida}</td>
                <td>${respObj[k].DiaLibre}</td>
            </tr>`;
            let fila = $(filaHTML);
             
            $("#dataHorarioEmpleado").append(fila);
        }
    }).fail(function (error) {
        console.log(error);
    });
}


function formatHora(hora) {
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
