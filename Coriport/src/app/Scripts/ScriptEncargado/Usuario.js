
// Función para mostrar/ocultar botones de acción
function actualizarBotones() {
    var checkboxes = document.querySelectorAll("#tabla-usuarios input[type=checkbox]");
    var actualizarBtn = document.getElementById("actualizar-seleccionados");
    var eliminarBtn = document.getElementById("eliminar-seleccionados");

    var alMenosUnoSeleccionado = false;

    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            alMenosUnoSeleccionado = true;
        }
    });

    if (alMenosUnoSeleccionado) {
        actualizarBtn.style.display = "block";
        eliminarBtn.style.display = "block";
    } else {
        actualizarBtn.style.display = "none";
        eliminarBtn.style.display = "none";
    }

    
}

// Event listener para checkboxes
var checkboxes = document.querySelectorAll("#tabla-usuarios input[type=checkbox]");
checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", actualizarBotones);
});

// Event listener para botón de eliminar
document.getElementById("eliminar-seleccionados").addEventListener("click", function() {
    var checkboxes = document.querySelectorAll("#tabla-usuarios input[type=checkbox]");
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkbox.parentNode.parentNode.remove();
        }
    });
    actualizarBotones();
});

// Event listener para botón de actualizar (puedes agregar tu lógica aquí)
document.getElementById("actualizar-seleccionados").addEventListener("click", function() {
    // Tu lógica de actualización aquí
});



function actualizarDatos(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName("td");

    document.getElementById("name").value = cells[4].textContent;
    document.getElementById("first_lastname").value = cells[5].textContent;
    document.getElementById("second_lastname").value = cells[6].textContent;
    document.getElementById("first_phone").value = cells[7].textContent;
    document.getElementById("second_phone").value = cells[8].textContent;
    document.getElementById("cedula").value = cells[9].textContent;
    document.getElementById("email").value = cells[1].textContent;
    document.getElementById("password").value = cells[2].textContent;
    document.getElementById("user_type").value = cells[3].textContent;
    document.getElementById("user_id").value = cells[11].textContent;
    document.getElementById("hire_date").value = cells[10].textContent;

    var positionSelect = document.getElementById("position");
    var positionValue = cells[12].textContent;
    for (var i = 0; i < positionSelect.options.length; i++) {
        if (positionSelect.options[i].text === positionValue) {
            positionSelect.selectedIndex = i;
            break;
        }
    }

    document.getElementById("formulario-emergente").style.display = "block";
}


function limpiarFormulario() {
    document.getElementById("name").value = "";
    document.getElementById("first_lastname").value = "";
    document.getElementById("second_lastname").value = "";
    document.getElementById("first_phone").value = "";
    document.getElementById("second_phone").value = "";
    document.getElementById("cedula").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("user_type").value = "";
    document.getElementById("user_id").value = "";
    document.getElementById("hire_date").value = "";
    document.getElementById("position").selectedIndex = 0;
}
