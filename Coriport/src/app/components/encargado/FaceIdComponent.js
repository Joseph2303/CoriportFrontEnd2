
$(document).ready(function () {
    cargarTabla();
});


function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/faceId",
        type: "GET"
    }).done(function (response) {
        $("#dataTableFaceID").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        console.log(respObj)
        for (k in respObj) {
            let filaHTML = `<tr data-id="${respObj[k].id}" data-empleado="${encodeURIComponent(JSON.stringify(respObj[k].empleado))}"> 
                <td>${respObj[k].id}</td>
                <td id="empleado">${respObj[k].empleado.nombre}</td>
                <td>${respObj[k].idEmpleado}</td>
                <td><input type="checkbox" class="checkbox-accion" onchange=""></td>  

            </tr>`;
            let fila = $(filaHTML);


            $("#dataTableFaceID").append(fila);
        }
    }).fail(function (xhr, status, error) {
        console.log(xhr)
    });
}


