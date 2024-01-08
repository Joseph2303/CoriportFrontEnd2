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
        console.log(response);
      //  localStorage.setItem('Empleado', data);
    }).fail(function (error) {
        console.log(error);
    });
}

function deleteE(empleado) {
console.log(empleado.cells[0].textContent)
    $.ajax({
        url: "http://localhost:8000/api/empleado/delete/" + empleado.cells[0].textContent,
        type: "DELETE",

    }).done(function (response) {
        console.log(response);

        $.ajax({
            url:"http://localhost:8000/api/user/delete/" + empleado.cells[7].textContent,
            type:"DELETE",
        }).done(function(response){
            console.log(response);
        }).fail(function(error){
            console.log(error)
        });

    }).fail(function (error) {
        console.log(error);
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

function updateEmpleado(id) {
    let updatedEmployeeData = {
        "nombre": $("#nombreActualizar").val(),
        "apellido1": $("#apellido1Actualizar").val(),
        "apellido2": $("#apellido2Actualizar").val(),
        "telefono1": $("#telefono1Actualizar").val(),
        "telefono2": $("#telefono2Actualizar").val(),
        "cedula": $("#cedulaActualizar").val(),
        "fechContrat": $("#fechContratActualizar").val(),
        "idUsuario": $("#idUsuarioActualizar").val(),
        "idPuesto": $("#idPuestoActualizar").val()
    };

    let data = 'data=' + JSON.stringify(updatedEmployeeData);
    $.ajax({
        url: "http://localhost:8000/api/empleado/update/" + id,
        type: "PUT",
        data: data
    }).done(function (response) {
        console.log(response);
    }).fail(function (error) {
        console.log(error);
    });
}
event.preventDefault(); 
$.ajax({
    url:"http://localhost:8000/api/empleados",
    type:"GET"
 }).done(function(response){
     console.log(response);
     var respObj=response.data;
     for(k in respObj){
         $("#dataTableE").append(
             `<tr data-employe-id="${respObj[k].idEmpleado}">
             <td >`+respObj[k].idEmpleado+`</td>
             <td>`+respObj[k].nombre+`</td>
             <td>`+respObj[k].apellido1+`</td>
             <td>`+respObj[k].apellido2+`</td>
             <td>`+respObj[k].telefono1+`/`+respObj[k].telefono2+`</td>
             <td>`+respObj[k].cedula+`</td>
             <td>`+respObj[k].fechContrat+`</td>
             <td>`+respObj[k].usuario.email+`</td>
             <td>`+respObj[k].puesto.puesto+`</td>
             <td><input type="checkbox" class="checkbox-accion" onchange=""></td>
             </tr>`
         );

     }    
 }).fail(function(){
     
 });



$("#sendE").click(sendE);
$("#deleteE").click(deleteE);
$("#updateE").click(updateEmpleado);