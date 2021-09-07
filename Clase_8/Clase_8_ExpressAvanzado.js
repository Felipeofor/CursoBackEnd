const express = require('express');
const fs = require("fs");
const app = express()
const PORT=8080
// Generador de Id
const { v4: uuidv4 } = require('uuid');
let idUnico = uuidv4();

app.use(express.json());

const server=app.listen(PORT,()=>{
    console.log("Servidor", server.address().port)
})
server.on('error',error=>(console.log("Error en Servidor", error)))

app.get("/",(req,res)=>{
    res.send('<h1 style="color:blue"> Bienvenidos al Servidor Express </h1>');
})

app.get("/api/productos/listar",(req,res)=>{
    try{
        res.send(req.body);
    } catch (e){
       res.json({msg: "error: 'producto no encontrado'"});
    }
})

app.get("/api/productos/listar/:id",(req,res)=>{
    try{
        res.send(req.body.idUnico);
    } catch (e){
       res.json({msg: "error: 'producto no encontrado'"});
    }
})

app.post("/api/productos/guardar",(req,res)=>{
    const newProducto = {
        id : idUnico,
        ...req.body.producto,
    }
    req.body.push(newProducto);
    res.status(201).json(newProducto)
})