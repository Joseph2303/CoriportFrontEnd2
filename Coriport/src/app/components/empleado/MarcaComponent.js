function send() {
    let cedula = $("#cedula").val();

    $.ajax({
        url: "http://localhost:8000/api/horario/showByDate",
        type: "GET",
    }).done(function (response) {
        console.log(response);

        if (response.status === 200) {
            let horarioEncontrado = response.data.find(horario => {
                return horario.marcas.some(marca => marca.empleado.cedula === cedula);
            });

            if (horarioEncontrado) {
                mostrarMensajeDeError("Error: Ya se ha registrado la marca de entrada para hoy.");
            } else {
                $.ajax({
                    url: "http://localhost:8000/api/empleado/show/" + cedula,
                    type: "GET",
                }).done(function (response) {
                    console.log(response);
                    let idEmpleado = response.data.idEmpleado;

                    $.ajax({
                        url: "http://localhost:8000/api/horario/store",
                        type: "POST",
                    }).done(function (response) {
                        console.log(response);

                        let marcaData = {
                            "idEmpleado": idEmpleado,
                            "tipo": "Entrada",
                            "idHorario": response.data.idHorario
                        };
                        let data = 'data=' + JSON.stringify(marcaData);

                        $.ajax({
                            url: "http://localhost:8000/api/marca/store",
                            type: "POST",
                            data: data
                        }).done(function (response) {
                            console.log(response);
                            mostrarMensajeDeInfo("Marca registrada con éxito");

                        }).fail(function (xhr) {
                            console.log(xhr);
                            mostrarMensajeDeError("ERROR: " + xhr.responseJSON.message);
                        });

                    }).fail(function (xhr) {
                        console.log(xhr);
                        mostrarMensajeDeError("ERROR: " + xhr.responseJSON.message);
                    });

                }).fail(function (xhr) {
                    console.log(xhr);
                    mostrarMensajeDeError("ERROR: " + xhr.responseJSON.message);
                });
            }
        } else {
            mostrarMensajeDeError("Error: " + response.message);
        }

    }).fail(function (xhr) {
        $.ajax({
            url: "http://localhost:8000/api/empleado/show/" + cedula,
            type: "GET",
        }).done(function (response) {
            console.log(response);
            let idEmpleado = response.data.idEmpleado;

            $.ajax({
                url: "http://localhost:8000/api/horario/store",
                type: "POST",
            }).done(function (response) {
                console.log(response);

                let marcaData = {
                    "idEmpleado": idEmpleado,
                    "tipo": "Entrada",
                    "idHorario": response.data.idHorario
                };
                let data = 'data=' + JSON.stringify(marcaData);

                $.ajax({
                    url: "http://localhost:8000/api/marca/store",
                    type: "POST",
                    data: data
                }).done(function (response) {
                    console.log(response);
                    mostrarMensajeDeInfo("Marca registrada con éxito");

                }).fail(function (xhr) {
                    console.log(xhr);
                    mostrarMensajeDeError("ERROR: " + xhr.responseJSON.message);
                });

            }).fail(function (xhr) {
                console.log(xhr);
                mostrarMensajeDeError("ERROR: " + xhr.responseJSON.message);
            });

        }).fail(function (xhr) {
            console.log(xhr);
            mostrarMensajeDeError("ERROR: " + xhr.responseJSON.message);
        });
    });
}


function update() {
    let cedula = $("#cedula").val();

    $.ajax({
        url: "http://localhost:8000/api/marca/showByDate",
        type: "GET",
    }).done(function (response) {
        // Verifica si ya se ha registrado la marca de salida para hoy
        if (response.data.some(marca => marca.empleado.cedula === cedula && marca.tipo === "Salida")) {
            mostrarMensajeDeError("ERROR: Ya se ha registrado su salida.");
        } else {
            $.ajax({
                url: "http://localhost:8000/api/empleado/show/" + cedula,
                type: "GET",
            }).done(function (response) {
                if (response && response.data) {
                    let idEmpleado = response.data.idEmpleado;
                    let marcas = response.data.marcas;

                    let currentDate = new Date();
                    let costaRicaDate = new Date(currentDate.getTime() - (6 * 60 * 60 * 1000));
                    let formattedDate = costaRicaDate.toISOString().split('T')[0];

                    if (marcas && marcas.length > 0) {
                        let entradaMarca = marcas.find(marca => marca.tipo === "Entrada" && marca.fecha === formattedDate);

                        if (entradaMarca) {
                            let idHorario = entradaMarca.horario.idHorario;

                            $.ajax({
                                url: "http://localhost:8000/api/horario/update/" + idHorario,
                                type: "PUT",
                            }).done(function (response) {
                                let marcaData = {
                                    "idEmpleado": idEmpleado,
                                    "tipo": "Salida",
                                    "idHorario": idHorario
                                };
                                let data = 'data=' + JSON.stringify(marcaData);

                                $.ajax({
                                    url: "http://localhost:8000/api/marca/store",
                                    type: "POST",
                                    data: data
                                }).done(function (response) {
                                    mostrarMensajeDeInfo("Marca registrada con éxito");
                                }).fail(function (xhr) {
                                    mostrarMensajeDeError("ERROR: " + xhr.responseJSON.message);
                                });
                            }).fail(function (xhr) {
                                mostrarMensajeDeError("ERROR: " + xhr.responseJSON.message);
                            });
                        } else {
                            mostrarMensajeDeError("ERROR: Primero debe registrar la entrada.");
                        }
                    }
                }
            }).fail(function (xhr) {
                mostrarMensajeDeError("ERROR: Error en la validación de datos del empleado.");
            });
        }
    }).fail(function (xhr) {
        $.ajax({
            url: "http://localhost:8000/api/empleado/show/" + cedula,
            type: "GET",
        }).done(function (response) {
            if (response && response.data) {
                let idEmpleado = response.data.idEmpleado;
                let marcas = response.data.marcas;

                let currentDate = new Date();
                let costaRicaDate = new Date(currentDate.getTime() - (6 * 60 * 60 * 1000));
                let formattedDate = costaRicaDate.toISOString().split('T')[0];

                if (marcas && marcas.length > 0) {
                    let entradaMarca = marcas.find(marca => marca.tipo === "Entrada" && marca.fecha === formattedDate);

                    if (entradaMarca) {
                        let idHorario = entradaMarca.horario.idHorario;

                        $.ajax({
                            url: "http://localhost:8000/api/horario/update/" + idHorario,
                            type: "PUT",
                        }).done(function (response) {
                            let marcaData = {
                                "idEmpleado": idEmpleado,
                                "tipo": "Salida",
                                "idHorario": idHorario
                            };
                            let data = 'data=' + JSON.stringify(marcaData);

                            $.ajax({
                                url: "http://localhost:8000/api/marca/store",
                                type: "POST",
                                data: data
                            }).done(function (response) {
                                mostrarMensajeDeInfo("Marca registrada con éxito");
                            }).fail(function (xhr) {
                                mostrarMensajeDeError("ERROR: " + xhr.responseJSON.message);
                            });
                        }).fail(function (xhr) {
                            mostrarMensajeDeError("ERROR: " + xhr.responseJSON.message);
                        });
                    } else {
                        mostrarMensajeDeError("ERROR: Primero debe registrar la entrada.");
                    }
                }
            }
        }).fail(function (xhr) {
            mostrarMensajeDeError("ERROR: Error en la validación de datos del empleado.");
        });
    });
}



function send2(idEmpleado) {
    $.ajax({
        url: "http://localhost:8000/api/horario/showByDate",
        type: "GET",
    }).done(function (response) {
        console.log(response);

        if (response.status === 200) {
            let marcaExistente = false;

            response.data.forEach(horario => {
                horario.marcas.forEach(marca => {
                    if (parseInt(marca.empleado.idEmpleado) === parseInt(idEmpleado) && marca.tipo === "Entrada") {
                        marcaExistente = true;
                    }
                });
            });

            if (marcaExistente) {
                mostrarMensajeDeError("Error: Ya se ha registrado la marca de entrada para hoy.");
            } else {
                registrarMarcaEntrada(idEmpleado);
            }
        } else {
            mostrarMensajeDeError("Error: " + response.message);
        }
    }).fail(function (xhr) {
        registrarMarcaEntrada(idEmpleado);
        console.log(xhr);
        //mostrarMensajeDeError("Error al verificar el horario: " + xhr.responseJSON.message);
    });
}

function registrarMarcaEntrada(idEmpleado) {
    $.ajax({
        url: "http://localhost:8000/api/empleado/getEmpleado/" + idEmpleado,
        type: "GET",
    }).done(function (response) {
        console.log(response);

        $.ajax({
            url: "http://localhost:8000/api/horario/store",
            type: "POST",
        }).done(function (response) {
            console.log(response);

            let marcaData = {
                "idEmpleado": idEmpleado,
                "tipo": "Entrada",
                "idHorario": response.data.idHorario
            };
            let data = 'data=' + JSON.stringify(marcaData);

            $.ajax({
                url: "http://localhost:8000/api/marca/store",
                type: "POST",
                data: data
            }).done(function (response) {
                console.log(response);
                mostrarMensajeDeInfo("Marca registrada con éxito");

            }).fail(function (xhr) {
                console.log(xhr);
                mostrarMensajeDeError("ERROR: " + xhr.responseJSON.message);
            });

        }).fail(function (xhr) {
            console.log(xhr);
            mostrarMensajeDeError("ERROR: " + xhr.responseJSON.message);
        });

    }).fail(function (xhr) {
        console.log(xhr);
        mostrarMensajeDeError("ERROR: " + xhr.responseJSON.message);
    });
}


function update2(idEmpleado) {
    $.ajax({
        url: "http://localhost:8000/api/marca/showByDate",
        type: "GET",
    }).done(function (response) {
        let salidaRegistrada = false;

        if (response.status === 200) {
            response.data.forEach(marca => {
                if (parseInt(marca.empleado.idEmpleado) === parseInt(idEmpleado) && marca.tipo === "Salida") {
                    salidaRegistrada = true;
                }
            });

            if (salidaRegistrada) {
                mostrarMensajeDeError("ERROR!!: ya se registro su salida");
            } else {
                verificarEntradaYRegistrarSalida(idEmpleado);
            }
        } else {
            mostrarMensajeDeError("Error: " + response.message);
        }
    }).fail(function (xhr) {
        console.log(xhr);
        verificarEntradaYRegistrarSalida()
        //mostrarMensajeDeError("Error al verificar las marcas: " + xhr.responseJSON.message);
    });
}

function verificarEntradaYRegistrarSalida(idEmpleado) {
    $.ajax({
        url: "http://localhost:8000/api/empleado/getEmpleado/" + idEmpleado,
        type: "GET",
    }).done(function (response) {
        if (response && response.data) {
            let marcas = response.data.marcas;
            let currentDate = new Date();
            let costaRicaDate = new Date(currentDate.getTime() - (6 * 60 * 60 * 1000));
            let formattedDate = costaRicaDate.toISOString().split('T')[0];

            if (marcas && marcas.length > 0) {
                let entradaMarca = null;

                for (let i = 0; i < marcas.length; i++) {
                    if (marcas[i].tipo === "Entrada" && marcas[i].fecha === formattedDate) {
                        entradaMarca = marcas[i];
                        break;
                    }
                }

                if (entradaMarca) {
                    let idHorario = entradaMarca.idHorario;

                    $.ajax({
                        url: "http://localhost:8000/api/horario/update/" + idHorario,
                        type: "PUT",
                    }).done(function (response) {
                        console.log(response);

                        let marcaData = {
                            "idEmpleado": idEmpleado,
                            "tipo": "Salida",
                            "idHorario": idHorario
                        };
                        let data = 'data=' + JSON.stringify(marcaData);

                        $.ajax({
                            url: "http://localhost:8000/api/marca/store",
                            type: "POST",
                            data: data
                        }).done(function (response) {
                            console.log(response);
                            mostrarMensajeDeInfo("Marca registrada con éxito");
                        }).fail(function (xhr) {
                            console.log(xhr);
                            mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
                        });

                    }).fail(function (xhr) {
                        console.log(xhr);
                        mostrarMensajeDeError("ERROR!!: " + xhr.responseJSON.message);
                    });

                } else {
                    mostrarMensajeDeError("ERROR!!: primero debe registrar la entrada");
                }
            }
        }
    }).fail(function (xhr) {
        mostrarMensajeDeError("ERROR!!: Error en la validación de datos ");
    });
}
