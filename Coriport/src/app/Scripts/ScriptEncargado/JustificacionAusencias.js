var tabla = document.getElementById("justificacion-table");
var boxStatus = document.getElementById("fondo-status")

tabla.addEventListener('change', function (event) {
    let seleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    if (event.target.type === 'checkbox') {
        if (seleccionados.length > 1) {
            event.target.checked = false;
            alert('¡Solo puede seleccionar un empleado a la vez!')
        } else {
            if (seleccionados.length > 0) {
                boxStatus.style.display = "flex";
            } else {
                boxStatus.style.display = "none";
            }
        }
    }
});

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





function filtrar() {
    var inputBusqueda = document.getElementById('busquedaJustificacion');
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



document.getElementById("aprobar").addEventListener('click', function () {
    let seleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    if (seleccionados.length === 1) {
        let filaSeleccionada = seleccionados[0].closest('tr');

        encargado = JSON.parse(localStorage.getItem('identity'));

        let justificacionAusencias = {
           
                id: filaSeleccionada.cells[0].textContent,
                fechaSolicitud: filaSeleccionada.cells[1].textContent,
                fechaInicio: filaSeleccionada.cells[2].textContent,
                fechaFin: filaSeleccionada.cells[3].textContent,
                archivos: filaSeleccionada.cells[4].textContent, 
                justificacion: filaSeleccionada.cells[5].textContent,
                estado: 'Aceptado',
                descripcion: "Su justificacion se encuentra aceptada",
                NombreEncargado: encargado.empleado.nombre,
                idEmpleado: filaSeleccionada.getAttribute('data-employee-id')
           
        };

        // Actualizar directamente el texto de las celdas
        filaSeleccionada.cells[6].textContent = justificacionAusencias.estado;
        filaSeleccionada.cells[7].textContent = justificacionAusencias.descripcion;
        filaSeleccionada.cells[8].textContent = justificacionAusencias.encargado;

        // Opcional: puedes resaltar la fila actualizada para indicar visualmente el cambio
        filaSeleccionada.classList.add('actualizada');

        // Después de un tiempo, quita la clase de resaltado
        setTimeout(function () {
            filaSeleccionada.classList.remove('actualizada');
        }, 1000);
        // Actualizar datos en el servidor
        updateSolicitud(justificacionAusencias);
    }
});


// Esta no la hice 



document.getElementById("denegar").addEventListener('click', function () {
    let seleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    document.getElementById("div-reject").style.display = "flex";
    if (seleccionados.length === 1) {
        let filaSeleccionada = seleccionados[0].closest('tr');

        encargado = JSON.parse(localStorage.getItem('identity'));

        let solicitudVacaciones = {
            id: filaSeleccionada.cells[0].textContent,
            fechaSolicitud: filaSeleccionada.cells[1].textContent,
            fechInicio: filaSeleccionada.cells[2].textContent,
            fechFin: filaSeleccionada.cells[3].textContent,
            estado: 'Rechazado',
            descripcion: $("#reject").val(),
            encargado: encargado.empleado.nombre,
            idEmpleado: filaSeleccionada.getAttribute('data-employee-id')

        };

        // Actualizar directamente el texto de las celdas
        filaSeleccionada.cells[4].textContent = solicitudVacaciones.descripcion;
        filaSeleccionada.cells[5].textContent = solicitudVacaciones.encargado;
        filaSeleccionada.cells[6].textContent = solicitudVacaciones.estado;

        // Opcional: puedes resaltar la fila actualizada para indicar visualmente el cambio
        filaSeleccionada.classList.add('actualizada');

        // Después de un tiempo, quita la clase de resaltado
        setTimeout(function () {
            filaSeleccionada.classList.remove('actualizada');
        }, 1000);
        // Actualizar datos en el servidor
       // updateSolicitud(solicitudVacaciones);
    }
});