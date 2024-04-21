$(document).ready(function () {
    cargarTabla();
});

function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/soliVacaciones",
        type: "GET"
    }).done(function (response) {
        $("#dataTableSoliVacaciones").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
     
        for (k in respObj) {
            let filaHTML = `<tr> 
                <td>${respObj[k].fechSolicitud}</td>
                <td>${respObj[k].fechInicio}</td>
                <td>${respObj[k].fechFin}</td>
                <td>${respObj[k].estado}</td>
                <td>${respObj[k].responsableAut}</td>
                <td>${respObj[k].descripcion}</td>
                
            </tr>`;
            let fila = $(filaHTML);
            
            if (respObj[k].estado === "Aceptado") {
                fila.find('input[type="checkbox"]').prop('disabled', true); // Deshabilitar el checkbox
                fila.off('click'); // Quitar todos los eventos de clic en la fila
            } 
            
           
            $("#dataTableSoliVacaciones").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}