
$("#diasFeriado").on('click',function(){routingi("feriado")});
$("#empleados").on('click',function(){routingi("empleado")});
$("#horasExtras").on('click',function(){routingi("horasExtras")});
$("#registroTardia").on('click',function(){routingi("registroTardia")});
$("#justiTardia").on('click',function(){routingi("justiTardia")});
$("#registroAusencia").on('click',function(){routingi("registroAusencia")});
$("#justiAusencia").on('click',function(){routingi("justiAusencia")});
$("#puesto").on('click',function(){routingi("puesto")});
$("#horario").on('click',function(){routingi("horario")});
$("#marca").on('click',function(){routingi("marca")});
$("#vacaciones").on('click',function(){routingi("soliVacaciones")});
$("#vacacion").on('click',function(){routingi("vacaciones")});
$("#empleado").on('click',function(){routingi("empleado")});
$("#Vacacione").on('click',function(){routingi("soliVacaciones")});
$("#RegistroFace").on('click',function(){routingi("RegistroFace")});
$("#HorarioEmpleados").on('click',function(){routingi("HorarioEmpleados")});


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
$("#horasExtras").on('click',function(){router("horasExtras")});
$("#registroAusencia").on('click',function(){router("registroAusencia")});
$("#JustificacionAusencia").on('click',function(){router("JustificacionAusencia")});
$("#registroTardia").on('click',function(){router("registroTardia")});
$("#HorasExtra").on('click',function(){router("HorasExtra")});
$("#SoliVacaciones").on('click',function(){router("SoliVacaciones")});
$("#vacaciones").on('click',function(){router("vacaciones")});
$("#vacacio").on('click',function(){router("vacaciones")});
$("#Horarios").on('click',function(){router("Horarios")});



function router(router){
    $('#main-containerEmpleado').load('/Coriport/src/app/views/Empleado/'+router+'.html');
}




$("#faceid").on('click',function(){routerar("faceid")});
$("#marcaid").on('click',function(){routerar("marcaid")});

function routerar(router){
    $('#main-containerMarca').load('/Coriport/src/app/views/Login/'+router+'.html');
}