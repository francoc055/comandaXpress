const productos = [
    {
        id: 1,
        nombre: "milanesa",
        precio: "$4500"
    },
    {
        id: 2,
        nombre: "papas con cheddar",
        precio: "$2300"
    },
    {
        id: 3,
        nombre: "vino circus",
        precio: "$2350"
    },
    {
        id: 4,
        nombre: "cerveza andes",
        precio: "$2500"
    }
]

const seccionProductos = document.getElementById('seccion-productos');

const CreateCardProductos = (productos)=>{

    for (const key in productos) {
        const article = document.createElement('article');
        article.classList.add('my-2', 'flex', 'justify-center', 'items-center', 'w-64', 'h-14', 'border', 'rounded-2xl', 'bg-zinc-800');
        
        const contenedor = document.createElement('div');
        contenedor.setAttribute('data-id', productos[key].id);
        contenedor.classList.add('w-full', 'flex', 'justify-around', 'items-center')
        article.appendChild(contenedor);
        const nombre = document.createElement("h2");
        nombre.textContent = productos[key].nombre;
        const precio = document.createElement("p");
        precio.textContent = productos[key].precio;
        nombre.classList.add('m-1', 'text-white');
        precio.classList.add('m-1', 'text-white');

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
        btnRestar.classList.add('px-2', 'py-1', 'text-2xl', 'rounded-2xl', 'transition-colors', 'duration-500', 'hover:bg-zinc-700')
        btnRestar.textContent = '-';
        contenedorBtn.appendChild(btnSumar);
        contenedorBtn.appendChild(btnRestar);
        contenedor.appendChild(contenedorBtn);

        seccionProductos.appendChild(article);
    }


}

CreateCardProductos(productos);

/*
<article class="my-2 flex justify-center items-center w-64 h-14 border rounded-2xl bg-zinc-800">
    <div class="w-full flex justify-around items-center">
        <h2 class="m-1 text-white">milanesa</h2>
        <p class="m-1 text-white">$4500</p>
        <div class="m-1">
            <button class="p-1 text-2xl rounded-2xl transition-colors duration-500 hover:bg-zinc-700">+</button>
            <button class="px-2 py-1 text-2xl rounded-2xl transition-colors duration-500 hover:bg-zinc-700">-</button>
        </div>
        <!-- cantidad -->
        <p class="bg-zinc-700 text-white px-2 py-1 rounded-xl">0</p>
    </div>
</article>
*/


document.addEventListener('click', (e)=>{
    if(e.target.id == 'btnSumar')
    {
        // console.log();
        const id = e.target.parentElement.parentElement.dataset.id;
        const producto = productos.filter(x => x.id == id);
        console.log(producto);
    }
});
