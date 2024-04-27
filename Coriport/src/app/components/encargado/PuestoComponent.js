function send(){
    let puestoData = {
        "puesto": $("#nombrePuesto").val(),
    };

    let data = 'data=' + JSON.stringify(puestoData);
    console.log(puestoData)

    $.ajax({
        url: "http://localhost:8000/api/puesto/store/",
        type: "POST",
        data: data
    }).done(function (response) {
        console.log(response)
        document.getElementById("pantallaEmergenteAdd").style.display = "none";
        mostrarMensajeDeInfo("Se ha ingresado exitosamente");
        cargarTabla()
    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseText);
    });
}

function destroy(id){
    $.ajax({
        url: "http://localhost:8000/api/puesto/delete/" + id,
        type: "DELETE",
    }).done(function (response) {
        console.log(response);
        cargarTabla();
        document.getElementById("pantallaConfirmacion").style.display = "none";
        mostrarMensajeDeInfo("Se ha eliminado correctamente");

    }).fail(function (xhr, status, error) {
        console.log(error)
        mostrarMensajeDeError("ERROR!!: " + xhr.responseText);
    });
}

function update(puesto) {
    let puestoData = {
        "idPuesto": puesto.id,
        "puesto":  puesto.nombre

    };

    let data = 'data=' + JSON.stringify(puestoData);
    console.log(data)

    $.ajax({
        url: "http://localhost:8000/api/puesto/update/" + puesto.id,
        type: "PUT",
        data: data
    }).done(function (response) {
        console.log(response)
        cargarTabla()
        deseleccionarCheckboxes();
        mostrarMensajeDeInfo("Se ha actualizado exitosamente");
        document.getElementById("pantallaEmergenteUpdate").style.display = "none";


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
        $("#dataTableP").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        console.log(respObj)
        for (k in respObj) {
            let filaHTML = `<tr> 
                <td>${respObj[k].idPuesto}</td>
                <td>${respObj[k].puesto}</td>         
                <td><input type="checkbox" class="checkbox-accion" onchange=""></td>    
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

$("#sendPuesto").click(send);
