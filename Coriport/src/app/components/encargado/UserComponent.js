function sendUser(event) {
    event.preventDefault();

    let obj = {
        "email": $("#email").val(),
        "contrasena": $("#contrasena").val(),
        "tipoUsuario": $("#tipoUsuario").val(),
    }
    let data = 'data=' + JSON.stringify(obj);
    $.ajax({
        url: "http://localhost:8000/api/user/store",
        type: "POST",
        data: data
    }).done(function (response) {
        console.log(response);
        sendEmployee(obj.email);
        // window.location.href = 'http://127.0.0.1:5500//Coriport/src/app/views/Encargado/MenuEncargado.html';

    }).fail(function (xhr, status, error) {
        console.log(xhr);
        console.log(xhr.responseText);
        mostrarMensajeDeError("ERROR!: " + xhr.responseText);
    });
}

function sendEmployee(email) {
    $.ajax({
        url: "http://localhost:8000/api/user/" + email,
        type: "GET",
    }).done(function (response) {
        let obj = {
            "nombre": $("#nombre").val(),
            "apellido1": $("#apellido1").val(),
            "apellido2": $("#apellido2").val(),
            "telefono1": $("#telefono1").val(),
            "telefono2": $("#telefono2").val(),
            "cedula": $("#cedula").val(),
            "fechContrat": $("#fechContrat").val(),
            "idUsuario": response.idUsuario,
            "idPuesto": $("#idPuesto").val()
        };

        console.log(obj)
        let data = 'data=' + JSON.stringify(obj);

        $.ajax({
            url: "http://localhost:8000/api/empleado/store",
            type: "POST",
            data: data

        }).done(function (response) {
            console.log(response);
            //  localStorage.setItem('Empleado', data);

            document.getElementById('fondoNegroFormAdd').style.display = 'none';
            mostrarMensajeDeInfo("Se ha registrado exitosamente");

        }).fail(function (xhr, status, error) {          
            mostrarMensajeDeError("ERROR!: " + xhr.responseText);
            destroy(email);
        });

    }).fail(function (error) {
        console.log(error);
    });
}

function destroy(id) {
    $.ajax({
        url: "http://localhost:8000/api/user/delete/" + id,
        type: "DELETE",
    }).done(function (response) {
        console.log(response);
    }).fail(function (error) {
        console.log(error)
    });
}

function update() {

    let obj = {
        "idUsuario": $("#idUpdate").val(),
        "email": $("#emailUpdate").val(),
        "tipoUsuario": $("#tipoUsuarioUpdate").val(),
    }

    let data = 'data=' + JSON.stringify(obj);
    console.log(data)
    $.ajax({
        url: "http://localhost:8000/api/user/update/" + obj.idUsuario,
        type: "PUT",
        data: data
    }).done(function (response) {
        mostrarMensajeDeInfo("Se ha actualizado exitosamente");
        document.getElementById('fondoNegroFormUpdateU').style.display = 'none';

    }).fail(function (xhr, status, error) {
        console.log(error);
        console.log(data);
        mostrarMensajeDeError("ERROR!!: " + xhr.responseText)
    });
}

$("#sendUser").click(sendUser);
$("#destroy").click(destroy);
$("#updateU").click(update);





