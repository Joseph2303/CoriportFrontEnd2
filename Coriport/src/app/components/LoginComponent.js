let email =  document.getElementById('email');
let password =  document.getElementById('password');
let _token =  document.getElementById('token');
   
async function addUser(){
    let obj = { email:email.value, password:password.value };
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
}