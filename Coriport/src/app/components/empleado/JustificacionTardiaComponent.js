function send() {
    let idRegistro = $("#idRegistro").val();

    let justificacionData = {
        "fechaTardia": $("#fechaTardia").val(),
        "justificacion": $("#motivo").val(),
        "archivo": $("#archivo").val(),
        "estado": "Pendiente",
        "descripcion": "Pendiente",
        "encargado": "Pendiente",
    };

    let data = 'data=' + JSON.stringify(justificacionData);
    console.log(justificacionData)

    $.ajax({
        url: "http://localhost:8000/api/justificacionTardia/store",
        type: "POST",
        data: data
    }).done(function (response) {
        console.log(response)
        mostrarMensajeDeInfo("Registrando su justificacion...");

        let registroData = {
            "idJustificacionTardia": response.data.idJustificacionTardia,
        }
        let data = 'data=' + JSON.stringify(registroData);

        $.ajax({
            url: "http://localhost:8000/api/registroTardia/update/" + idRegistro,
            type: "PUT",
            data: data
        }).done(function (response) {
            console.log(response)

            mostrarMensajeDeInfo("Se ha resgitrado exitosamente");
            cargarTabla()
            document.getElementById("justificacionAdd").style.display = "none";

        }).fail(function (xhr, status, error) {
            mostrarMensajeDeError("ERROR!!: " + xhr.responseText);

            $.ajax({
                url: "http://localhost:8000/api/justificacionTardia/delete/" + response.data.idJustificacionTardia,
                type: "DELETE",
            }).done(function (response) {
                console.log(response)

            }).fail(function (xhr, status, error) {
                console.log(error)
                mostrarMensajeDeError("ERROR!!: " + xhr.responseText);
            });

        });


    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseText);
    });

}



function updateJustificacion(justificacionTardia) {
    let updatedJustificacionData = {
        "fechaSolicitud": justificacionTardia.fechaSolicitud,
        "fechaTardia": justificacionTardia.fechaTardia,
        // "archivo": justificacionTardia.archivo,
        "justificacion": justificacionTardia.justificacion,
        "estado": justificacionTardia.estado,
        "encargado": justificacionTardia.encargado,
        "descripcion": justificacionTardia.descripcion,
        "fechaSolicitud": justificacionTardia.fechaSolicitud,
    };

    let data = 'data=' + JSON.stringify(updatedJustificacionData);

    $.ajax({
        url: "http://localhost:8000/api/justificacionTardia/update/" + justificacionTardia.id,
        type: "PUT",
        data: data
    }).done(function (response) {
        mostrarMensajeDeInfo("Se ha actualizado exitosamente");
        cargarTabla()
        document.getElementById("popup").style.display = "none";
    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseText);
    });
}



$("#sendJustificacion").click(send);

