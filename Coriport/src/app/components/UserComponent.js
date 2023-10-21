function send(event){
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
        localStorage.setItem('id', response.data.id);
        
    }).fail(function(error){
        console.log(error)
    });
}

function destroy(id){
   // let id = $("#id").val() 
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
        "id": id,
        "email":$("#email").val(),
        "contrasena":$("#contrasena").val(),
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
        window.location.href ="http://127.0.0.1:5500//Coriport/src/app/views/Encargado/MenuEncargado.html";

    }).fail(function (error) {
        console.log(error);
        console.log(data)
    });
}

event.preventDefault(); 
$.ajax({
    url:"http://localhost:8000/api/users",
    type:"GET"
 }).done(function(response){
     console.log(response);
     var respObj=response.data;
     for(k in respObj){
         $("#dataTable").append(
             `<tr data-user-id="${respObj[k].id}">
             <td >`+respObj[k].id+`</td>
             <td>`+respObj[k].email+`</td>
             <td>`+respObj[k].contrasena+`</td>
             <td>`+respObj[k].tipoUsuario+`</td>
             <td><input type="checkbox"></td>
             </tr>`
         );
     }    
 }).fail(function(){
     
 });


$("#send").click(send);
$("#destroy").click(destroy);
$("#update").click(update);