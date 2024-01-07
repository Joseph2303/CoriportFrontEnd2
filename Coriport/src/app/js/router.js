
$("#diasFeriado").on('click',function(){routingi("DiasFeriados")});
$("#empleados").on('click',function(){routingi("empleado")});

function routingi(router){
    $('#main-containerEncargado').load('/Coriport/src/app/views/Encargado/'+router+'.html');
}

