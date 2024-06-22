$(document).ready(function () {
    cargarTabla();
});


function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/horarios",
        type: "GET"
    }).done(function (response) {
        $("#dataTableHorario").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        var fecha;
        var numeroDia;
        var diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        var nombreDia;
        
        console.log(respObj)
        for (k in respObj) {
            fecha = new Date(respObj[k].fecha);
            numeroDia = fecha.getDay();
            nombreDia = diasSemana[numeroDia];

            let horaInicio = formatHora(respObj[k].horaInicio);
            let horaFin = formatHora(respObj[k].horaFin);

            let filaHTML = `<tr data-empleado="${encodeURIComponent(JSON.stringify(respObj[k].marcas[0].empleado))}"> 
                <td>${nombreDia}</td>
                <td>${respObj[k].fecha}</td>
                <td>${horaInicio}</td>
                <td>${horaFin}</td>
                <td id="empleado">${respObj[k].marcas[0].empleado.nombre}</td>
                <td>${respObj[k].idHorario}</td>
            </tr>`;
            let fila = $(filaHTML);
         
            
            // Añadir la fila a la tabla
            $("#dataTableHorario").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
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
