function sendE(event) {
    event.preventDefault();

    let empleadoData = {
        "nombre": $("#nombre").val(),
        "apellido1": $("#apellido1").val(),
        "apellido2": $("#apellido2").val(),
        "telefono1": $("#telefono1").val(),
        "telefono2": $("#telefono2").val(),
        "cedula": $("#cedula").val(),
        "fechContrat": $("#fechContrat").val(),
        "idUsuario": $("#idUsuario").val(),
        "idPuesto": $("#idPuesto").val()
    };

    let data = 'data=' + JSON.stringify(empleadoData);

    $.ajax({
        url: "http://localhost:8000/api/empleado/store",
        type: "POST",
        data: data

    }).done(function (response) {
        cargarTabla()
        console.log(response);
    }).fail(function (error) {
        console.log(error);
    });
}

function deleteE(empleado) {

    $.ajax({
        url: "http://localhost:8000/api/empleado/delete/" + empleado.cells[0].textContent,
        type: "DELETE",

    }).done(function (response) {
        console.log(response);

        $.ajax({
            url: "http://localhost:8000/api/user/delete/" + empleado.cells[7].textContent,
            type: "DELETE",
        }).done(function (response) {
            console.log(response);



        }).fail(function (error) {
            console.log(error)
        });

    }).fail(function (xhr, status, error) {
        console.log(xhr);
        mostrarMensajeDeError(xhr.responseText)
    });
}

function findEmpleado(event) {
    event.preventDefault();

    let id = $("#searchEmpleadoId").val();
    $.ajax({
        url: "http://localhost:8000/api/empleado/show/" + id,
        type: "GET",
    }).done(function (response) {
        console.log(response);
    }).fail(function (error) {
        console.log(error);
    });
}

function updateEmpleado() {
    let updatedEmployeeData = {
        "idEmpleado": $("#idEmpleado").val(),
        "nombre": $("#updateNombre").val(),
        "apellido1": $("#updateApellido1").val(),
        "apellido2": $("#updateApellido2").val(),
        "telefono1": $("#updateTelefono1").val(),
        "telefono2": $("#updateTelefono2").val(),
        "cedula": $("#updateCedula").val(),
        "fechContrat": $("#updateFechContrat").val(),
        "idPuesto": $("#updatePuesto").val(),
    };

    let data = 'data=' + JSON.stringify(updatedEmployeeData);
    console.log(data)
    $.ajax({
        url: "http://localhost:8000/api/empleado/update/" + updatedEmployeeData.idEmpleado,
        type: "PUT",
        data: data
    }).done(function (response) {
        cargarTabla()
        mostrarMensajeDeInfo("Se ha actualizado exitosamente");
        document.getElementById('fondoNegroFormUpdateE').style.display = 'none';
    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseText);
    });
}

$(document).ready(function () {
    cargarTabla();
});


function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/empleados",
        type: "GET"
    }).done(function (response) {
        $("#dataTableE").empty(); 
        var respObj = response.data;
        for (k in respObj) {
            $("#dataTableE").append(
                `<tr data-user-id="${respObj[k].idUsuario}" data-phone1-user="${respObj[k].telefono1}" data-phone2-user="${respObj[k].telefono2}" data-user-tipe="${respObj[k].usuario.tipoUsuario}">
             <td >`+ respObj[k].idEmpleado + `</td>
             <td>`+ respObj[k].nombre + `</td>
             <td>`+ respObj[k].apellido1 + `</td>
             <td>`+ respObj[k].apellido2 + `</td>
             <td>`+ respObj[k].telefono1 + `/` + respObj[k].telefono2 + `</td>
             <td>`+ respObj[k].cedula + `</td>
             <td>`+ respObj[k].fechContrat + `</td>
             <td>`+ respObj[k].usuario.email + `</td>
             <td>`+ respObj[k].puesto.puesto + `</td>
             <td><input type="checkbox" class="checkbox-accion" onchange=""></td>
             </tr>`
            );

        }
    }).fail(function () {

    });

}

$("#sendE").click(sendE);
$("#deleteE").click(deleteE);
$("#updateE").click(updateEmpleado);