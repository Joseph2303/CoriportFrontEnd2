function send(){
    let HorarioData = {
        "Empleado": $("#Empleado").val(),
        "HoraEntrada": $("#HoraEntrada").val(),
        "HoraSalida": $("#HoraSalida").val(),
        "DiaLibre": $("#DiaLibre").val(),
    };

    let data = 'data=' + JSON.stringify(HorarioData);
    console.log(HorarioData)

    $.ajax({
        url: "http://localhost:8000/api/horarioEmpleado/store",
        type: "POST",
        data: data
    }).done(function (response) {
        console.log(response)
        document.getElementById("modalFormulario").style.display = "none";
        mostrarMensajeDeInfo("¡INFO!: " + response.message);
        cargarTabla()
    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
    });
}

function destroy(Id){
    $.ajax({
        url: "http://localhost:8000/api/horarioEmpleado/delete/" + Id,
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

function updateHorarioEmpleado(horarioEmpleado) {
    let horarioData = {
        "Empleado": horarioEmpleado.id,
       "HoraEntrada":horarioEmpleado.HoraEntrada,
        "HoraSalida":horarioEmpleado.HoraSalida,
        "DiaLibre":horarioEmpleado.DiaLibre,
    };

    let data = 'data=' + JSON.stringify(horarioData);

    $.ajax({
        url: "http://localhost:8000/api/horarioEmpleado/update/" + horarioEmpleado.Id,
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
        url: "http://localhost:8000/api/horarioEmpleado",
        type: "GET"
    }).done(function (response) {
        $("#dataTableHorarioEmpleado").empty(); 
        var respObj = response.data;
     
        for (k in respObj) {
            let filaHTML = `<tr> 
                <td>${respObj[k].Id}</td>
                <td>${respObj[k].Empleado}</td>
                <td>${respObj[k].HoraEntrada}</td>
                <td>${respObj[k].HoraSalida}</td>
                <td>${respObj[k].DiaLibre}</td>
                <td><input type="checkbox" class="checkbox-accion" onchange=""></td>  

            </tr>`;
            let fila = $(filaHTML);
            
   
            $("#dataTableHorarioEmpleado").append(fila);
        }
    }).fail(function (error) {
        console.log(error)
    });
}

$("#sendHorarioEmpleado").click(send);