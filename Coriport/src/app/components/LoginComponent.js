
   
/*async function login(event){
    event.preventDefault(); 
    let data={
        email:$("#email").val(),
        password:$("#password").val()
    }

    //let obj = { email:email.value, password:password.value };
    const res = await fetch('http://localhost:8000/api/user/login', {
         method:'POST',
         mode: 'cors',
         headers:{
               //'X-CSRF-TOKEN': _token.value,
               'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)      
        }).then(function(response){
            return response.json();
        }).then(function(respObj){
            console.log(respObj.token);
          //  sessionStorage.setItem("token",respObj.token);
    
        }).catch(error=>{
            console.log("Error en la petición");
            console.log(error);
        });
   
        data = await res.json()
        console.log(data)
        clearInput()
       }

       function clearInput(){
           email.value = ""
           password.value = ""
}* */

function login(event){
    event.preventDefault(); 
    let data={
        email:$("#email").val(),
        contrasena:$("#contrasena").val()
    }
    fetch('http://localhost:8000/api/user/login',{
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
        console.log(data)
        console.log("Error en la petición");
        console.log(error);
    });
}

$("#login").click(login);