
function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/dias_feriados",
        type: "GET"
    }).done(function (response) {
        $("#dataTableDias").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
     
        for (k in respObj) {
            let filaHTML = `<tr> 
                <td>${respObj[k].id}</td>
                <td>${respObj[k].fecha}</td>
                <td>${respObj[k].descripcion}</td>
                <td>${respObj[k].tipoFeriado}</td>

            </tr>`;
            let fila = $(filaHTML);
            
            if (respObj[k].estado === "Aceptado") {
                fila.find('input[type="checkbox"]').prop('disabled', true); // Deshabilitar el checkbox
                fila.off('click'); // Quitar todos los eventos de clic en la fila
            } 
            
           
            $("#dataTableDias").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}