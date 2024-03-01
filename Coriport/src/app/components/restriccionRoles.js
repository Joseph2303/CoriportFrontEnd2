var tokenString = localStorage.getItem("identity");

var redirigirALogin = () => {
    window.location.href = "/Coriport/src/app/views/Login/login.html";
};

if (!tokenString && window.location.href.indexOf('Login/login.html') === -1) {
    console.error("Token no encontrado en localStorage");
    redirigirALogin();
    
} else if (tokenString) {
    try {
        const token = JSON.parse(tokenString);

        const esEmpleado = token.tipoUsuario === "Empleado";
        const esAdmin = token.tipoUsuario === "Encargado";

        const estaEnPaginaEmpleado = window.location.href.indexOf('Empleado/main.html') !== -1;
        const estaEnPaginaAdmin = window.location.href.indexOf('Encargado/main.html') !== -1;

        if (esEmpleado && !estaEnPaginaEmpleado) {
            window.location.href = "/Coriport/src/app/views/Empleado/main.html";
        } else if (esAdmin && !estaEnPaginaAdmin) {
            window.location.href = "/Coriport/src/app/views/Encargado/main.html";
        } 
        
        if(!token) {     
        if( window.location.href.indexOf('Login/login.html') === -1)
          redirigirALogin();
        }

    } catch (error) {
        console.error("Error al analizar el token JSON:", error);
    }
}

