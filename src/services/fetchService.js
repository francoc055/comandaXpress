const URL = "https://localhost:7209/";

const getMesasVacias = async ()=>{
    try{
        const datos = await fetch(URL + "Mesa/MesasVacias");

        const mesas = await datos.json();
    
        return mesas;
    }catch{
        return [];
    }
}

const getMesas = async ()=>{
    try{
        const datos = await fetch(URL + "Mesa/mesas");

        const mesas = await datos.json();
    
        return mesas;
    }catch{
        return [];
    }
}

const getProductos = async ()=>{
    try{
        const datos = await fetch(URL + "Producto/productos");

        const productos = await datos.json();
    
        return productos;
    }
    catch{
        return [];
    }
}

const insertarPedidoProducto = (pedidoProducto)=>{
    return fetch(URL + 'PedidoProducto/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedidoProducto)
    })
    .then(response => {
        if(response.status == 201)
        {
            return response.status;
        }
        else
        {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }        
    })
    .catch(error => {
        console.error('PUT Error:', error);
        throw error;
    });

}

async function cambiarEstadoMesa(nuevoEstado, id){
    try{
        const response = await fetch(`${URL}Mesa/actualizarEstado/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoEstado)
        })
        return response;
    }
    catch(err)
    {
        console.error(err);
        throw err;
    }
}

const GetPedidosProductos = async () =>{
    try{
        const res = await fetch(`${URL}PedidoProducto/pedidosProductos`);
        const data = await res.json();
        return data ;
    }catch(err)
    {
        console.error(err);
        throw err;
    }
}

const PasarProductoAPreparacion = async (producto)=>{
    try{

        const res = await fetch(`${URL}PedidoProducto/ActualizarAPreparacion`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        })
        return res;
    }catch(err)
    {
        console.error(err);
        throw err;
    }
}

const PasarProductoAServir = async (producto)=>{
    try{

        const res = await fetch(`${URL}PedidoProducto/ActualizarAServir`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        })
        return res;
    }catch(err)
    {
        console.error(err);
        throw err;
    }
}

const Login = async (usuario)=>{
    try{

        const res = await fetch(`${URL}Usuario/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        return res.text();
    }catch(err)
    {
        console.error(err);
        throw err;
    }


};

export{
    getMesasVacias,
    getProductos,
    insertarPedidoProducto,
    getMesas,
    cambiarEstadoMesa, 
    GetPedidosProductos,
    PasarProductoAPreparacion,
    PasarProductoAServir,
    Login
}
