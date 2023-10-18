function send(event){
    event.preventDefault(); 

    let data={

        "email":$("#email").val(),
        "contrasena":$("#contarsena").val(),
        "tipoUsuario":"Empleado"
    }
    $.ajax({
        url:"http://localhost:8000/api/user/store",
        type:"POST",
        data:data
    }).done(function(response){
        console.log(response);
    }).fail(function(error){
        console.log(data)
        console.log(error)
    });
}
$("#send").click(send);