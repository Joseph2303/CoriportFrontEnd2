function send(){
    let puestoData = {
        "fecha": $("#fecha").val(),
        "descripcion": $("#descripcion").val(),
        "tipoFeriado": $("#tipoFeriado").val(),
    };

    let data = 'data=' + JSON.stringify(puestoData);
    console.log(puestoData)

    $.ajax({
        url: "http://localhost:8000/api/dias_feriados/store",
        type: "POST",
        data: data
    }).done(function (response) {
        console.log(response)
        document.getElementById("pantallaEmergenteAdd").style.display = "none";
        mostrarMensajeDeInfo("¡INFO!: " + response.message);
        cargarTabla()
    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
    });
}

function destroy(id){
    $.ajax({
        url: "http://localhost:8000/api/dias_feriados/delete/" + id,
        type: "DELETE",
    }).done(function (response) {
        console.log(response);
        cargarTabla();
        document.getElementById("pantallaConfirmacion").style.display = "none";
        mostrarMensajeDeInfo("¡INFO!: " + response.message);

    }).fail(function (xhr, status, error) {
        console.log(error)
        mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
    });
}

function updateFeriado(feriado) {
    let feriadoData = {
        "id": feriado.id,
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
        console.log(response)
        cargarTabla()
        mostrarMensajeDeInfo("¡INFO!: " + response.message);
        document.getElementById("pantallaEmergenteUpdate").style.display = "none";
        deseleccionarCheckboxes();

    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
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
        $("#dataTableFeriado").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
     
        for (k in respObj) {
            let filaHTML = `<tr> 
                <td>${respObj[k].id}</td>
                <td>${respObj[k].fecha}</td>
                <td>${respObj[k].descripcion}</td>
                <td>${respObj[k].tipoFeriado}</td>
                <td><input type="checkbox" class="checkbox-accion" onchange=""></td>  

            </tr>`;
            let fila = $(filaHTML);
            
            // Verificar si el estado inicial es "Aceptado"
            if (respObj[k].estado === "Aceptado") {
                fila.find('input[type="checkbox"]').prop('disabled', true); // Deshabilitar el checkbox
                fila.off('click'); // Quitar todos los eventos de clic en la fila
            } 
            
            // Añadir la fila a la tabla
            $("#dataTableFeriado").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}

$("#sendFeriado").click(send);

