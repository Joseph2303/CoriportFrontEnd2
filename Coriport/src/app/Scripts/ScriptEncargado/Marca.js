var tabla = document.getElementById("marca-table");

function filtrar() {
    var inputBusqueda = document.getElementById('buscarMarca');
    var filtro = inputBusqueda.value.toUpperCase();

    var filas = tabla.getElementsByTagName('tr');

    for (var i = 0; i < filas.length; i++) {
        if (filas[i].getElementsByTagName('th').length === 0) {
            var celdas = filas[i].getElementsByTagName('td');
            var mostrarFila = false;

            for (var j = 0; j < celdas.length; j++) {
                var textoCelda = celdas[j].textContent || celdas[j].innerText;
                if (textoCelda.toUpperCase().indexOf(filtro) > -1) {
                    mostrarFila = true;
                    break;
                }
            }

            filas[i].style.display = mostrarFila ? '' : 'none';
        }
    }
}

$(document).on("click", "#empleado", function () {
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
$(document).mouseup(function (e) {
    var container = $("#popup");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});
