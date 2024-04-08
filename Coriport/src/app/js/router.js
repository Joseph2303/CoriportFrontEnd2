
$("#diasFeriado").on('click',function(){routingi("feriado")});
$("#empleados").on('click',function(){routingi("empleado")});
$("#registroTardia").on('click',function(){routingi("registroTardia")});
$("#justiTardia").on('click',function(){routingi("justiTardia")});
$("#registroAusencia").on('click',function(){routingi("registroAusencia")});
$("#justiAusencia").on('click',function(){routingi("justiAusencia")});
$("#puesto").on('click',function(){routingi("puesto")});
$("#horario").on('click',function(){routingi("horario")});
$("#marcas").on('click',function(){routingi("marcas")});
$("#vacaciones").on('click',function(){routingi("soliVacaciones")});


$("#salir").on('click',function(){routingExit()});

function routingExit(){
    window.location.href = "/Coriport/src/app/views/Login/login.html";
    localStorage.clear()
}

function routingi(router){
    $('#main-containerEncargado').load('/Coriport/src/app/views/Encargado/'+router+'.html');
}

////////////////////////////////////////////////////////////////////////////////////////////////


$("#diasFeriados").on('click',function(){router("diasFeriados")});
$("#RegistroAsistencia").on('click',function(){router("RegistroAsistencia")});
$("#JustificacionAusencia").on('click',function(){router("JustificacionAusencia")});
$("#registroTardia").on('click',function(){router("registroTardia")});
$("#HorasExtra").on('click',function(){router("HorasExtra")});
$("#SoliVacaciones").on('click',function(){router("SoliVacaciones")});



function router(router){
    $('#main-containerEmpleado').load('/Coriport/src/app/views/Empleado/'+router+'.html');
}