const URL = "https://localhost:7209/";

const getMesasVacias = async (token)=>{
    try{
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const datos = await fetch(URL + "Mesa/MesasVacias",
        {
            method: 'GET',
            headers: headers
        });

        const mesas = await datos.json();
    
        return mesas;
    }
    catch(err){
        console.error(err);
        throw err;
    }
}

const getMesas = async (token)=>{
    try{
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        const datos = await fetch(URL + "Mesa/mesas",
        {
            method: 'GET',
            headers: headers
        });

        const mesas = await datos.json();
    
        return mesas;
    }    
    catch(err){
        console.error(err);
        throw err;
    }
}

const getProductos = async (token)=>{
    try{
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        const datos = await fetch(URL + "Producto/productos",
        {
            method: 'GET',
            headers: headers
        });

        const productos = await datos.json();
    
        return productos;
    }
    catch(err){
        console.error(err);
        throw err;
    }
}

const insertarPedidoProducto = (pedidoProducto, token)=>{
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    return fetch(URL + 'PedidoProducto/agregar', {
        method: 'POST',
        headers: headers,
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

async function cambiarEstadoMesa(nuevoEstado, id, token){
    try{
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        const response = await fetch(`${URL}Mesa/actualizarEstado/${id}`, {
            method: 'PUT',
            headers: headers,
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
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        const res = await fetch(`${URL}PedidoProducto/pedidosProductos`);
        const data = await res.json();
        return data ;
    }catch(err)
    {
        console.error(err);
        throw err;
    }
}

const GetPedidosProductosCocinero = async (token) =>{
    try{
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        const res = await fetch(`${URL}PedidoProducto/pedidosProductosCocinero`,
        {
            method: 'GET',
            headers: headers
        });
        const data = await res.json();
        return data ;
    }catch(err)
    {
        console.error(err);
        throw err;
    }
}

const GetPedidosProductosBartender = async (token) =>{
    try{
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        const res = await fetch(`${URL}PedidoProducto/pedidosProductosBartender`,
        {
            method: 'GET',
            headers: headers
        });
        const data = await res.json();
        return data ;
    }catch(err)
    {
        console.error(err);
        throw err;
    }
}

const PasarProductoAPreparacion = async (producto, token)=>{
    try{
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        const res = await fetch(`${URL}PedidoProducto/ActualizarAPreparacion`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(producto)
        })
        return res;
    }catch(err)
    {
        console.error(err);
        throw err;
    }
}

const PasarProductoAServir = async (producto, token)=>{
    try{
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        const res = await fetch(`${URL}PedidoProducto/ActualizarAServir`, {
            method: 'PUT',
            headers: headers,
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
        return res.json();
    }catch(err)
    {
        console.error(err);
        throw err;
    }


};


const GetpedidosProductosParaServir = async (token) =>{
    try{
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        const res = await fetch(`${URL}PedidoProducto/pedidosProductosParaServir`,
        {
            method: 'GET',
            headers: headers
        });
        const data = await res.json();
        return data ;
    }catch(err)
    {
        console.error(err);
        throw err;
    }
}
export{
    getMesasVacias,
    getProductos,
    insertarPedidoProducto,
    getMesas,
    cambiarEstadoMesa, 
    GetPedidosProductos,
    PasarProductoAPreparacion,
    PasarProductoAServir,
    Login,
    GetPedidosProductosBartender,
    GetPedidosProductosCocinero,
    GetpedidosProductosParaServir
}
