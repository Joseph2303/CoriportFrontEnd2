

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

function updateEmpleado() {
    let updatedEmployeeData = {
        "idEmpleado": $("#idEmpleado").val(),
        "nombre": $("#updateNombre").val(),
        "apellido1": $("#updateApellido1").val(),
        "apellido2": $("#updateApellido2").val(),
        "telefono1": $("#updateTelefono1").val(),
        "telefono2": $("#updateTelefono2").val(),
        "cedula": $("#updateCedula").val(),
        "fechContrat": $("#updateFechContrat").val(),
        "idPuesto": $("#updatePuesto").val(),
    };

    let data = 'data=' + JSON.stringify(updatedEmployeeData);
    console.log(data)
    $.ajax({
        url: "http://localhost:8000/api/empleado/update/" + updatedEmployeeData.idEmpleado,
        type: "PUT",
        data: data
    }).done(function (response) {
        mostrarMensajeDeInfo("Se ha actualizado exitosamente");
        document.getElementById('fondoNegroFormUpdateE').style.display = 'none';
    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseText);
    });
}

$.ajax({
    url: "http://localhost:8000/api/soliVacaciones",
    type: "GET"
}).done(function (response) {
    var respObj = response.data;
    for (k in respObj) {
        $("#dataTableSV").append(
            `<tr data-empleado="${encodeURIComponent(JSON.stringify(respObj[k].empleado))}">
             <td >`+ respObj[k].idSoliVacaciones + `</td>
             <td>`+ respObj[k].fechSolicitud + `</td>
             <td>`+ respObj[k].fechInicio + `</td>
             <td>`+ respObj[k].fechFin + `</td>
             <td>`+ respObj[k].descripcion + `</td>
             <td>`+ respObj[k].responsableAut + `</td>
            <td>`+ respObj[k].estado + `</td>
            <td id="empleado" >`+ respObj[k].empleado.nombre + `</td>
             <td><input type="checkbox" class="checkbox-accion" onchange=""></td>
             </tr>`
        );

    }
}).fail(function (error) {
console.log(error)
});




$(document).on("click", "#empleado", function() {
    // Obtener la cadena JSON del atributo de datos
    var empleadoString = decodeURIComponent($(this).closest("tr").data("empleado"));

    // Convertir la cadena JSON a un objeto JavaScript
    var empleado = JSON.parse(empleadoString);

    var detallesHTML = `
        <table>
            <tr>
                <th>Nombre:</th>
                <td>${empleado.nombre}</td>
            </tr>
            <tr>
                <th>Apellido 1:</th>
                <td>${empleado.apellido1}</td>
            </tr>
            <tr>
                <th>Apellido 2:</th>
                <td>${empleado.apellido2}</td>
            </tr>
            <tr>
                <th>Teléfonos:</th>
                <td>${empleado.telefono1}/${empleado.telefono2}</td>
            </tr>
            <tr>
                <th>Cedula:</th>
                <td>${empleado.cedula}</td>
            </tr>
            <tr>
                <th>Fecha de contrato:</th>
                <td>${empleado.fechContrat}</td>
            </tr>
            <tr>
            <th>Email:</th>
            <td>${empleado.usuario.email}</td>
        </tr>       
             <tr>
        <th>Puesto:</th>
        <td>${empleado.puesto.puesto}</td>
    </tr>
            <!-- Agrega más filas según sea necesario -->
        </table>`;

    // Mostrar la pantalla emergente con los detalles del empleado
    $("#popup-content").html(detallesHTML);
    $("#popup").show();
});

// Evento para cerrar la pantalla emergente al hacer clic fuera de ella
$(document).mouseup(function(e) {
    var container = $("#popup");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});

