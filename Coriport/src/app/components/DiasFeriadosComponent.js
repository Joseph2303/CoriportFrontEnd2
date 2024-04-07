function updateFeriado(feriado) {
    let feriadoData = {
        "fecha": feriado.fecha,
        "descripcion":feriado.descripcion,
        "tipoFeriado":feriado.tipoFeriado,

    };

    let data = 'data=' + JSON.stringify(feriadoData);

    $.ajax({
        url: "http://localhost:8000/api/dias_feriados/update/" + feriado.id,
        type: "PUT",
        data: data
    }).done(function (response) {
        mostrarMensajeDeInfo("Se ha actualizado exitosamente");
        document.getElementById("div-reject").style.display = "none";
        document.getElementById('fondo-status').style.display = 'none';
        deseleccionarCheckboxes();
        cargarTabla()
    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseText);
    });
}

$(document).ready(function () {
    cargarTabla();
});


function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/dias_feriados",
        type: "GET"
    }).done(function (response) {
        $("#dataTableDias").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        console.log(respObj)
        for (k in respObj) {
            let filaHTML = `<tr 
                <td>${respObj[k].id}</td>
                <td>${respObj[k].fecha}</td>
                <td>${respObj[k].descripcion}</td>
                <td>${respObj[k].tipoFeriado}</td>

            </tr>`;
            let fila = $(filaHTML);
            
            // Verificar si el estado inicial es "Aceptado"
            if (respObj[k].estado === "Aceptado") {
                fila.find('input[type="checkbox"]').prop('disabled', true); // Deshabilitar el checkbox
                fila.off('click'); // Quitar todos los eventos de clic en la fila
            } 
            
            // Añadir la fila a la tabla
            $("#dataTableDias").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}

