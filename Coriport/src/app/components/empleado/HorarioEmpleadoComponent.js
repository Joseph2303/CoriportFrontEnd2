$(document).ready(function () {
    cargarTabla();
});


function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/horarioEmpleado",
        type: "GET"
    }).done(function (response) {
        $("#dataHorarioEmpleado").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        
        for (k in respObj) {
            let filaHTML = `<tr> 
                <td>${respObj[k].Id}</td>
                <td>${respObj[k].Empleado}</td>
                <td>${respObj[k].HoraEntrada}</td>
                <td>${respObj[k].HoraSalida}</td>
                <td>${respObj[k].DiaLibre}</td>
            </tr>`;
            let fila = $(filaHTML);
             
            $("#dataHorarioEmpleado").append(fila);
        }
    }).fail(function (error) {
        console.log(error);
    });
}
