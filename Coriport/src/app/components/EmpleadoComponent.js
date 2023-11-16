function send(event) {
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
        localStorage.setItem('Empleado', data);
    }).fail(function (error) {
        console.log(error);
    });
}

function deleteEmpleado(event) {
    event.preventDefault();

    let id = $("#employeeId").val();
    $.ajax({
        url: "http://localhost:8000/api/empleado/delete/" + id,
        type: "DELETE",
    }).done(function (response) {
        console.log(response);
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

function updateEmpleado(event) {
    event.preventDefault();

    let id = $("#empleadoId").val();
    let updatedEmployeeData = {
        "nombre": $("#newNombre").val(),
        "apellido1": $("#newApellido1").val(),
        "apellido2": $("#newApellido2").val(),
        "telefono1": $("#newTelefono1").val(),
        "telefono2": $("#newTelefono2").val(),
        "cedula": $("#newCedula").val(),
        "fechaContrat": $("#newFechaContrat").val(),
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
         $("#employee-table-body").append(
             `<tr data-user-id="${respObj[k].id}">
             <td >`+respObj[k].idEmpleado+`</td>
             <td>`+respObj[k].nombre+`</td>
             <td>`+respObj[k].apellido1+`</td>
             <td>`+respObj[k].apellido2+`</td>
             <td>`+respObj[k].telefono1+`</td>
             <td>`+respObj[k].cedula+`</td>
             <td>`+respObj[k].fechContrat+`</td>
             <td>`+respObj[k].usuario.email+`</td>
             <td>`+respObj[k].puesto.puesto+`</td>
             <td><input type="checkbox"></td>
             </tr>`
         );

     }    
 }).fail(function(){
     
 });



$("#sendE").click(send);
$("#destroyE").click(destroy);
$("#updateE").click(update);