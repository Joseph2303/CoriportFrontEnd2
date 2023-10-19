function send(event){
    event.preventDefault(); 

    let obj={

        "email":$("#email").val(),
        "contrasena":$("#contrasena").val(),
        "tipoUsuario":"empleado"
    }
    let data ='data=' + JSON.stringify(obj);
    $.ajax({
        url:"http://localhost:8000/api/user/store",
        type:"POST",
        data:data
    }).done(function(response){
        console.log(response);
    }).fail(function(error){
        console.log(error)
    });
}
$("#send").click(send);