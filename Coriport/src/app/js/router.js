$("#navFinans").on('click',function(){routingi("Combos")});
$("#navFinance").on('click',function(){routingi("carretes")});
$("#navTalent").on('click',function(){routingi("canas")});
$("#lineas").on('click',function(){routingi("lineas")});
$("#senuelos").on('click',function(){routingi("senuelos")});
$("#Herramientas").on('click',function(){routingi("herramientas")});

function routingi(router){
    $('#main-containerArti').load('../views/Empleado'+router+'.html');
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