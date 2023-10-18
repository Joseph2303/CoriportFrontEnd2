// Evento para el botón de envío
$("#enviarUsuarioButton").click(function () {
    const usuarioId = obtenerUsuarioId();
    const datosUsuario = {
        name: $("#nombre").val(),
        email: $("#email").val(),
        contrasena: $("#contrasena").val(),
        tipoUsuario: $("#tipoUsuario").val()
    };

    if (usuarioId) {
        editarUsuario(usuarioId, datosUsuario);
    } else {
        crearUsuario(datosUsuario);
    }
});

$("#eliminarUsuarioButton").click(function () {
    const usuarioId = obtenerUsuarioId();
    if (usuarioId && confirm('¿Seguro que deseas eliminar a este usuario?')) {
        eliminarUsuario(usuarioId);
    }
});

$(document).ready(function () {
    const usuarioId = obtenerUsuarioId();
    if (usuarioId) {
        mostrarUsuario(usuarioId);
    }
});

function obtenerUsuarioId() {
    const urlParams = new URLSearchParams(window.location.search);
    const usuarioId = urlParams.get('id');
    return usuarioId;
}

function crearUsuario(usuario) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/usuarios/crear",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(usuario),
        success: function (data) {
            console.log('Usuario creado', data);
            // Realizar la redirección necesaria
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function editarUsuario(IdUsuario, datosUsuario) {
    $.ajax({
        url: `http://127.0.0.1:8000/api/usuarios/${IdUsuario}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(datosUsuario),
        success: function (data) {
            console.log('Usuario editado', data);
            // Realizar la redirección necesaria
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}

function eliminarUsuario(usuarioId) {
    $.ajax({
        url: `http://127.0.0.1:8000/api/usuarios/${usuarioId}`,
        type: "DELETE",
        success: function () {
            console.log('Usuario eliminado correctamente.');
            // Realizar cualquier redirección u otras acciones necesarias después de eliminar al usuario.
        },
        error: function (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    });
}

function mostrarUsuario(usuarioId) {
    $.ajax({
        url: `http://127.0.0.1:8000/api/usuarios/${usuarioId}`,
        success: function (data) {
            console.log('Usuario:', data);
            $("#nombre").val(data.name);
            $("#email").val(data.email);
            $("#contrasena").val(data.contrasena);
            $("#tipoUsuario").val(data.tipoUsuario);
        },
        error: function (error) {
            console.error('Error al obtener el usuario', error);
        }
    });
}
