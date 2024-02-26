
$("#diasFeriado").on('click',function(){routingi("feriado")});
$("#empleados").on('click',function(){routingi("empleado")});
$("#registroTardia").on('click',function(){routingi("registroTardia")});
$("#justiTardia").on('click',function(){routingi("justiTardia")});
$("#registroAusencia").on('click',function(){routingi("registroAusencia")});
$("#justiAusencia").on('click',function(){routingi("justiAusencia")});
$("#horario").on('click',function(){routingi("horario")});
$("#marcas").on('click',function(){routingi("marcas")});

$("#salir").on('click',function(){routingExit()});

function routingExit(){
    window.location.href = "/Coriport/src/app/views/Login/login.html";
    localStorage.clear()
}

function routingi(router){
    $('#main-containerEncargado').load('/Coriport/src/app/views/Encargado/'+router+'.html');
}


