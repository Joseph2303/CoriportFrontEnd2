// JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const puestosTableBody = document.getElementById('puestos-table-body');
    const crearPuestoForm = document.getElementById('crear-puesto-form');
    const editarPuestoForm = document.getElementById('editar-puesto-form');

    // Función para cargar la lista de puestos al cargar la página
    function cargarPuestos() {
        fetch('/puestos')
            .then(response => response.json())
            .then(data => {
                puestosTableBody.innerHTML = '';
                data.forEach(puesto => {
                    puestosTableBody.innerHTML += `
                        <tr>
                            <td>${puesto.id}</td>
                            <td>${puesto.nombre}</td>
                            <td>
                                <button class="editar-btn" data-id="${puesto.id}" data-nombre="${puesto.nombre}">Editar</button>
                                <button class="eliminar-btn" data-id="${puesto.id}">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });
            })
            .catch(error => console.error('Error al cargar puestos:', error));
    }

    // Función para manejar la creación de un nuevo puesto
    crearPuestoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;

        fetch('/puesto/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Nuevo puesto creado:', data);
            cargarPuestos();
            crearPuestoForm.reset();
        })
        .catch(error => console.error('Error al crear nuevo puesto:', error));
    });

    // Función para manejar la edición de un puesto
    editarPuestoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const id = document.getElementById('puesto-id').value;
        const nombre = document.getElementById('nombre-edit').value;

        fetch(`/puesto/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Puesto actualizado:', data);
            cargarPuestos();
            editarPuestoForm.reset();
            editarPuestoForm.style.display = 'none';
        })
        .catch(error => console.error('Error al actualizar puesto:', error));
    });

    // Función para manejar la eliminación de un puesto
    puestosTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('eliminar-btn')) {
            const id = event.target.dataset.id;

            fetch(`/puesto/delete/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                console.log('Puesto eliminado:', data);
                cargarPuestos();
            })
            .catch(error => console.error('Error al eliminar puesto:', error));
        } else if (event.target.classList.contains('editar-btn')) {
            const id = event.target.dataset.id;
            const nombre = event.target.dataset.nombre;

            document.getElementById('puesto-id').value = id;
            document.getElementById('nombre-edit').value = nombre;
            editarPuestoForm.style.display = 'block';
        }
    });

    // Cancelar la edición de un puesto
    document.getElementById('cancelar-edicion').addEventListener('click', function() {
        editarPuestoForm.style.display = 'none';
    });

    // Cargar la lista de puestos al cargar la página
    cargarPuestos();
});
