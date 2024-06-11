$(document).ready(function () {
    cargarTabla();
});

function cargarTabla() {
    $.ajax({
        url: "http://localhost:8000/api/horasExtras/show",
        type: "GET"
    }).done(function (response) {
        $("#dataTableHorasExtra").empty(); 
        var respObj = response.data;
        
        for (k in respObj) {
            let maxHora = formatHora(respObj[k].maxHora);
            let cantidadHora = formatHora(respObj[k].cantidadHora);
            
            let filaHTML = `<tr> 
                <td>${respObj[k].id}</td>
                <td>${maxHora}</td>
                <td>${cantidadHora}</td>
                <td>${respObj[k].idHorario}</td>
            </tr>`;
            let fila = $(filaHTML);
            
            // Añadir la fila a la tabla
            $("#dataTableHorasExtra").append(fila);
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
