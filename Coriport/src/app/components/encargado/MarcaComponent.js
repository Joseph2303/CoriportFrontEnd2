$(document).ready(function () {
    cargarTabla();
});


function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/marcas",
        type: "GET",
    }).done(function (response) {
        $("#dataTableM").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        for (k in respObj) {
            let filaHTML = `<tr data-employee-id="${respObj[k].empleado.idEmpleado}" data-empleado="${encodeURIComponent(JSON.stringify(respObj[k].empleado))}">     
            <td>${respObj[k].idMarca}</td>
                <td>${respObj[k].fecha}</td>
                <td>${respObj[k].hora}</td>
                <td>${respObj[k].tipo}</td>
                <td id="empleado">${respObj[k].empleado.nombre}</td>
            </tr>`;
            let fila = $(filaHTML);
            console.log(respObj)
            // Añadir la fila a la tabla
            $("#dataTableM").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}

