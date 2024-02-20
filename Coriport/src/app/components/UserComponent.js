function sendUser(event){
    event.preventDefault(); 


    let obj={
        "email":$("#email").val(),
        "contrasena":$("#contrasena").val(),
        "tipoUsuario":$("#tipoUsuario").val(),
    }
    let data ='data=' + JSON.stringify(obj);
    $.ajax({
        url:"http://localhost:8000/api/user/store",
        type:"POST",
        data:data
    }).done(function(response){
        console.log(response); 
        sendEmployee(obj.email);   
       // window.location.href = 'http://127.0.0.1:5500//Coriport/src/app/views/Encargado/MenuEncargado.html';
    
    }).fail(function (xhr, status, error) {
        console.log(xhr);
        console.log(xhr.responseText);
        mostrarMensajeDeError("ERROR!: " + xhr.responseText);
    });


}

function sendEmployee(email){
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

          document.getElementById('fondoNegroFormAdd').style.display='none';
        }).fail(function (xhr, status, error) {
            mostrarMensajeDeError("ERROR!: " + xhr.responseText);
            destroy(email);
        });

    }).fail(function (error) {
        console.log(error);
    });
}

function destroy(id){
    $.ajax({
        url:"http://localhost:8000/api/user/delete/" + id,
        type:"DELETE",
    }).done(function(response){
        console.log(response);
    }).fail(function(error){
        console.log(error)
    });
}

function find(event){
    event.preventDefault(); 


}

function update(id){
    
    let obj={
        "idUsuario": id,
        "email":$("#correo").val(),
        "tipoUsuario":$("#tipoUsuario").val(),
    }

    let data = 'data=' + JSON.stringify(obj);
    console.log(id)
    console.log(data)
    $.ajax({
        url: "http://localhost:8000/api/user/update/" + id,
        type: "PUT", 
        data: data
    }).done(function (response) {
        console.log(response);

    }).fail(function (error) {
        console.log(error);
        console.log(data)
    });
}

$.ajax({
    url:"http://localhost:8000/api/users",
    type:"GET"
 }).done(function(response){
     console.log(response);
     var respObj=response.data;
     for(k in respObj){
         $("#dataTable").append(
             `<tr data-user-id="${respObj[k].idUsuario}">
             <td >`+respObj[k].idUsuario+`</td>
             <td>`+respObj[k].email+`</td>
             <td>`+respObj[k].tipoUsuario+`</td>
             <td><input type="checkbox"></td>
             </tr>`
         );
     }    
 }).fail(function(){
     
 });


$("#sendUser").click(sendUser);
$("#destroy").click(destroy);
$("#update").click(update);

function mostrarMensajeDeError(mensaje) {
    // Crear un contenedor específico para mensajes de error

        const nuevoContenedor = document.createElement('div');
        nuevoContenedor.id = 'contenedor-errores';
        nuevoContenedor.style.position = 'fixed';
        nuevoContenedor.style.top = '0';
        nuevoContenedor.style.left = '0';
        nuevoContenedor.style.width = '100%';
        nuevoContenedor.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
        nuevoContenedor.style.color = 'white';
        nuevoContenedor.style.padding = '10px';
        nuevoContenedor.style.zIndex = '9999';
 
        document.body.appendChild(nuevoContenedor);
    

    // Crear un div para el mensaje de error
    const divMensajeError = document.createElement('div');
    divMensajeError.textContent = mensaje;

    // Añadir el div del mensaje de error al contenedor
    nuevoContenedor.appendChild(divMensajeError);

    // Eliminar el mensaje de error después de cierto tiempo (por ejemplo, 5 segundos)
    setTimeout(function () {
        nuevoContenedor.remove();
    }, 6000);
    
}

function mostrarMensajeDeInfo(mensaje) {
    // Crear un contenedor específico para mensajes de error

        const nuevoContenedor = document.createElement('div');
        nuevoContenedor.id = 'contenedor-errores';
        nuevoContenedor.style.position = 'fixed';
        nuevoContenedor.style.top = '0';
        nuevoContenedor.style.left = '0';
        nuevoContenedor.style.width = '100%';
        nuevoContenedor.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
        nuevoContenedor.style.color = 'white';
        nuevoContenedor.style.padding = '10px';
        nuevoContenedor.style.zIndex = '9999';
 
        document.body.appendChild(nuevoContenedor);
    

    // Crear un div para el mensaje de error
    const divMensajeError = document.createElement('div');
    divMensajeError.textContent = mensaje;

    // Añadir el div del mensaje de error al contenedor
    nuevoContenedor.appendChild(divMensajeError);

    // Eliminar el mensaje de error después de cierto tiempo (por ejemplo, 5 segundos)
    setTimeout(function () {
        nuevoContenedor.remove();
    }, 6000);
    
}