 /*____________Funciones de Empleado_________________*/
 const botonAgregarEmpleado = document.getElementById('agregar-Empleado');
 botonAgregarEmpleado.addEventListener('click', function () {
        const pantallaEmergenteEmpleado = document.createElement('div');
        pantallaEmergenteEmpleado.style.position = 'fixed';
        pantallaEmergenteEmpleado.style.top = 0;
        pantallaEmergenteEmpleado.style.left = 0;
        pantallaEmergenteEmpleado.style.width = '100%';
        pantallaEmergenteEmpleado.style.height = '100%';
        pantallaEmergenteEmpleado.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        pantallaEmergenteEmpleado.style.display = 'flex';
        pantallaEmergenteEmpleado.style.justifyContent = 'center';
        pantallaEmergenteEmpleado.style.alignItems = 'center';
        const formulario = document.createElement('form');

        const labelNombre = document.createElement('label');
        labelNombre.for = 'nombre';
        labelNombre.textContent = 'Nombre:';

        const inputNombre = document.createElement('input');
        inputNombre.type = 'text';
        inputNombre.id = 'nombre';
        inputNombre.name = 'data[nombre]';
        inputNombre.required = true;
        inputNombre.style.border = '1px solid #007bff';

        const labelApellido1 = document.createElement('label');
        labelApellido1.for = 'apellido1';
        labelApellido1.textContent = 'Apellido 1:';

        const inputApellido1 = document.createElement('input');
        inputApellido1.type = 'text';
        inputApellido1.id = 'apellido1';
        inputApellido1.name = 'data[apellido1]';
        inputApellido1.required = true;
        inputApellido1.style.border = '1px solid #007bff';

        const labelApellido2 = document.createElement('label');
        labelApellido2.for = 'apellido2';
        labelApellido2.textContent = 'Apellido 2:';

        const inputApellido2 = document.createElement('input');
        inputApellido2.type = 'text';
        inputApellido2.id = 'apellido2';
        inputApellido2.name = 'data[apellido2]';
        inputApellido2.required = true;
        inputApellido2.style.border = '1px solid #007bff';

        const labelTelefono1 = document.createElement('label');
        labelTelefono1.for = 'telefono1';
        labelTelefono1.textContent = 'Teléfono 1:';

        const inputTelefono1 = document.createElement('input');
        inputTelefono1.type = 'text';
        inputTelefono1.id = 'telefono1';
        inputTelefono1.name = 'data[telefono1]';
        inputTelefono1.required = true;
        inputTelefono1.style.border = '1px solid #007bff';

        const labelTelefono2 = document.createElement('label');
        labelTelefono2.for = 'telefono2';
        labelTelefono2.textContent = 'Teléfono 2:';

        const inputTelefono2 = document.createElement('input');
        inputTelefono2.type = 'text';
        inputTelefono2.id = 'telefono2';
        inputTelefono2.name = 'data[telefono2]';
        inputTelefono2.required = true;
        inputTelefono2.style.border = '1px solid #007bff';

        const labelCedula = document.createElement('label');
        labelCedula.for = 'cedula';
        labelCedula.textContent = 'Cédula:';

        const inputCedula = document.createElement('input');
        inputCedula.type = 'text';
        inputCedula.id = 'cedula';
        inputCedula.name = 'data[cedula]';
        inputCedula.required = true;
        inputCedula.style.border = '1px solid #007bff';

        const labelFechaContratacion = document.createElement('label');
        labelFechaContratacion.for = 'fechaContratacion';
        labelFechaContratacion.textContent = 'Fecha Contratación:';

        const inputFechaContratacion = document.createElement('input');
        inputFechaContratacion.type = 'date';
        inputFechaContratacion.id = 'fechaContratacion';
        inputFechaContratacion.name = 'data[fechaContratacion]';
        inputFechaContratacion.required = true;
        inputFechaContratacion.style.border = '1px solid #007bff';

        const labelIdUsuario = document.createElement('label');
        labelIdUsuario.for = 'idUsuario';
        labelIdUsuario.textContent = 'ID Usuario:';

        const inputIdUsuario = document.createElement('input');
        inputIdUsuario.type = 'text';
        inputIdUsuario.id = 'idUsuario';
        inputIdUsuario.name = 'data[idUsuario]';
        inputIdUsuario.required = true;
        inputIdUsuario.style.border = '1px solid #007bff';

        const labelIdPuesto = document.createElement('label');
        labelIdPuesto.for = 'idPuesto';
        labelIdPuesto.textContent = 'ID Puesto:';

        const inputIdPuesto = document.createElement('input');
        inputIdPuesto.type = 'text';
        inputIdPuesto.id = 'idPuesto';
        inputIdPuesto.name = 'data[idPuesto]';
        inputIdPuesto.required = true;
        inputIdPuesto.style.border = '1px solid #007bff';

        const botonAgregarEmpleado = document.createElement('button');
        botonAgregarEmpleado.addEventListener('click', agregarEmpleado);
        botonAgregarEmpleado.type = 'submit';
        botonAgregarEmpleado.textContent = 'Agregar Empleado';
        botonAgregarEmpleado.id = 'agregarEmpleado';
        botonAgregarEmpleado.style.marginTop = '10px';
        botonAgregarEmpleado.style.marginLeft = '20px';
        botonAgregarEmpleado.style.marginRight = '20px';
        botonAgregarEmpleado.style.backgroundColor = '#007bff';
        botonAgregarEmpleado.style.color = 'white';
        botonAgregarEmpleado.style.padding = '10px 20px';
        botonAgregarEmpleado.style.borderRadius = '5px';
        botonAgregarEmpleado.style.border = 'none';
        botonAgregarEmpleado.style.cursor = 'pointer';

        formulario.appendChild(labelNombre);
        formulario.appendChild(inputNombre);
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(labelApellido1);
        formulario.appendChild(inputApellido1);
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(labelApellido2);
        formulario.appendChild(inputApellido2);
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(labelTelefono1);
        formulario.appendChild(inputTelefono1);
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(labelTelefono2);
        formulario.appendChild(inputTelefono2);
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(labelCedula);
        formulario.appendChild(inputCedula);
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(labelFechaContratacion);
        formulario.appendChild(inputFechaContratacion);
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(labelIdUsuario);
        formulario.appendChild(inputIdUsuario);
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(labelIdPuesto);
        formulario.appendChild(inputIdPuesto);
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(document.createElement('br'));
        formulario.appendChild(botonAgregarEmpleado);
        document.body.appendChild(pantallaEmergente);
    });

    const campoBusqueda = document.getElementById('busquedaEmpleado');

    campoBusqueda.addEventListener('input', function () {
        const valorBusqueda = campoBusqueda.value.toLowerCase();
        const filas = document.querySelectorAll('#dataTableEmpleado tr');

        filas.forEach(function (fila) {
            const contenidoFila = fila.innerText.toLowerCase();

            if (contenidoFila.includes(valorBusqueda)) {
                fila.style.display = '';
            } else {
                fila.style.display = 'none';
            }
        });
    });

    const tablaEmpleados = document.getElementById('tabla-Empleado');
    const botonEliminarSeleccionados = document.getElementById('eliminar-seleccionadosEmpleado');
    const botonActualizarSeleccionados = document.getElementById('actualizar-seleccionadosEmpleado');

    function actualizarTabla() {
        const dataTableEmpleado = document.getElementById('dataTableEmpleado');
        dataTableEmpleado.innerHTML = ''; // Limpiar contenido actual

        // Supongamos que tienes un array llamado `empleados` con la información de los empleados
        const empleados = [
            // ... (cada objeto representa un empleado con sus propiedades)
        ];

        empleados.forEach(empleado => {
            const fila = document.createElement('tr');
            fila.dataset.empleadoId = empleado.id; // Asignar el ID del empleado como atributo personalizado

            const celdas = [
                empleado.nombre,
                empleado.apellido1,
                empleado.apellido2,
                empleado.telefono1,
                empleado.telefono2,
                empleado.cedula,
                empleado.fechaContratacion,
                empleado.idUsuario,
                empleado.idPuesto,
                `<input type="checkbox">`
            ];

            celdas.forEach(dato => {
                const celda = document.createElement('td');
                celda.textContent = dato;
                fila.appendChild(celda);
            });

            dataTableEmpleado.appendChild(fila);
        });
    }

    function actualizarBotonesEmpleado() {
        const checkboxesSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
        if (checkboxesSeleccionados.length > 0) {
            botonEliminarSeleccionados.style.display = 'inline-block';
            botonActualizarSeleccionados.style.display = 'inline-block';
        } else {
            botonEliminarSeleccionados.style.display = 'none';
            botonActualizarSeleccionados.style.display = 'none';
        }
    }

    function confirmarBorradoEmpleado() {
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

        const botonAceptarEmpleado = document.createElement('button');
        botonAceptarEmpleado.textContent = 'Aceptar';
        botonAceptarEmpleado.style.backgroundColor = '#007bff';
        botonAceptarEmpleado.style.color = 'white';
        botonAceptarEmpleado.style.padding = '10px 20px';
        botonAceptarEmpleado.style.borderRadius = '5px';
        botonAceptarEmpleado.style.border = 'none';
        botonAceptarEmpleado.style.cursor = 'pointer';
        botonAceptarEmpleado.style.marginRight = '10px';

        const botonCancelarEmpleado = document.createElement('button');
        botonCancelarEmpleado.textContent = 'Cancelar';
        botonCancelarEmpleado.style.backgroundColor = '#007bff';
        botonCancelarEmpleado.style.color = 'white';
        botonCancelarEmpleado.style.padding = '10px 20px';
        botonCancelarEmpleado.style.borderRadius = '5px';
        botonCancelarEmpleado.style.border = 'none';
        botonCancelarEmpleado.style.cursor = 'pointer';

        botonAceptarEmpleado.addEventListener('click', function () {
            pantallaEmergente.remove();
            const checkboxesSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
            checkboxesSeleccionados.forEach(function (checkbox) {
                const fila = checkbox.closest('tr');
                const userId = fila.getAttribute('data-empleado-id');
                // Llama a la función para borrar el empleado con el ID userId
                // destroy(userId);
                fila.remove();
            });
            actualizarBotones();
        });

        botonCancelarEmpleado.addEventListener('click', function () {
            pantallaEmergente.remove();
        });

        mensaje.appendChild(texto);
        mensaje.appendChild(botonAceptarEmpleado);
        mensaje.appendChild(botonCancelarEmpleado);

        pantallaEmergente.appendChild(mensaje);
        document.body.appendChild(pantallaEmergente);
    }

    tablaEmpleados.addEventListener('change', function (event) {
        if (event.target.type === 'checkbox') {
            actualizarBotones();
        }
    });

    botonEliminarSeleccionadosEmpleado.addEventListener('click', function () {
        const checkboxesSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
        if (checkboxesSeleccionados.length > 0) {
            confirmarBorrado();
        }
    });

    botonActualizarSeleccionadosEmpleado.addEventListener('click', function () {
        const checkboxesSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
        checkboxesSeleccionados.forEach(function (checkbox) {
            const fila = checkbox.closest('tr');
            const empleadoId = fila.getAttribute('data-empleado-id');
            const empleadoNombre = fila.cells[0].textContent;
            const empleadoApellido1 = fila.cells[1].textContent;
            // ... (Continuar obteniendo datos del empleado)

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

            // ... (Resto del código para crear el formulario de actualización)

            document.body.appendChild(pantallaEmergente);
        });

        actualizarBotones();
    });
    
    actualizarTabla();
