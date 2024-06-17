$(document).ready(function () {
    cargarTabla();
});

function cargarTabla() {
    user = JSON.parse(localStorage.getItem('identity')) 
    $.ajax({
        url: "http://localhost:8000/api/marca/showByEmpleado/" + user.empleado.idEmpleado,
        type: "GET"
    }).done(function (response) {
        console.log(response);

        $("#dataHorarios").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        var diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

        respObj.forEach(function(horario) {
            var fecha = new Date(horario.fecha);
            var numeroDia = fecha.getDay();
            var nombreDia = diasSemana[numeroDia];
            var horaInicio = formatHora(horario.horaInicio);
            var horaFin = formatHora(horario.horaFin);

            var filaHTML = `<tr> 
                <td>${nombreDia}</td>
                <td>${horario.fecha}</td>
                <td>${horaInicio}</td>
                <td>${horaFin}</td>
            </tr>`;
            var fila = $(filaHTML);

            // Añadir la fila a la tabla
            $("#dataHorarios").append(fila);
        });
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