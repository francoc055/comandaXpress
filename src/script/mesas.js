import { getMesas, cambiarEstadoMesa } from "../services/fetchService.js"

const mesas = await getMesas();

const $seccionMesas = document.getElementById("seccion-mesas");
const $btnEstado = document.getElementById("btnEstado");

//creacion de cards de las mesas con su informacion dinamicamente.
const CreateCardsMesas = (mesas)=>{
    mesas.forEach((mesa)=>{
        const article = document.createElement('article');
        article.setAttribute("data-id", mesa.id);
        CambiarColorContenedorMesa(article, mesa.estado);
        article.classList.add("w-44", "p-2", "m-1", "rounded-lg", "shadow-zinc-800", "shadow-sm");
        $seccionMesas.appendChild(article);
        const title = document.createElement('h2');
        title.textContent = `mesa ${mesa.id}`;
        article.appendChild(title);
        const div = document.createElement("div");
        div.classList.add("flex", "items-center", "justify-between")
        article.appendChild(div); 

        div.innerHTML = `<p>estado: <br>${mesa.estado}</p>
                        <button id="btnEstado" class="bg-zinc-300 rounded-lg p-1 duration-500 hover:bg-zinc-400">change</button>`

    })
}
CreateCardsMesas(mesas);




document.addEventListener("click", async (e) => {

    //si matchea con con el boton de cambio de estado se crea dinamicamente un listado de estados.
   if(e.target.id == "btnEstado")
   {
    const article = e.target.parentElement.parentElement;

    if(article.children.length == 3 )
    {
        article.lastElementChild.remove() 
    }
    
    article.insertAdjacentHTML("beforeend", 
    `<div class="mt-2 flex justify-between">
        <select name="" class="mr-1">
            <option value="vacia">vacia</option>
            <option value="esperando">esperando</option>
            <option value="comiendo">comiendo</option>
            <option value="pagando">pagando</option>
        </select>
        <button id="btnConfirmar" class="bg-lime-600 rounded p-1 mr-1  transition-all duration-500 hover:bg-lime-500">
            <svg class="w-4 h-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
        </button>
        <button id="btnCancelar" class="bg-red-700 rounded p-1 transition-all duration-500 hover:bg-red-500">
            <svg class="w-4 h-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
        </button>
    </div>`);
                                    
   }

    //si matchea con el boton cancelar del contenedor de cambios de estado, se remueve dicho contenendor. 
    if(e.target.id == "btnCancelar")
    {
        const contenedor = e.target.parentElement;
        contenedor.remove();
    }
    else if(e.target.id == "btnConfirmar") //si matchea con el boton confirmar del contenedor de cambios de estado, se cambia el estado de la mesa por el seleccionado.
    {
        const contenedorConfirm = e.target.parentElement;
        const id = e.target.parentElement.parentElement.dataset.id;
        const $select = e.target.parentElement.getElementsByTagName('select')[0];
        
        const indice = $select.selectedIndex;
        const nuevoEstado = $select.options[indice].value;
        const estado = e.target.parentElement.previousElementSibling.getElementsByTagName("p")[0];

        const articulo = e.target.parentElement.parentElement;
        
        
        const res = await cambiarEstadoMesa(nuevoEstado, id);
        if(res.status == 204)
        {
            CambiarColorContenedorMesa(articulo, nuevoEstado);
            estado.textContent = `estado: ${nuevoEstado}`;
            contenedorConfirm.remove();
            Swal.fire("Estado cambiado con exito!")
        }
    }

});

//cambio el color del contenedor de la mesa segun el estado.
function CambiarColorContenedorMesa(contenedor, nuevoEstado)
{
    if(nuevoEstado == 'vacia')
    {
        contenedor.classList.remove("bg-green-400");
        contenedor.classList.add("bg-red-400");
    }
    else
    {
        contenedor.classList.remove("bg-red-400");
        contenedor.classList.add("bg-green-400"); 
    }
}




