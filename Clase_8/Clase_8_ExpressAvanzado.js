const express = require('express');
const fs = require("fs");
const app = express()
const PORT=8080
// Generador de Id.
const { v4: uuidv4 } = require('uuid');
let listaProductos = [];

app.use(express.json());
const server=app.listen(PORT,()=>{
    console.log("Servidor", server.address().port)
})

server.on('error',error=>(console.log("Error en Servidor", error)))
//Devuelve mensaje de bienvenida.
app.get("/",(req,res)=>{
    res.send('<h1 style="color:blue"> Bienvenidos al Servidor Express </h1>');
})
// Devuelve array de productos.
app.get("/api/productos/listar",(req,res)=>{
    try{
        res.send(req.body);
    } catch (e){
       res.json({msg: "error: 'producto no encontrado'"});
    }
})
//Devuelve producto listado por su id.
app.get("/api/productos/listar/:id",(req,res)=>{
    const { id } = req.params
    const producto = listaProductos.find((producto) => producto.id == id)
    try{
        res.json(producto);
    } catch (e){
       res.json({msg: "error: 'producto no encontrado'"});
    }
});
//Almacena producto y devuelve el mismo.
app.post("/api/productos/guardar",(req,res)=>{
    try {
        const newProducto = {
            id: uuidv4(),
            ...req.body,
        }
        listaProductos.push(newProducto);
        res.status(201).json(listaProductos);
    } catch (error) {
        res.status(404).json({msg: "error: 'No se agrego el producto a la lista'"});
    }
});