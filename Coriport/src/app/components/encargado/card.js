function loadScripts() {
    loadScript("/Coriport/src/app/components/encargado/EmpleadoComponent.js");
    loadScript("/Coriport/src/app/components/encargado/soliVacacionesComponent.js");
    loadScript("/Coriport/src/app/components/encargado/RegistroAusenciaComponent.js");
}

function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) { 
        script.onreadystatechange = function() {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                if (callback) callback();
            }
        };
    } else {  
        script.onload = function() {
            if (callback) callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

setInterval(loadScripts, 1000);

