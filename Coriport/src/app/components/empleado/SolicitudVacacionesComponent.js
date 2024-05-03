function send(){
    user = JSON.stringify(localStorage.getItem("identity"))
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
        mostrarMensajeDeInfo("¡INFO!: " + response.message);

    }).fail(function (error) {
        console.log(error)
        mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
    });
}

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
                <td id="estado">${respObj[k].estado}</td>
                <td>${respObj[k].responsableAut}</td>
                <td>${respObj[k].descripcion}</td>
                
            </tr>`;
            let fila = $(filaHTML);
                  
            $("#dataTableSoliVacaciones").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}

$("#sendSoli").click(send)