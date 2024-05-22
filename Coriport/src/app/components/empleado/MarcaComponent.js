function send() {
    let cedula = $("#cedula").val();


    $.ajax({
        url: "http://localhost:8000/api/empleado/show/" + cedula,
        type: "GET",
    }).done(function (response) {
        console.log(response)
        mostrarMensajeDeInfo("Resgitrando su marca...");
        let idEmpleado = response.data.idEmpleado;
        $.ajax({
            url: "http://localhost:8000/api/horario/store",
            type: "POST",
        }).done(function (response) {
            console.log(response)

            let marcaData = {
                "idEmpleado": idEmpleado,
                "tipo": "Entrada",
                "idHorario": response.data.idHorario
            }
            let data = 'data=' + JSON.stringify(marcaData);

            $.ajax({
                url: "http://localhost:8000/api/marca/store",
                type: "POST",
                data: data
            }).done(function (response) {
                console.log(response)
                mostrarMensajeDeInfo("Marca registrada con exito");

            }).fail(function (xhr, status, error) {
                console.log(xhr)
                mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
            });

        }).fail(function (xhr, status, error) {
            mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
        });


    }).fail(function (xhr, status, error) {
        mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
    });

}

function update() {
    let cedula = $("#cedula").val();

    $.ajax({
        url: "http://localhost:8000/api/empleado/show/" + cedula,
        type: "GET",
    }).done(function (response) {
        mostrarMensajeDeInfo("Registrando su marca...");

        if (response && response.data) {
            let idEmpleado = response.data.idEmpleado;
            let marcas = response.data.marcas;

            let currentDate = new Date();


            let costaRicaDate = new Date(currentDate.getTime() - (6 * 60 * 60 * 1000));


            let formattedDate = costaRicaDate.toISOString().split('T')[0];


            if (marcas && marcas.length > 0) {
                let entradaMarca = null;

                for (let i = 0; i < marcas.length; i++) {
                    if (marcas[i].tipo === "entrada" && marcas[i].fecha === formattedDate) {
                        entradaMarca = marcas[i];
                        break;
                    }
                }


                if (entradaMarca) {
                    let idHorario = entradaMarca.horario.idHorario;

                    $.ajax({
                        url: "http://localhost:8000/api/horario/update/" + idHorario,
                        type: "PUT",
                    }).done(function (response) {
                        console.log(response)

                        let marcaData = {
                            "idEmpleado": idEmpleado,
                            "tipo": "Salida",
                            "idHorario": idHorario
                        }
                        let data = 'data=' + JSON.stringify(marcaData);

                        $.ajax({
                            url: "http://localhost:8000/api/marca/store",
                            type: "POST",
                            data: data
                        }).done(function (response) {
                            console.log(response)
                            mostrarMensajeDeInfo("Marca registrada con exito");

                        }).fail(function (xhr, status, error) {
                            console.log(error)
                            mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
                        });

                    }).fail(function (xhr, status, error) {
                        console.log(xhr)
                        console.log(error)

                        mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
                    });

                }
            }
        }

    }).fail(function (xhr, status, error) {
        console.log("Empleado show error:", xhr);
        mostrarMensajeDeError("ERROR!!: Error en la validación de datos ");
    });
}