
$("#diasFeriado").on('click',function(){routingi("feriado")});
$("#empleados").on('click',function(){routingi("empleado")});

function routingi(router){
    $('#main-containerEncargado').load('/Coriport/src/app/views/Encargado/'+router+'.html');
}

