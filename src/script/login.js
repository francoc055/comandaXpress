import { Login } from "./../services/fetchService.js";

const $form = document.forms[0];

document.addEventListener("submit", async (e)=>{
    e.preventDefault();

    
    if(document.getElementById("message"))
    {
        document.getElementById("message").remove();
    }


    const {nombre, clave} = $form;

    const usuario = {
        Nombre: nombre.value,
        Clave: clave.value
    }    
   
    const token = await Login(usuario);
    if(token.status == 400)
    {
        const mensajeError = document.createElement("h3");
        mensajeError.setAttribute("id", "message")
        mensajeError.textContent = 'Error en las credenciales';
        mensajeError.classList.add('text-red-400', 'p-2');
        $form.appendChild(mensajeError);
        $form.reset();
        return;
    }

    localStorage.setItem('token', token.token);

    window.location.href = "./../views/main.html";

})
