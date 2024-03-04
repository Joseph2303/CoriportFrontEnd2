function login(event) {
    event.preventDefault();

    let obj = {
        email: $("#email").val(),
        contrasena: $("#contrasena").val()
    };
    let data = 'data=' + JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/user/login",
        data: data,
        success: function (respObj) {
            mostrarMensajeDeInfo("Verificando datos... ")
            let token = localStorage.getItem("token");
            if (!token) {
                localStorage.setItem("token", respObj);
            }

            $.ajax({
                type: "GET",
                url: "http://localhost:8000/api/user/getidentity",
                headers: {
                    "beartoken":  localStorage.getItem("token")
                },
                success: function (identity) {

                    localStorage.setItem("identity", JSON.stringify(identity));

                    if (identity['tipoUsuario'] == 'Empleado') {

                        window.location.href = "/Coriport/src/app/views/Empleado/main.html";

                    } else if (identity['tipoUsuario'] == 'Encargado') {
                        window.location.href = "/Coriport/src/app/views/Encargado/main.html";
                    } else {
                        mostrarMensajeDeError("ERROR!! verifique los datos ingresados ")
                    }

                },
                error: function (xhr, status, error) {
                    mostrarMensajeDeError("ERROR!! : " + xhr.responseText)
                }
            });

        },
        error: function (xhr, status, error) {
            mostrarMensajeDeError("ERROR!! : " + xhr.responseText)
        }
    });
}

$("#login").click(login);

/*              $.ajax({
                url: "http://localhost:8000/api/user/comparetokens",
                type: "GET",
                headers: {
                    "beartoken": localStorage.getItem("token")
                },
            }).done(function (response) {
                if (response.status === 200) {

 

                } else {
                    mostrarMensajeDeError("ERROR!! no puedes tener dos sesiones abiertas")
                }


            }).fail(function (xhr, status, error) {
                mostrarMensajeDeError("Error!!: " + xhr.responseText);
            });    */