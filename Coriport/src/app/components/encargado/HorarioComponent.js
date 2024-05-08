$(document).ready(function () {
    cargarTabla();
});


function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/horarios",
        type: "GET"
    }).done(function (response) {
        $("#dataTableHorasExtra").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        var fecha = new Date(fecha);
        var numeroDia = fecha.getDay();
        var diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        var nombreDia = diasSemana[numeroDia];

        for (k in respObj) {
            let filaHTML = `<tr> 
                <td>${nombreDia}</td>
                <td>${respObj[k].fecha}</td>
                <td>${respObj[k].horarioInicio}</td>
                <td>${respObj[k].horaFin}</td>
                <td>${respObj[k].idHorario}</td>
            </tr>`;
            let fila = $(filaHTML);
         
            
            // Añadir la fila a la tabla
            $("#dataTableHorasExtra").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}