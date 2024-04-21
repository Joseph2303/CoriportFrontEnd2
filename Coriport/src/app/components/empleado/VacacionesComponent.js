$(document).ready(function () {
    cargarTabla();
});

function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/vacaciones",
        type: "GET"
    }).done(function (response) {
        $("#dataTableVacaciones").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
     
        for (k in respObj) {
            let filaHTML = `<tr> 
                <td>${respObj[k].id}</td>
                <td>${respObj[k].disponibles}</td>
                <td>${respObj[k].diasAsig}</td>
                <td>${respObj[k].idEmpleado}</td>
                
            </tr>`;
            let fila = $(filaHTML);
            
            if (respObj[k].estado === "Aceptado") {
                fila.find('input[type="checkbox"]').prop('disabled', true); // Deshabilitar el checkbox
                fila.off('click'); // Quitar todos los eventos de clic en la fila
            } 
            
           
            $("#dataTableVacaciones").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}