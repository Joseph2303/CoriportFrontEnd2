const tokenString = localStorage.getItem("identity");

const redirigirALogin = () => {
    window.location.href = "http://127.0.0.1:5500/Coriport/src/app/views/Login/login.html";
};

if (!tokenString && window.location.href.indexOf('Login/login.html') === -1) {
    console.error("Token no encontrado en localStorage");
    redirigirALogin();
    
} else if (tokenString) {
    try {
        const token = JSON.parse(tokenString);
        console.log(token);

        const esEmpleado = token.tipoUsuario === "empleado";
        const esAdmin = token.tipoUsuario === "admin";

        const estaEnPaginaEmpleado = window.location.href.indexOf('Empleado/main.html') !== -1;
        const estaEnPaginaAdmin = window.location.href.indexOf('Encargado/main.html') !== -1;

        if (esEmpleado && !estaEnPaginaEmpleado) {
            console.log("Empleado");
            window.location.href = "http://127.0.0.1:5500/Coriport/src/app/views/Empleado/main.html";
        } else if (esAdmin && !estaEnPaginaAdmin) {
            console.log("Admin");
            window.location.href = "http://127.0.0.1:5500/Coriport/src/app/views/Encargado/main.html";
        }

    } catch (error) {
        console.error("Error al analizar el token JSON:", error);
    }
}

// Redirigir a la página de inicio de sesión después de 6 segundos si el token no está presente
