$(document).ready(function () {
    // Cargar tabla al cargar la página
    cargarTabla();

    // Evento para registrar tardía
    $('#btnRegistrarTardia').click(function () {
        registrarTardia();
    });
});

function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/registroTardias",
        type: "GET"
    }).done(function (response) {
        $("#dataTableRT").empty(); // Vaciar la tabla antes de cargar los nuevos datos
        var respObj = response.data;
        for (k in respObj) {
            let justificacion;
            if (respObj[k].idJustificacionTardia) {
                if (respObj[k].justificacion_tardia.estado === "Aceptado") {
                    justificacion = "Justificado";
                } else {
                    justificacion = "Pendiente";
                }
            } else {
                justificacion = "Sin Justificar";
            }
            let cantMinutos = formatMinutos(respObj[k].cantMinutos);

            let filaHTML = `<tr data-employee-id="${respObj[k].empleado.idEmpleado}" data-justificacion="${encodeURIComponent(JSON.stringify(respObj[k].justificacion_tardia))}" data-empleado="${encodeURIComponent(JSON.stringify(respObj[k].empleado))}">
                <td>${respObj[k].idRegistroTardia}</td>
                <td>${respObj[k].fecha}</td>
                <td>${cantMinutos}</td>
                <td id="empleado">${respObj[k].empleado.nombre}</td>
                <td id="justificacion">${justificacion}</td>
            </tr>`;

            let fila = $(filaHTML);
            $("#dataTableRT").append(fila);
        }
    }).fail(function (error) {
        console.log("Error al cargar la tabla:", error);
    });
}

function registrarTardia() {
    $.ajax({
        url: "http://localhost:8000/api/registroTardiasEmpleado/show",
        type: "POST",
    }).done(function (response) {
        alert(response.message);
        cargarTabla(); // Actualizar la tabla después de registrar la tardía
    }).fail(function (error) {
        console.log("Error al registrar tardía:", error);
        alert("Error al registrar tardía");
    });
}

function formatMinutos(hora) {
    // Asegurarse de que la hora sea una cadena
    if (typeof hora !== 'string') return hora;

    // Dividir la cadena de la hora en partes
    let partes = hora.split(':');

    // Si la longitud de partes es al menos 2 (HH y mm están presentes)
    if (partes.length >= 2) {
        return `${partes[0]}:${partes[1]}`;
    }

    // En caso contrario, devolver la hora sin modificar
    return hora;
}
