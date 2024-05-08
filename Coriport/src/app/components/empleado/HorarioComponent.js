$(document).ready(function () {
    cargarTabla();
});


function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/horarios",
        type: "GET"
    }).done(function (response) {
        $("#dataHorarios").empty(); // Vaciar la tabla antes de cargar los nuevos datos
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
            let filaHTML = `<tr> 
                <td>${nombreDia}</td>
                <td>${respObj[k].fecha}</td>
                <td>${respObj[k].horaInicio}</td>
                <td>${respObj[k].horaFin}</td>
            </tr>`;
            let fila = $(filaHTML);
         
            
            // Añadir la fila a la tabla
            $("#dataHorarios").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}