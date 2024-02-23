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
            localStorage.setItem("token", respObj);
            let token = localStorage.getItem("token");

            if (token) {
                $.ajax({
                    type: "GET", 
                    url: "http://localhost:8000/api/user/getidentity",
                    headers: {
                        "beartoken": token
                    },
                    success: function (identity) {
                       
                        localStorage.setItem("identity",JSON.stringify(identity));
                       
                        console.log(identity)

                        if (identity['tipoUsuario']=='empleado') {

                            
                            window.location.href ="http://127.0.0.1:5500/Coriport/src/app/views/Empleado/main.html";

                        }else if(identity['tipoUsuario']=='admin'){
                            window.location.href ="http://127.0.0.1:5500/Coriport/src/app/views/Encargado/main.html";
                        }else{
                            console.log("ERROR DE VALIDACION")
                            mostrarMensajeDeError("ERROR!! verifique los datos ingresados ")
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log(error);
                        mostrarMensajeDeError("ERROR!! : " + xhr.responseText)
                    }
                });
            }
        },
        error: function (xhr, status, error) {
            console.log(error);
            mostrarMensajeDeError("ERROR!! : " + xhr.responseText)
        }
    });
}

$("#login").click(login);  