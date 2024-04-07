function updatePuesto(puesto) {
    let puestoData = {
        "idPuesto": puesto.idPuesto,
        "puesto":puesto.puesto,

    };

    let data = 'data=' + JSON.stringify(puestoData);

    $.ajax({
        url: "http://localhost:8000/api/puesto/update/" + puesto.idPuesto,
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
        url: "http://localhost:8000/api/puestos",
        type: "GET"
    }).done(function (response) {
        $("#dataTablep").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        console.log(respObj)
        for (k in respObj) {
            let filaHTML = `<tr 
                <td>${respObj[k].idPuesto}</td>
                <td>${respObj[k].puesto}</td>
                
            </tr>`;
            let fila = $(filaHTML);
            
            // Verificar si el estado inicial es "Aceptado"
            if (respObj[k].estado === "Aceptado") {
                fila.find('input[type="checkbox"]').prop('disabled', true); // Deshabilitar el checkbox
                fila.off('click'); // Quitar todos los eventos de clic en la fila
            } 
            
            // Añadir la fila a la tabla
            $("#dataTableP").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}

