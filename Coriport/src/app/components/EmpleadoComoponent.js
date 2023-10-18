$("#enviarEmpleadoButton").click(function () {
  const empleadoId = obtenerEmpleadoId();
  const datosEmpleado = {
      nombre: $("#nombre").val(),
      apellido1: $("#apellido1").val(),
      apellido2: $("#apellido2").val(),
      telefono1: $("#telefono1").val(),
      telefono2: $("#telefono2").val(),
      cedula: $("#cedula").val(),
      fechaContrat: $("#fechaContrat").val(),
      idUsuario: 1,
      idPuesto: 1,
  };

  if (empleadoId) {
      editarEmpleado(empleadoId, datosEmpleado);
  } else {
      crearEmpleado(datosEmpleado);
  }
});

$("#eliminarEmpleadoButton").click(function () {
  const empleadoId = obtenerEmpleadoId();
  if (empleadoId && confirm('¿Seguro que deseas eliminar a este empleado?')) {
      eliminarEmpleado(empleadoId);
  }
});

$(document).ready(function () {
  const empleadoId = obtenerEmpleadoId();
  if (empleadoId) {
      mostrarEmpleado(empleadoId);
  }
});

function obtenerEmpleadoId() {
  const urlParams = new URLSearchParams(window.location.search);
  const empleadoId = urlParams.get('id');
  return empleadoId;
}

function crearEmpleado(empleado) {
  $.ajax({
      url: "http://127.0.0.1:8000/api/empleado/crear",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(empleado),
      success: function (data) {
          console.log('Empleado creado', data);
          // Realizar la redirección necesaria
      },
      error: function (error) {
          console.error('Error:', error);
      }
  });
}

function editarEmpleado(IdEmpleado, datosEmpleado) {
  $.ajax({
      url: `http://127.0.0.1:8000/api/empleado/${IdEmpleado}`,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(datosEmpleado),
      success: function (data) {
          console.log('Empleado editado', data);
          // Realizar la redirección necesaria
      },
      error: function (error) {
          console.error('Error:', error);
      }
  });
}

function eliminarEmpleado(empleadoId) {
  $.ajax({
      url: `http://127.0.0.1:8000/api/empleado/${empleadoId}`,
      type: "DELETE",
      success: function () {
          console.log('Empleado eliminado correctamente.');
          // Realizar cualquier redirección u otras acciones necesarias después de eliminar al empleado.
      },
      error: function (error) {
          console.error('Error al eliminar el empleado:', error);
      }
  });
}

function mostrarEmpleado(empleadoId) {
  $.ajax({
      url: `http://127.0.0.1:8000/api/empleado/${empleadoId}`,
      success: function (data) {
          console.log('Empleado:', data);
          $("#nombre").val(data.nombre);
          $("#apellido1").val(data.apellido1);
          $("#apellido2").val(data.apellido2);
          $("#telefono1").val(data.telefono1);
          $("#telefono2").val(data.telefono2);
          $("#cedula").val(data.cedula);
          $("#fechContrat").val(data.fechContrat);
      },
      error: function (error) {
          console.error('Error al obtener el empleado', error);
      }
  });
}
