function send() {
    let idRegistro = $("#idRegistro").val();

    let justificacionData = {
        "fechaAusencia": $("#fechaAusencia").val(),
        "justificacion": $("#motivo").val(),
        "archivo": $("#archivo").val(),
        "estado": "Pendiente",
        "descripcion": "Pendiente",
        "encargado": "Pendiente",
    };

    let data = 'data=' + JSON.stringify(justificacionData);
    console.log(justificacionData)

    $.ajax({
        url: "http://localhost:8000/api/justificacionAusencia/store",
        type: "POST",
        data: data
    }).done(function (response) {
        console.log(response)
        mostrarMensajeDeInfo("Registrando su justificacion...");

        let registroData = {
            "idJustificacionAusencia": response.data.idJustificacionAusencia,
        }
        let data = 'data=' + JSON.stringify(registroData);

        $.ajax({
            url: "http://localhost:8000/api/registroAusencia/update/" + idRegistro,
            type: "PUT",
            data: data
        }).done(function (response) {
            console.log(response)

            mostrarMensajeDeInfo("¡INFO!: " + response.message);
            cargarTabla()
            document.getElementById("justificacionAdd").style.display = "none";

        }).fail(function (xhr, status, error) {
            mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);

            $.ajax({
                url: "http://localhost:8000/api/justificacionAusencia/delete/" + response.data.idJustificacionAusencia,
                type: "DELETE",
            }).done(function (response) {
                console.log(response)
        
            }).fail(function (xhr, status, error) {
                console.log(error)
                mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
            });

        });


    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
    });

}


function updateJustificacion(justificacionAusencias) {
    let updatedJustificacionData = {
        "fechaSolicitud": justificacionAusencias.fechaSolicitud,
        "fechaAusencia": justificacionAusencias.fechaAusencia,
        "archivo": justificacionAusencias.archivos,
        "justificacion": justificacionAusencias.justificacion,
        "estado": justificacionAusencias.estado,
        "descripcion": justificacionAusencias.descripcion,
        "encargado": justificacionAusencias.encargado,
    };

    let data = 'data=' + JSON.stringify(updatedJustificacionData);

    $.ajax({
        url: "http://localhost:8000/api/justificacionAusencia/update/" + justificacionAusencias.id,
        type: "PUT",
        data: data
    }).done(function (response) {
        mostrarMensajeDeInfo("¡INFO!: " + response.message);
        cargarTabla()
        document.getElementById("popup").style.display = "none";
    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
    });
}


$("#sendJustificacion").click(send);
