
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