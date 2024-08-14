import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from "./config.js";



// const name =document.querySelector('#name')
// const lastName =document.querySelector('#last_name')
const email =document.querySelector('#Email')
const password =document.querySelector('#Password')
const form =document.querySelector('#form')


form.addEventListener('submit',(event)=>{
    event.preventDefault()
    createUserWithEmailAndPassword(auth, email.value, password.value)
   
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
      email.value=''
    password.value=''
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });

})


