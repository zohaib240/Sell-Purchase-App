
import { collection, query, where, addDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
    uploadBytes,getStorage

} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";


let title = document.querySelector('#title')
let description = document.querySelector('#description')
let name = document.querySelector('#name')
let number = document.querySelector('#number')
let productImage = document.querySelector('#productImage')
let form = document.querySelector('#form')
