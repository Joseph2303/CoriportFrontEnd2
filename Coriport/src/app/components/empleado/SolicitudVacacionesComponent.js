function send() {
    user = JSON.parse(localStorage.getItem("identity"))
    let soliData = {
        "fechInicio": $("#fechInicio").val(),
        "fechFin": $("#fechFin").val(),
        "estado": "Pendiente",
        "responsableAut": "Pendiente",
        "descripcion": "Pendiente",
        "idEmpleado": user.empleado.idEmpleado
    };

    let data = 'data=' + JSON.stringify(soliData);
    console.log(soliData)

    $.ajax({
        url: "http://localhost:8000/api/soliVacaciones/store",
        type: "POST",
        data: data
    }).done(function (response) {
        console.log(response)
        cargarTabla()
        document.getElementById("div-form").style.display = "none";
        mostrarMensajeDeInfo("¡INFO!: " + response.message);
    }).fail(function (xhr) {
        console.log(xhr)
        mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
    });
}

function updateSolicitud(solicitudVacaciones) {
    mostrarMensajeDeInfo("Veficando datos....");

    let updateData = {
        "fechInicio": solicitudVacaciones.fechInicio,
        "fechFin": solicitudVacaciones.fechFin,
    };

    let data = 'data=' + JSON.stringify(updateData);
    $.ajax({
        url: "http://localhost:8000/api/soliVacaciones/" + solicitudVacaciones.id,
        type: "PUT",
        data: data
    }).done(function (response) {
        cargarTabla()
        document.getElementById("div-form-update").style.display = "none";
        mostrarMensajeDeInfo("¡INFO!: " + response.message);

    }).fail(function (xhr, status, error) {
        console.log(xhr)
        mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
    });
}


$(document).ready(function () {
    cargarTabla();
});

function cargarTabla() {
    var user = JSON.parse(localStorage.getItem('identity'));

    $.ajax({
        url: "http://localhost:8000/api/soliVacaciones/showByEmpleado/" +  user.empleado.idEmpleado,
        type: "GET"
    }).done(function (response) {
        $("#dataTableSoliVacaciones").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;

        for (k in respObj) {
            let filaHTML = `<tr data-id="${respObj[k].idSoliVacaciones}"> 
                <td>${respObj[k].fechSolicitud}</td>
                <td>${respObj[k].fechInicio}</td>
                <td>${respObj[k].fechFin}</td>
                <td id="estado">${respObj[k].estado}</td>
                <td>${respObj[k].responsableAut}</td>
                <td>${respObj[k].descripcion}</td>
                <td><input type="checkbox" class="checkbox-accion" onchange=""></td>

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

$("#sendSoli").click(send)
