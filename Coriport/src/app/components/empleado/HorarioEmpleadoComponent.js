$(document).ready(function () {
    cargarTabla();
});

function cargarTabla() {
    var user = JSON.parse(localStorage.getItem('identity'));

    $.ajax({
        url: "http://localhost:8000/api/horarioEmpleado/showByEmpleado/" + user.empleado.idEmpleado,
        type: "GET"
    }).done(function (response) {
        console.log(response);
        $("#dataHorarioEmpleado").empty(); // Limpiar la tabla antes de agregar nuevos datos

        // Verificar si response.data es un arreglo
        if (Array.isArray(response.data)) {
            // Iterar sobre cada objeto en el arreglo
            response.data.forEach(function (horarioEmpleado) {
                // Crear una fila HTML para cada objeto
                let HoraEntrada = formatHora(horarioEmpleado.HoraEntrada);
                let HoraSalida = formatHora(horarioEmpleado.HoraSalida);
                
                let filaHTML = `<tr> 
                    <td>${HoraEntrada}</td>
                    <td>${HoraSalida}</td>
                    <td>${horarioEmpleado.DiaLibre}</td>
                </tr>`;
                
                // Agregar la fila al cuerpo de la tabla
                $("#dataHorarioEmpleado").append(filaHTML);
            });

        } else {
            // Si no es un arreglo, asumir que es un solo objeto y crear una fila para él
            let HoraEntrada = formatHora(response.data.HoraEntrada);
            let HoraSalida = formatHora(response.data.HoraSalida);
            
            let filaHTML = `<tr> 
                <td>${HoraEntrada}</td>
                <td>${HoraSalida}</td>
                <td>${response.data.DiaLibre}</td>
            </tr>`;
            
            // Agregar la fila al cuerpo de la tabla
            $("#dataHorarioEmpleado").append(filaHTML);
        }

    }).fail(function (error) {
        console.log(error);
    });
}


function formatHora(hora) {
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
