import {  GetPedidosProductosBartender, GetPedidosProductosCocinero, PasarProductoAPreparacion, PasarProductoAServir} from "./../services/fetchService.js";
import { DecodeToken } from "./../services/tokenService.js";

const token = localStorage.getItem('token');
const $seccionPedidos = document.getElementById("seccion-pedidos");

const rol = DecodeToken(token);

async function CreateCardPedidos() {
    let pedidos = '';
    if(rol == 'bartender')
    {
        pedidos = await GetPedidosProductosBartender(token);
    }
    else if(rol == 'cocinero')
    {
        pedidos = await GetPedidosProductosCocinero(token);
    }
    
    if(pedidos == '')
    {
        return;
    }
    pedidos.forEach(pedido => {
        const tiempoInput = pedido.estado === 'pendiente'
        ? `<label for="tiempoPreparacion" class="px-2">Tiempo</label><input type="number" class="w-16 border rounded p-1" id="tiempoPreparacion">`
        : '';

        const newEstado = NextEstado(pedido.estado);
       
        const boton = pedido.estado != 'servir'
        ? `<button id="btnEstado" class="rounded-full bg-slate-50 py-1 px-6 duration-500 hover:bg-slate-300 text-sm">${newEstado}</button>`
        : '';

        const articulo = document.createElement('article');
        $seccionPedidos.appendChild(articulo);
        articulo.setAttribute('data-id', pedido.id);
        articulo.classList.add("w-64", "m-4", "border", "rounded-lg", "flex", "flex-col", "items-center");
        CambiarColorSegunEstado(articulo, pedido.estado);
        
        articulo.innerHTML += `
        <h2 class="w-full p-3 bg-gray-200 text-center text-lg font-semibold rounded-t-lg">${pedido.nombre}</h2>
        <div class="flex justify-between w-full p-2">
        <span>Cantidad: ${pedido.cantidad}</span>
            <span>Mesa: ${pedido.idMesa}</span>
        </div>
        <p class="p-2 underline">Estado: <span id="estadoProducto">${pedido.estado}</span></p>
        ${boton}
        <div class="p-2">${tiempoInput}</div>`;
    });
}


CreateCardPedidos();


function CambiarColorSegunEstado(contenedor, estado)
{

    if(estado == 'pendiente')
    {
        contenedor.classList.add("bg-red-400");
    }
    else if(estado == 'preparacion')
    {
        contenedor.classList.remove("bg-red-400");
        contenedor.classList.add("bg-green-400");
    }
    else{
        contenedor.classList.remove("bg-green-400");
        contenedor.classList.add("bg-orange-400");
    }

}

function NextEstado(estado){
    let newEstado;
    if(estado == 'pendiente')
    {
        newEstado = "preparacion";
    }
    else if(estado == 'preparacion')
    {
        newEstado = "servir";
    }

    return newEstado;
}

document.addEventListener("click", (e)=>{

    if(e.target.id == 'btnEstado')
    {
        CambiarEstado(e.target);
    }
});


function CambiarEstado(targ)
{
    const id = parseInt(targ.parentElement.dataset.id);
    const estadoProducto = targ.textContent;
    
    const producto = {
        Id: id,
        Estado: estadoProducto,
    }
    
    if(producto.Estado == "preparacion")
    {

        const tiempoPreparacion = parseInt(targ.parentElement.querySelector('#tiempoPreparacion').value);
        producto.TiempoPreparacion = tiempoPreparacion;

        if(isNaN(producto.TiempoPreparacion) || producto.Estado != "preparacion")
        {
            Swal.fire({
                icon: "error",
                title: "Datos erroneos"
              });
            return;
        }
    

    
        PasarProductoAPreparacion(producto, token)
        .then(res => {
            if(res.status == 204)
            {
                CambioDeEstadoExitoso();
            }
        })
        .catch(err => console.error(err))
    }
    else if(producto.Estado == "servir")
    {
        PasarProductoAServir(producto, token)
        .then(res => {
            if(res.status == 204)
            {
                CambioDeEstadoExitoso();
            }
        })
        .catch(err => console.error(err))
    }

    

}

function CambioDeEstadoExitoso()
{
    while($seccionPedidos.hasChildNodes())
    {
        $seccionPedidos.removeChild($seccionPedidos.firstChild);
    }
    CreateCardPedidos();
    Swal.fire("Producto actualizado con exito!") 
}