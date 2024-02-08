import { Login } from "./../services/fetchService.js";

const $form = document.forms[0];

document.addEventListener("submit", async (e)=>{
    e.preventDefault();

    const {nombre, clave, roles} = $form;

    const usuario = {
        Nombre: nombre.value,
        Clave: clave.value,
        Rol: roles.value
    }    

    
    const token = await Login(usuario);

    localStorage.setItem('token', token);

})