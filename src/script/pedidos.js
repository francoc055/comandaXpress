import { GetPedidosProductos } from "./../services/fetchService.js";


const pedidos = await GetPedidosProductos();
console.log(pedidos);
const $seccionPedidos = document.getElementById("seccion-pedidos");
function CreateCardPedidos()
{
    pedidos.forEach(pedido => {
        $seccionPedidos.innerHTML += 
        `<article class="w-44 h-40 m-2 border-cyan-50 rounded-lg bg-green-400 flex flex-col items-center">
            <h2 class="w-44 p-3 bg-slate-50 text-center">${pedido.nombre}</h2>
            <h3>Mesa: ${pedido.idMesa}</h3>
            <p class="p-2">estado: ${pedido.estado}</p>
            <button class="rounded-3xl bg-slate-50 py-1 px-6 duration-500 hover:bg-slate-200">change</button>
        </article>`
    });
}

CreateCardPedidos();
