import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  uploadBytes,
  getDownloadURL,
  ref,
  getStorage
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { auth , db} from "./config.js";


const storage = getStorage()
const name =document.querySelector('#name')
const lastName =document.querySelector('#last_name')
const email =document.querySelector('#Email')
const password =document.querySelector('#Password')
let myfile = document.querySelector("#myfile")
const form =document.querySelector('#form')


form.addEventListener('submit',async (event)=>{
    event.preventDefault()
    console.log( email.value);
    console.log( password.value);
    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(async (userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
   
    let file = myfile.files[0]
    let url = null
    if (file) {
        url = await uploadFile(file, email.value)
        console.log(url);
    }
    Swal.fire({
      title: 'Success!',
      text: 'Your account registered successfully!',
      icon: 'success',
      confirmButtonText: 'Login'
  })
      .then((result) => {
          if (result.isConfirmed) {
              window.location = "./login.html";
          }
      });
      
        // add data into firestore database
        try {
          const docRef = await addDoc(collection(db, "users"), {
              name: name.value,
              last_name: lastName.value,
              email: email.value,
              uid: user.uid,
              photoUrl: url
          });
          console.log("Document written with ID: ", docRef.id);
      } catch (e) {
          console.error("Error adding document: ", e);
      }
  })
  
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });
  email.value=''
  password.value=''
  name.value=''
  lastName.value=''
})


// img to url convert function
async function uploadFile(file, userEmail) {
  const storageRef = ref(storage, userEmail);
  try {
      const uploadImg = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(uploadImg.ref);
      return url;
  } catch (error) {
      console.error(error);
      throw error;
  }}