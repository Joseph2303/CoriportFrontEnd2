function login(event) {
    event.preventDefault();

    let obj = {
        email: $("#email").val(),
        contrasena: $("#contrasena").val()
    };
    let data = 'data=' + JSON.stringify(obj);
    mostrarMensajeDeInfo("Verificando datos, espere un momento... ")

    $.ajax({
        type: "POST",
        url: "http://localhost:8000/api/user/login",
        data: data,
        success: function (respObj) {
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
                        localStorage.removeItem("token");
                        mostrarMensajeDeError("ERROR!! verifique los datos ingresados ")
                    }

                },
                error: function (xhr, status, error) {
                    mostrarMensajeDeError("ERROR!! hola: " + xhr.responseJSON.message)
                }
            });

        },
        error: function (xhr, status, error) {
            if (xhr.status === 500 || xhr.status === 0) {
                mostrarMensajeDeError("El servidor no responde. Por favor, inténtalo de nuevo más tarde.");
            } else {
                mostrarMensajeDeError("ERROR!! : " + xhr.responseJSON.message)
            }
        }
    });
}

$("#login").click(login);
