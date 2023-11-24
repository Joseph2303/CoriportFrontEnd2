
   
/*async function login(event){
    event.preventDefault(); 
    let data={
        email:$("#email").val(),
        password:$("#password").val()
    }

    //let obj = { email:email.value, password:password.value };
    const res = await fetch('http://localhost:8000/api/user/login', {
         method:'POST',
         mode: 'cors',
         headers:{
               //'X-CSRF-TOKEN': _token.value,
               'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)      
        }).then(function(response){
            return response.json();
        }).then(function(respObj){
            console.log(respObj.token);
          //  sessionStorage.setItem("token",respObj.token);
    
        }).catch(error=>{
            console.log("Error en la petición");
            console.log(error);
        });
   
        data = await res.json()
        console.log(data)
        clearInput()
       }

       function clearInput(){
           email.value = ""
           password.value = ""
}* */

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
                    type: "GET", // Cambiamos a método GET
                    url: "http://localhost:8000/api/user/getidentity",
                    headers: {
                        "beartoken": token
                    },
                    success: function (identity) {
                        localStorage.setItem("identity",JSON.stringify(identity));
                       
                        console.log(identity)

                        if (identity['tipoUsuario']=='empleado') {

                            console.log("EMPLEADO")
                            //window.location.href = "dashboard.html";
                        }else if(identity['tipoUsuario']=='admin'){
                            window.location.href ="http://127.0.0.1:5500//Coriport/src/app/views/Encargado/MenuEncargado.html";
                        }else{
                            console.log("ERROR DE VALIDACION")
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}

$("#login").click(login);