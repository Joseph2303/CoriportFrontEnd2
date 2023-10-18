document.getElementById('empleadoForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const empleadoId = obtenerEmpleadoId();
  if (empleadoId) {
    const datosEmpleado = {
      nombre: document.getElementById('nombre').value,
      apellido1: document.getElementById('apellido1').value,
      apellido2: document.getElementById('apellido2').value,
      telefono1: document.getElementById('telefono1').value,
      telefono2: document.getElementById('telefono2').value,
      cedula: document.getElementById('cedula').value,
      fechaContrat: document.getElementById('fechaContrat').value,
      idUsuario: 1,
      idPuesto: 1,
    };

    editarEmpleado(empleadoId, datosEmpleado);
  } else {
    const nuevoEmpleado = {
      nombre: document.getElementById('nombre').value,
      apellido1: document.getElementById('apellido1').value,
      apellido2: document.getElementById('apellido2').value,
      telefono1: document.getElementById('telefono1').value,
      telefono2: document.getElementById('telefono2').value,
      cedula: document.getElementById('cedula').value,
      fechaContrat: document.getElementById('fechaContrat').value,
      idUsuario: 1,
      idPuesto: 1,
    };

    crearEmpleado(nuevoEmpleado);
  }
});

document.getElementById('eliminarEmpleadoButton').addEventListener('click', function() {
  const empleadoId = obtenerEmpleadoId();
  if (empleadoId) {
    if (confirm('¿Seguro que deseas eliminar a este empleado?')) {
      eliminarEmpleado(empleadoId);
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
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
  fetch('http://127.0.0.1:8000/api/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(empleado)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Empleado creado', data);
      // Redirigir a donde lo necesites
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function editarEmpleado(IdEmpleado, datosEmpleado) {
  fetch(`http://127.0.0.1:8000/api/employees/${IdEmpleado}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datosEmpleado)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Empleado editado', data);
      // Redirigir a donde lo necesites
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function eliminarEmpleado(empleadoId) {
  fetch(`http://127.0.0.1:8000/api/employees/${empleadoId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.status === 200) {
        console.log('Empleado eliminado correctamente.');
        // Realiza cualquier redirección u otras acciones necesarias después de eliminar al empleado.
      } else {
        console.error('Error al eliminar el empleado.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Le hizo falta un poco a esta funcion 

function mostrarEmpleado(empleadoId) {
  fetch(`http://127.0.0.1:8000/api/employees/${empleadoId}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.error('Error al obtener el empleado.');
      }
    })
    .then(data => {
      if (data) {
        // Mostrar la información del empleado en la página
        console.log('Empleado:', data);
        // Puedes actualizar elementos HTML con los datos del empleado.
        document.getElementById('nombre').textContent = data.nombre;
        document.getElementById('apellido1').textContent = data.apellido1;
        // Continúa con los demás campos y elementos HTML según tus necesidades.
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
