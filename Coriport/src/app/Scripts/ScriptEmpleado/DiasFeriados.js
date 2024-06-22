var tabla = document.getElementById("diasFeriados-table");

function filtrarFeriado() {
    var inputBusqueda = document.getElementById('busquedaFeriado');
    var filtro = inputBusqueda.value.toUpperCase();

    var filas = tabla.getElementsByTagName('tr');

    for (var i = 0; i < filas.length; i++) {
        if (filas[i].getElementsByTagName('th').length === 0) {
            var celdas = filas[i].getElementsByTagName('td');
            var mostrarFila = false;

            for (var j = 0; j < celdas.length; j++) {
                var textoCelda = celdas[j].textContent || celdas[j].innerText;
                if (textoCelda.toUpperCase().indexOf(filtro) > -1) {
                    mostrarFila = true;
                    break;
                }
            }

            filas[i].style.display = mostrarFila ? '' : 'none';
        }
    }
}


function generarPDF() {
    const doc = new jsPDF(); // PDF estándar de tamaño A4 en orientación horizontal
    const totalPagesExp = "{total_pages_count_string}";

    // Cargar la primera imagen (en la esquina superior izquierda)
    const img1 = new Image();
    img1.onload = function () {
        const canvas1 = document.createElement('canvas');
        canvas1.width = img1.width;
        canvas1.height = img1.height;
        const ctx1 = canvas1.getContext('2d');
        ctx1.drawImage(img1, 0, 0);
        const dataURL1 = canvas1.toDataURL('image/png');

        // Insertar la primera imagen en el PDF (logo izquierdo)
        const imgWidth1 = 40; // Tamaño de la primera imagen (tamaño de logo pequeño)
        const imgHeight1 = (imgWidth1 * img1.height) / img1.width; // Proporcional al tamaño de la imagen original
        doc.addImage(dataURL1, 'PNG', 18, 18, imgWidth1, imgHeight1); // Colocar la primera imagen en la esquina superior izquierda

        
        // Cargar la segunda imagen (en la esquina superior derecha)
        const img2 = new Image();
        img2.onload = function () {
            const canvas2 = document.createElement('canvas');
            canvas2.width = img2.width;
            canvas2.height = img2.height;
            const ctx2 = canvas2.getContext('2d');
            ctx2.drawImage(img2, 0, 0);
            const dataURL2 = canvas2.toDataURL('image/png');

            // Insertar la segunda imagen en el PDF (logo derecho)
            const imgWidth2 = 40; // Tamaño de la segunda imagen (tamaño de logo pequeño)
            const imgHeight2 = (imgWidth2 * img2.height) / img2.width; // Proporcional al tamaño de la imagen original
            const xPos = doc.internal.pageSize.width - 60; // Coordenada x para la esquina superior derecha
            doc.addImage(dataURL2, 'PNG', xPos, 18, imgWidth2, imgHeight2); // Colocar la segunda imagen en la esquina superior derecha

            // Agregar el título "Días Feriados"
            doc.setFontSize(24); // Tamaño de fuente más grande
            doc.text("Días Feriados", doc.internal.pageSize.width / 2, 55, null, null, 'center'); // Colocar el título centrado en la parte superior



            // Generar la tabla en el PDF
            const tableOptions = {
                startY: 70, // Colocar la tabla debajo del título
                html: '#diasFeriados-table', // Identificador de la tabla HTML
                didDrawPage: function (data) {
                    // Agregar número de página al pie de cada página
                    let pageCount = doc.internal.getNumberOfPages();
                    if (typeof doc.putTotalPages === 'function') {
                        doc.putTotalPages(totalPagesExp);
                    }
                },
                margin: { top: 10 }, // Margen superior para centrar la tabla
                styles: {
                    font: 'helvetica', // Fuente
                    fontSize: 12, // Tamaño de fuente
                    fontStyle: 'normal', // Estilo de fuente (normal, bold, italic, bolditalic)
                    // textColor: [33, 33, 33], // Color de texto RGB
                    cellPadding: 4, // Relleno de celda
                    // fillColor: [255, 87, 51], // Color de fondo de celda RGB
                    //  lineColor: [255, 255, 255], // Color de las líneas de la tabla RGB
                    lineWidth: 0.5, // Ancho de las líneas de la tabla
                    halign: 'center', // Alineación horizontal del contenido de la celda (left, center, right)
                },
            };

            doc.autoTable(tableOptions);

            // Agregar pie de página con número de página
            let pageCount = doc.internal.getNumberOfPages(); // Obtener número total de páginas
            for (let i = 1; i <= pageCount; i++) {
                // Ir a la página actual
                doc.setPage(i);
                doc.setFontSize(10); // Tamaño de fuente
                doc.text('Página ' + i + ' de ' + pageCount, 10, doc.internal.pageSize.height - 10); // Agregar número de página al pie de cada página
            }

            // Guardar el PDF
            doc.save('DiasFeriados_Coriport.pdf');
        };
        // Cambia la URL de la segunda imagen a la que quieras usar
        img2.src = '/Coriport/src/app/Assets/img/siglas_coriport.png';
    };
    // Cambia la URL de la primera imagen a la que quieras usar
    img1.src = '/Coriport/src/app/Assets/img/coripo.png';
}




document.addEventListener("DOMContentLoaded", function() {
    var table = document.getElementById("diasFeriados-table");
    var tbody = table.getElementsByTagName("tbody")[0];
    var rowsPerPage = 1; // Cambia esto según la cantidad de filas que desees mostrar por página
    var rows = tbody.getElementsByTagName("tr");
    var pageCount = Math.ceil(rows.length / rowsPerPage);

    function showPage(page) {
        var start = (page - 1) * rowsPerPage;
        var end = start + rowsPerPage;
        for (var i = 0; i < rows.length; i++) {
            if (i >= start && i < end) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }

    function createPaginationControls() {
        var paginationControls = document.getElementById("paginationControls");
        for (var i = 1; i <= pageCount; i++) {
            var button = document.createElement("button");
            button.textContent = i;
            button.addEventListener("click", function() {
                var pageNumber = parseInt(this.textContent);
                showPage(pageNumber);
            });
            paginationControls.appendChild(button);
        }
    }

    showPage(1);
    createPaginationControls();
});