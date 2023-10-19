
$("#diasFeriado").on('click',function(){routingi("DiasFeriados")});
$("#Empleados").on('click',function(){routingi("Usuario")});

function routingi(router){
    $('#main-containerEncargado').load('/Coriport/src/app/views/Encargado/'+router+'.html');
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/*import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', 
});

async function obtenerUsuarios() {
  try {
    const response = await api.get('users');
    const usuarios = response.data;
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; 
    usuarios.forEach(usuario => {
      const listItem = document.createElement('li');
      listItem.textContent = usuario.name;
      userList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

window.addEventListener('load', obtenerUsuarios);
*/