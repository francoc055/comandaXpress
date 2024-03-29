import { getMesasVacias, getProductos, insertarPedidoProducto } from "./../services/fetchService.js";

const token = localStorage.getItem('token');
const seccionProductos = document.getElementById('seccion-productos');
const $seccionMesas = document.getElementById('seccion-mesas');
const productos = await getProductos(token);
const $lista = document.getElementById('lista');

//creacion de los distintos productos dinamicamente.
const CreateCardProductos = async (productos)=>{

    for (const key in productos) {
        const article = document.createElement('article');
        article.classList.add('my-2', 'flex', 'justify-center', 'items-center', 'w-64', 'h-14', 'border', 'rounded-2xl', 'bg-gray-100', 'shadow-xl');
        
        const contenedor = document.createElement('div');
        contenedor.setAttribute('data-id', productos[key].id);
        contenedor.classList.add('w-full', 'flex', 'justify-around', 'items-center')
        article.appendChild(contenedor);
        const nombre = document.createElement("h2");
        nombre.textContent = productos[key].nombre;
        const precio = document.createElement("p");
        precio.textContent = "$" + productos[key].precio;
        nombre.classList.add('m-1', 'text-zinc-800');
        precio.classList.add('m-1', 'text-zinc-800');

        contenedor.appendChild(nombre);
        contenedor.appendChild(precio);


        const contenedorBtn = document.createElement('div');
        contenedorBtn.classList.add('m-1');
        contenedorBtn.setAttribute("id", "contenedorBtn");

        const btnSumar = document.createElement('button');
        btnSumar.setAttribute("id", "btnSumar");
        btnSumar.classList.add('p-1', 'text-2xl', 'rounded-2xl', 'transition-colors', 'duration-500', 'hover:bg-zinc-700')
        btnSumar.textContent = '+';
        const btnRestar = document.createElement('button');
        btnRestar.setAttribute("id", "btnRestar");
        btnRestar.classList.add('px-2', 'py-1', 'text-2xl', 'rounded-2xl', 'transition-colors', 'duration-500', 'hover:bg-zinc-700')
        btnRestar.textContent = '-';
        contenedorBtn.appendChild(btnSumar);
        contenedorBtn.appendChild(btnRestar);
        contenedor.appendChild(contenedorBtn);

        seccionProductos.appendChild(article);
    }


}

CreateCardProductos(productos);


document.addEventListener('click', (e)=>{
    
    if(e.target.id == 'btnSumar') //sumo productos al pedido.
    {
        const id = e.target.parentElement.parentElement.dataset.id;
        const producto = productos.filter(x => x.id == id);
        if(VerificarRepeticionItem(id))
        {
            return;
        }
        AddItemsList(producto);
    }
    else if(e.target.id == 'btnRestar') //resto productos del pedido.
    {
        const id = e.target.parentElement.parentElement.dataset.id;
        const producto = productos.filter(x => x.id == id);
        RemoveItemList(producto[0].id);
    }
    else if(e.target.id == 'btnEnviar') //realizo peticion para insertar el pedido.
    {
        if($lista.children.length < 1)
        {
            return;
        }
        const $select = document.getElementsByTagName('select')[0];
        const indice = $select.selectedIndex;
        const idMesa = $select.options[indice].value;
        
        const pedidoProducto = { 
            IdMesa: idMesa,
            Productos: []
        };

        for(let i = 0; i < $lista.children.length; i++)
        {
            const producto = {
                IdProducto: parseInt($lista.children[i].dataset.id),
                Cantidad: parseInt($lista.children[i].children[0].textContent)
            }
            pedidoProducto.Productos.push(producto);
        }

        insertarPedidoProducto(pedidoProducto, token)
        .then(statusCode => {
            if (statusCode === 201) {
                Swal.fire("Pedido creado con exito!");
                $seccionMesas.children[0].remove();
                createSelectMesas();
                removeProductos();
            } else {
                console.log("Error");
            }
        })
        .catch(error => console.error('Error:', error));

    }
});

function removeProductos(){
    while($lista.hasChildNodes())
    {
        $lista.removeChild($lista.firstChild);
    }
}

//agrega elementos a la lista de detalles del pedido
const AddItemsList = (producto)=>{
    const li = document.createElement('li');
    const cantidad = document.createElement('span');
    cantidad.textContent = '1';
    li.classList.add('text-zinc-800', 'mb-3');
    li.setAttribute('data-id', producto[0].id);
    li.textContent = producto[0].nombre + ' ' + producto[0].precio + ' x';
    li.appendChild(cantidad);
    $lista.appendChild(li);
}

//verifica que si se repita el producto se le suma la cantidad.
const VerificarRepeticionItem = (id)=>{

    if($lista.children.length > 0)
    {
        for(let i = 0; i < $lista.children.length; i++)
        {
            if($lista.children[i].dataset.id == id)
            {
                $lista.children[i].children[0].textContent = parseInt($lista.children[i].children[0].textContent) + 1;
                return true;
            }
        }
    }

    return false;
}

//elimina elementos de la lista de detalles del pedido
const RemoveItemList = (id)=>{
    if($lista.children.length > 0)
    {
        for(let i = 0; i < $lista.children.length; i++)
        {
            if($lista.children[i].dataset.id == id)
            {
                if($lista.children[i].children[0].textContent == 1)
                {
                    $lista.removeChild($lista.children[i]);
                }
                else
                {
                    $lista.children[i].children[0].textContent = parseInt($lista.children[i].children[0].textContent) - 1;
                }

                return true;
            }
        }
    }
}

//cargo selector con mesas vacias.
const createSelectMesas = async ()=>{
    const mesas = await getMesasVacias(token);

    const select = document.createElement("select");
    select.classList.add("w-44", "h-8", "mt-2", "rounded-md", "bg-gray-100", "border", "text-zinc-800", "pl-2");
    $seccionMesas.appendChild(select);
    for (const key in mesas) {
        const option = document.createElement("option");
        option.textContent = "Mesa " + mesas[key].id;
        option.setAttribute("value", mesas[key].id);
        select.appendChild(option);
    }    
}

createSelectMesas();




