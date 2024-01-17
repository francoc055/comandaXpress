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
    fetch(URL + 'PedidoProducto/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedidoProducto)
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return response.status;
        // return response.json(); // Puedes devolver la respuesta del servidor si es relevante
      })

}

export{
    getMesasVacias,
    getProductos,
    insertarPedidoProducto,
    getMesas
}
