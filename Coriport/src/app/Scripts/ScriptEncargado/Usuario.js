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