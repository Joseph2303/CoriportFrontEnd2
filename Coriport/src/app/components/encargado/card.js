function loadScripts() {
    loadScript("/Coriport/src/app/components/encargado/EmpleadoComponent.js", function() {
        console.log("EmpleadoComponent.js cargado exitosamente");
    });

    loadScript("/Coriport/src/app/components/encargado/soliVacacionesComponent.js", function() {
        console.log("soliVacacionesComponent.js cargado exitosamente");
    });

    loadScript("/Coriport/src/app/components/encargado/RegistroAusenciaComponent.js", function() {
        console.log("RegistroAusenciaComponent.js cargado exitosamente");
    });
}

function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {  // IE
        script.onreadystatechange = function() {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  // Otros navegadores
        script.onload = function() {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

// Llama a la función para cargar los scripts
loadScripts();
