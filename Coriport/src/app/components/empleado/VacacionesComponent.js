$(document).ready(function () {
    cargarTabla();
});

function cargarTabla() {
    let usuario = JSON.parse(localStorage.getItem('identity')) 
    $.ajax({
        url: "http://localhost:8000/api/vacaciones/" + usuario.empleado.idEmpleado,
        type: "GET"
    }).done(function (response) {

        $("#dataTableVacaciones").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        for (k in respObj) {
            let filaHTML = `<tr> 
                <td>${respObj[k].periodo}</td>
                <td>${respObj[k].disponibles}</td>
                <td>${respObj[k].diasAsig}</td>
            </tr>`;
            let fila = $(filaHTML);
    
            $("#dataTableVacaciones").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}