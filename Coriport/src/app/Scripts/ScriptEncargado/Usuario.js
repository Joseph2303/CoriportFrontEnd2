const consulta = document.getElementById('btnAbrirFormulario');
const selectPuestos = document.getElementById('idPuesto');
const selectUsuario = document.getElementById('idUsuario');

consulta.addEventListener('click', function () {

    fetch('http://localhost:8000/api/puestos')
        .then(response => response.json())
        .then(result => {
            const data = result.data;


            selectPuestos.innerHTML = '';

            const opcionPredeterminada = document.createElement('option');
            opcionPredeterminada.value = '';
            opcionPredeterminada.textContent = 'Selecciona un puesto';
            selectPuestos.appendChild(opcionPredeterminada);

            data.forEach(puesto => {
                const opcion = document.createElement('option');
                opcion.value = puesto.id;
                opcion.textContent = puesto.puesto;
                selectPuestos.appendChild(opcion);
            });
        })
        .catch(error => {
            console.error('Error al obtener los puestos:', error);
        });

    fetch('http://localhost:8000/api/users')
        .then(response => response.json())
        .then(result => {
            const data = result.data;


            selectUsuario.innerHTML = '';

            const opcionPredeterminada = document.createElement('option');
            opcionPredeterminada.value = '';
            opcionPredeterminada.textContent = 'Selecciona un correo';
            selectUsuario.appendChild(opcionPredeterminada);


            data.forEach(usuario => {
                const opcion = document.createElement('option');
                opcion.value = usuario.id;
                opcion.textContent = usuario.email;
                selectUsuario.appendChild(opcion);
            });
        })
        .catch(error => {
            console.error('Error al obtener los correos:', error);
        });
});



const botonAgregar = document.getElementById('agregar-usuario');
botonAgregar.addEventListener('click', function () {
    const pantallaEmergente = document.createElement('div');
    pantallaEmergente.style.position = 'fixed';
    pantallaEmergente.style.top = 0;
    pantallaEmergente.style.left = 0;
    pantallaEmergente.style.width = '100%';
    pantallaEmergente.style.height = '100%';
    pantallaEmergente.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    pantallaEmergente.style.display = 'flex';
    pantallaEmergente.style.justifyContent = 'center';
    pantallaEmergente.style.alignItems = 'center';
    const formulario = document.createElement('form');

    const labelEmail = document.createElement('label');
    labelEmail.for = 'email';
    labelEmail.textContent = 'Correo Electrónico:';

    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.id = 'email';
    inputEmail.name = 'data[email]';
    inputEmail.required = true;
    inputEmail.style.border = '1px solid #007bff';

    const labelContrasena = document.createElement('label');
    labelContrasena.for = 'contrasena';
    labelContrasena.textContent = 'Contraseña:';

    const inputContrasena = document.createElement('input');
    inputContrasena.type = 'password';
    inputContrasena.id = 'contrasena';
    inputContrasena.name = 'data[contrasena]';
    inputContrasena.required = true;
    inputContrasena.style.border = '1px solid #007bff';

    const labelTipoUsuario = document.createElement('label');
    labelTipoUsuario.for = 'tipoUsuario';
    labelTipoUsuario.textContent = 'Tipo de Usuario:';

    const inputTipoUsuario = document.createElement('input');
    inputTipoUsuario.type = 'text';
    inputTipoUsuario.id = 'tipoUsuario';
    inputTipoUsuario.name = 'data[tipoUsuario]';
    inputTipoUsuario.required = true;
    inputTipoUsuario.style.border = '1px solid #007bff';

    const botonRegistrarse = document.createElement('button');
    botonRegistrarse.type = 'submit';

    botonRegistrarse.textContent = 'Registrarse';
    botonRegistrarse.style.marginTop = '10px';
    botonRegistrarse.style.marginLeft = '20px';
    botonRegistrarse.style.marginRight = '20px';
    botonRegistrarse.id = 'send';


    formulario.appendChild(labelEmail);
    formulario.appendChild(inputEmail);
    formulario.appendChild(document.createElement('br'));
    formulario.appendChild(document.createElement('br'));
    formulario.appendChild(labelContrasena);
    formulario.appendChild(inputContrasena);
    formulario.appendChild(document.createElement('br'));
    formulario.appendChild(document.createElement('br'));
    formulario.appendChild(labelTipoUsuario);
    formulario.appendChild(inputTipoUsuario);
    formulario.appendChild(document.createElement('br'));
    formulario.appendChild(document.createElement('br'));
    formulario.appendChild(botonRegistrarse);

    const botonCerrar = document.createElement('button');
    botonCerrar.type = 'button';
    botonCerrar.textContent = 'Cerrar';
    botonCerrar.style.marginRight = '20px';
    botonCerrar.style.marginLeft = '20px';
    botonCerrar.style.marginBottom = '10px'; // Añade espacio abajo del botón
    botonCerrar.style.backgroundColor = '#007bff';
    botonCerrar.style.color = 'white';
    botonCerrar.style.padding = '10px 20px';
    botonCerrar.style.borderRadius = '3px';
    botonCerrar.style.border = 'none';
    botonCerrar.style.cursor = 'pointer';

    botonCerrar.addEventListener('click', function () {
        pantallaEmergente.remove();
    });

    formulario.appendChild(botonCerrar);

    pantallaEmergente.appendChild(formulario);
    document.body.appendChild(pantallaEmergente);
    document.getElementById('send').addEventListener('click', send);
    document.getElementById('destroy').addEventListener('click', destroy);

});



const tablaUsuarios = document.getElementById('tabla-usuarios');
const botonEliminarSeleccionados = document.getElementById('eliminar-seleccionados');
const botonActualizarSeleccionados = document.getElementById('actualizar-seleccionados');

function actualizarTabla() {
    // ... Resto del código se mantiene igual ...
}

let usuariosSeleccionados = 0;

function actualizarBotones() {
    let checkboxesSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    usuariosSeleccionados = checkboxesSeleccionados.length;

    if (usuariosSeleccionados > 0) {
        botonEliminarSeleccionados.style.display = 'inline-block';
        botonActualizarSeleccionados.style.display = 'inline-block';
    } else {
        botonEliminarSeleccionados.style.display = 'none';
        botonActualizarSeleccionados.style.display = 'none';
    }
}

function confirmarBorrado() {
    const pantallaEmergente = document.createElement('div');
    pantallaEmergente.style.position = 'fixed';
    pantallaEmergente.style.top = 0;
    pantallaEmergente.style.left = 0;
    pantallaEmergente.style.width = '100%';
    pantallaEmergente.style.height = '100%';
    pantallaEmergente.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    pantallaEmergente.style.display = 'flex';
    pantallaEmergente.style.justifyContent = 'center';
    pantallaEmergente.style.alignItems = 'center';

    const mensaje = document.createElement('div');
    mensaje.style.backgroundColor = 'white';
    mensaje.style.padding = '20px';
    mensaje.style.borderRadius = '10px';
    mensaje.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';

    const texto = document.createElement('p');
    texto.textContent = '¿Estás seguro de que quieres borrar esto?';

    const botonAceptar = document.createElement('button');
    botonAceptar.textContent = 'Aceptar';
    botonAceptar.style.backgroundColor = '#007bff';
    botonAceptar.style.color = 'white';
    botonAceptar.style.padding = '10px 20px';
    botonAceptar.style.borderRadius = '5px';
    botonAceptar.style.border = 'none';
    botonAceptar.style.cursor = 'pointer';
    botonAceptar.style.marginRight = '10px';

    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.style.backgroundColor = '#007bff';
    botonCancelar.style.color = 'white';
    botonCancelar.style.padding = '10px 20px';
    botonCancelar.style.borderRadius = '5px';
    botonCancelar.style.border = 'none';
    botonCancelar.style.cursor = 'pointer';

    botonAceptar.addEventListener('click', function () {
        pantallaEmergente.remove();
        const checkboxesSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked');

        checkboxesSeleccionados.forEach(function (checkbox) {
            const fila = checkbox.closest('tr');
            const userId = fila.dataset.userId;
            destroy(userId);
            fila.remove();
        });

        actualizarBotones();
    });

    botonCancelar.addEventListener('click', function () {
        pantallaEmergente.remove();
    });

    mensaje.appendChild(texto);
    mensaje.appendChild(botonAceptar);
    mensaje.appendChild(botonCancelar);

    pantallaEmergente.appendChild(mensaje);
    document.body.appendChild(pantallaEmergente);


}

tablaUsuarios.addEventListener('change', function (event) {
    if (event.target.type === 'checkbox') {
        if (event.target.checked && usuariosSeleccionados >= 1) {
            event.target.checked = false; // Desmarca el checkbox si ya hay dos usuarios seleccionados
            alert('¡Solo puedes seleccionar un usuario a la vez!')
        } else {
            actualizarBotones();
        }
    }
});

botonEliminarSeleccionados.addEventListener('click', function () {
    const checkboxesSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxesSeleccionados.length > 0) {
        confirmarBorrado();
    }
});

botonActualizarSeleccionados.addEventListener('click', function () {
    const checkboxesSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxesSeleccionados.forEach(function (checkbox) {
        const fila = checkbox.closest('tr');

        const id = fila.cells[0].textContent;

        const datosActuales = {
            id: fila.cells[0].textContent,
            correo: fila.cells[1].textContent,
            tipoUsuario: fila.cells[2].textContent,
        };

        mostrarFormularioActualizacion(datosActuales, function (datosActualizados) {

            actualizarFila(fila, datosActualizados);
        });

    });
    actualizarBotones();
});

actualizarTabla();

function mostrarFormularioActualizacion(datosActuales, callback) {
    const pantallaEmergente = document.createElement('div');
    pantallaEmergente.style.position = 'fixed';
    pantallaEmergente.style.top = 0;
    pantallaEmergente.style.left = 0;
    pantallaEmergente.style.width = '100%';
    pantallaEmergente.style.height = '100%';
    pantallaEmergente.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    pantallaEmergente.style.display = 'flex';
    pantallaEmergente.style.justifyContent = 'center';
    pantallaEmergente.style.alignItems = 'center';
    const formulario = document.createElement('form');

    const labelId = document.createElement('label');
    labelId.for = 'id';
    labelId.textContent = 'ID:';
    const inputId = document.createElement('input');
    inputId.type = 'text';
    inputId.id = 'id';
    inputId.name = 'id';
    inputId.value = datosActuales.id;

    const labelCorreo = document.createElement('label');
    labelCorreo.for = 'correo';
    labelCorreo.textContent = 'Correo Electrónico:';
    const inputCorreo = document.createElement('input');
    inputCorreo.type = 'email';
    inputCorreo.id = 'correo';
    inputCorreo.name = 'correo';
    inputCorreo.value = datosActuales.correo;
    const labelTipoUsuario = document.createElement('label');
    labelTipoUsuario.for = 'tipoUsuario';
    labelTipoUsuario.textContent = 'Tipo de Usuario:';
    const inputTipoUsuario = document.createElement('input');
    inputTipoUsuario.type = 'text';
    inputTipoUsuario.id = 'tipoUsuario';
    inputTipoUsuario.name = 'tipoUsuario';
    inputTipoUsuario.value = datosActuales.tipoUsuario;

    const botonActualizar = document.createElement('button');
    botonActualizar.type = 'button';
    botonActualizar.textContent = 'Enviar';
    botonActualizar.style.marginTop = '10px';
    botonActualizar.style.marginLeft = '20px';
    botonActualizar.style.marginRight = '20px';
    botonActualizar.style.backgroundColor = '#007bff';
    botonActualizar.style.color = 'white';
    botonActualizar.style.padding = '10px 20px';
    botonActualizar.style.borderRadius = '3px';
    botonActualizar.style.border = 'none';
    botonActualizar.style.cursor = 'pointer';

    botonActualizar.addEventListener('click', function () {
        update(datosActuales.id);

        const datosActualizados = {
            id: document.getElementById('id').value,
            correo: document.getElementById('correo').value,
            tipoUsuario: document.getElementById('tipoUsuario').value,
        };

        callback(datosActualizados);

        pantallaEmergente.remove();
    });

    const botonCancelar = document.createElement('button');
    botonCancelar.type = 'button';
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.style.marginRight = '20px';
    botonCancelar.style.marginLeft = '20px';
    botonCancelar.style.marginBottom = '10px';
    botonCancelar.style.backgroundColor = '#007bff';
    botonCancelar.style.color = 'white';
    botonCancelar.style.padding = '10px 20px';
    botonCancelar.style.borderRadius = '3px';
    botonCancelar.style.border = 'none';
    botonCancelar.style.cursor = 'pointer';

    botonCancelar.addEventListener('click', function () {
        pantallaEmergente.remove();
    });

    formulario.appendChild(labelId);
    formulario.appendChild(inputId);
    formulario.appendChild(document.createElement('br'));
    formulario.appendChild(document.createElement('br'));
    formulario.appendChild(labelCorreo);
    formulario.appendChild(inputCorreo);
    formulario.appendChild(document.createElement('br'));
    formulario.appendChild(document.createElement('br'));
    formulario.appendChild(labelTipoUsuario);
    formulario.appendChild(inputTipoUsuario);
    formulario.appendChild(document.createElement('br'));
    formulario.appendChild(document.createElement('br'));
    formulario.appendChild(botonActualizar);
    formulario.appendChild(botonCancelar);

    pantallaEmergente.appendChild(formulario);
    document.body.appendChild(pantallaEmergente);
}



function actualizarFila(fila, datosActualizados) {
    const celdas = fila.getElementsByTagName('td');

    celdas[1].textContent = datosActualizados.correo;
    celdas[2].textContent = datosActualizados.tipoUsuario;

}


function filtrarUsuarios() {
    var inputBusqueda = document.getElementById('busquedaUsuario');
    var filtro = inputBusqueda.value.toUpperCase();

    var tabla = document.getElementById('tabla-usuarios');
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

function filtrarEmpleados() {
    var inputBusqueda = document.getElementById('busquedaEmpleado');
    var filtro = inputBusqueda.value.toUpperCase();

    var tabla = document.getElementById('employee-table');
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

actualizarBotones










///////////////////////////////////////////////////////////////








$(document).ready(function () {
    // Cargar empleados al cargar la página
    loadEmployees();

    // Seleccionar fila al hacer clic
    $('#employee-table').on('click', 'tbody tr', function () {
        $(this).addClass('selected-row').siblings().removeClass('selected-row');
        fillFormWithSelectedEmployee();
    });
});

function submitForm() {
    var formData = getFormData();

    $.ajax({
        type: 'POST',
        url: 'ruta_del_controlador', // Reemplazar con la ruta correcta del controlador
        data: {data: JSON.stringify(formData)},
        success: function (response) {
            displayMessage(response);
            loadEmployees();
            clearForm();
        },
        error: function (error) {
            displayMessage({status: 500, message: 'Error interno del servidor'}, 'error');
        }
    });
}

function updateEmployee() {
    var formData = getFormData();

    $.ajax({
        type: 'PUT',
        url: 'ruta_del_controlador/' + formData.id, // Reemplazar con la ruta correcta del controlador
        data: {data: JSON.stringify(formData)},
        success: function (response) {
            displayMessage(response);
            loadEmployees();
            clearForm();
        },
        error: function (error) {
            displayMessage({status: 500, message: 'Error interno del servidor'}, 'error');
        }
    });
}

function deleteEmployee() {

    var formData = getFormData();

    $.ajax({
        type: 'DELETE',
        url: 'ruta_del_controlador/' + formData.id, // Reemplazar con la ruta correcta del controlador
        success: function (response) {
            displayMessage(response);
            loadEmployees();
            clearForm();
        },
        error: function (error) {
            displayMessage({status: 500, message: 'Error interno del servidor'}, 'error');
        }
    });

}

function displayMessage(response, type = 'success') {

    var messageElement = $('#message');
    messageElement.text(response.message);

    if (type === 'success') {
        messageElement.removeClass('error').addClass('success');
    } else {
        messageElement.removeClass('success').addClass('error');
    }

    messageElement.fadeIn(300).delay(3000).fadeOut(400);

}

function getFormData() {
    return {
        id: $('#id').val(),
        nombre: $('#nombre').val(),
        apellido1: $('#apellido1').val(),
        apellido2: $('#apellido2').val(),
        telefono1: $('#telefono1').val(),
        telefono2: $('#telefono2').val(),
        cedula: $('#cedula').val(),
        fechContrat: $('#fechContrat').val(),
        idUsuario: $('#idUsuario').val(),
        idPuesto: $('#idPuesto').val(),
    };
}

function loadEmployees() {
    // Simulación de datos (debes cargar tus datos reales aquí)
    var employees = [
        { id: 1, nombre: 'Nombre1', apellido1: 'Apellido1', apellido2: 'Apellido2', telefono1: '123', telefono2: '456', cedula: '123456', fechContrat: '2023-01-01', idUsuario: '1', idPuesto: '1' },
        { id: 2, nombre: 'Nombre2', apellido1: 'Apellido1', apellido2: 'Apellido2', telefono1: '456', telefono2: '789', cedula: '789012', fechContrat: '2023-01-02', idUsuario: '2', idPuesto: '2' },
        // Agregar más datos según sea necesario
    ];

    // Limpiar tabla antes de cargar nuevos datos
    $('#employee-table-body').empty();
}

function updateEmployeeInTable(employeeId) {
    // Obtener datos del empleado seleccionado
    var employee = getEmployeeById(employeeId);

    // Llenar el formulario con los datos del empleado seleccionado
    fillForm(employee);
}

function deleteEmployeeInTable(employeeId) {
    // Realizar la acción de eliminar según el ID del empleado
    deleteEmployeeById(employeeId);
}

function getEmployeeById(employeeId) {
    // Simulación de búsqueda del empleado por ID (debes usar tus propios métodos para obtener datos reales)
    var employees = [
        { id: 1, nombre: 'Nombre1', apellido1: 'Apellido1', apellido2: 'Apellido2', telefono1: '123', telefono2: '456', cedula: '123456', fechContrat: '2023-01-01', idUsuario: '1', idPuesto: '1' },
        { id: 2, nombre: 'Nombre2', apellido1: 'Apellido1', apellido2: 'Apellido2', telefono1: '456', telefono2: '789', cedula: '789012', fechContrat: '2023-01-02', idUsuario: '2', idPuesto: '2' },
        // Agregar más datos según sea necesario
    ];

    return employees.find(employee => employee.id === employeeId);
}

function deleteEmployeeById(employeeId) {
    // Realizar la acción de eliminar según el ID del empleado (puedes llamar a tu función deleteEmployee aquí)
    // Aquí simularemos la eliminación de la fila de la tabla
    $(`#employee-table-body tr[data-id=${employeeId}]`).remove();
    clearForm(); // Limpiar el formulario después de la eliminación
}

function fillForm(employee) {
    // Llenar el formulario con los datos del empleado
    $('#id').val(employee.id);
    $('#nombre').val(employee.nombre);
    $('#apellido1').val(employee.apellido1);
    $('#apellido2').val(employee.apellido2);
    $('#telefono1').val(employee.telefono1);
    $('#telefono2').val(employee.telefono2);
    $('#cedula').val(employee.cedula);
    $('#fechContrat').val(employee.fechContrat);
    $('#idUsuario').val(employee.idUsuario);
    $('#idPuesto').val(employee.idPuesto);
}

function clearForm() {
    // Limpiar el formulario
    $('#id').val('');
    $('#nombre').val('');
    $('#apellido1').val('');
    $('#apellido2').val('');
    $('#telefono1').val('');
    $('#telefono2').val('');
    $('#cedula').val('');
    $('#fechContrat').val('');
    $('#idUsuario').val('');
    $('#idPuesto').val('');

    // Desmarcar la fila seleccionada
    $('.selected-row').removeClass('selected-row');
}


function submitForm() {
    // Agrega tu lógica para enviar el formulario si es necesario
    // ...

    // Cierra el formulario después de enviar
    ocultarFormulario();
}



function mostrarFormulario() {
    var fondoNegro = document.getElementById('fondoNegro');
    fondoNegro.style.display = 'flex';
}

function ocultarFormulario() {
    var fondoNegro = document.getElementById('fondoNegro');
    fondoNegro.style.display = 'none';
}

function submitForm() {
    // Agrega tu lógica para enviar el formulario si es necesario
    // ...

    // Cierra el formulario después de enviar
    ocultarFormulario();
}
function cancelarFormulario() {
    ocultarFormulario();
}