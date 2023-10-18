/*let email =  document.getElementById('email');
let password =  document.getElementById('password');
let _token =  document.getElementById('token');
   
async function login(){
    let obj = { email:email.value, password:password.value };
    console.log(obj)
    const res = await fetch('http://localhost:8000/user/login', {
         method:'POST',
         mode: 'cors',
         headers:{
               'X-CSRF-TOKEN': _token.value,
               'Content-Type': 'application/json'
        },
        body:JSON.stringify(obj)      
        });
   
        const data = await res.json()
        console.log(data)
        clearInput()
       }

       function clearInput(){
           email.value = ""
           password.value = ""
}*/

function login(event){
    event.preventDefault(); 
    let data={
        email:$("#email").val(),
        password:$("#password").val()
    }
    fetch('http://localhost:8000/user/login',{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(function(response){
        return response.json();
    }).then(function(respObj){
        console.log(respObj.token);
        sessionStorage.setItem("token",respObj.token);

    }).catch(error=>{
        console.log("Error en la petición");
        console.log(error);
    });
}

$("#login").click(login);