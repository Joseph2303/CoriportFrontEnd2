$(document).ready(function () {
    cargarTabla();
});


function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/horasExtra",
        type: "GET"
    }).done(function (response) {
        $("#dataTableHorasExtra").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
     
        for (k in respObj) {
            let filaHTML = `<tr> 
                <td>${respObj[k].id}</td>
                <td>${respObj[k].maxHora}</td>
                <td>${respObj[k].cantidadHora}</td>
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