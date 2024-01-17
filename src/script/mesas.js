import { getMesas } from "../services/fetchService.js"

const mesas = await getMesas();
console.log(mesas);
const $seccionMesas = document.getElementById("seccion-mesas");
const $btnEstado = document.getElementById("btnEstado");

const CreateCardsMesas = (mesas)=>{
    mesas.map((mesa)=>{
        const article = document.createElement('article');
        article.classList.add("w-44", "p-2", "m-1", "bg-zinc-500", "rounded-lg", "shadow-zinc-800", "shadow-sm");
        $seccionMesas.appendChild(article);
        const title = document.createElement('h2');
        const p = document.createElement('p');
        title.textContent = `mesa ${mesa.id}`;
        p.textContent = `estado: ${mesa.estado}`;
        article.appendChild(title);
        article.appendChild(p);

        
    })
}
// CreateCardsMesas(mesas);

// $btnEstado.addEventListener("click", () => {
//     const estado = document.getElementById("estado");
//     const div = estado.parentElement;
    
//     const input = document.createElement("input");
//     input.setAttribute("type", "text");
//     input.classList.add("bg-transparent", "border-b-2", "w-20");
//     estado.textContent = "";

//     div.insertBefore(input, div.firstChild);


// });

//<input type="text" class="bg-transparent border-b-2 w-20">


