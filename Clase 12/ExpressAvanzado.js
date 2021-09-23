const express = require('express');
const handlebars = require('express-handlebars');
const fs = require("fs");
const app = express();
const PORT=8000;
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Generador de Id.
const { v4: uuidv4 } = require('uuid');

// Declaracion de ruta api
const api=express.Router()
app.use("/api",api)

// Declaracion de ruta Static
app.use(express.static("./public"))

// productos array
let listaProductos = [];

// lectura JSON de api
api.use(express.json());
api.use(express.urlencoded({extended: true}));

http.listen(PORT, ()=>{
    console.log(`Puerto ${PORT} escuchando..`)
})

app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'pug'); // registra el motor de plantillas

//Rutas

//Pantalla principal.
io.on("connection", (socket =>{
    console.log("Usuario conectado")
    socket.emit("items", listaProductos)
    socket.on("item", (dato) =>{
        productos.push(dato)
        io.socket.emit("items", listaProductos)
    })
}))

// Devuelve la lista de productos
app.get("/productos/vista",(req,res)=>{
    if (listaProductos.length==0) {
        res.render('lista.pug', { item: "No hay productos" ,active:false});
    }else{
        res.render('lista.pug', { item: listaProductos,active:true});
    }
    
})

api.get("/productos/listar/:id",(req,res)=>{
    const { id } = req.params
    const producto = listaProductos.find((producto) => producto.id == id)
    try{
        res.json(producto);
    } catch (e){
       res.json({msg: "error: 'producto no encontrado'"});
    }
});
//Almacena producto y devuelve el mismo.
api.post("/productos/guardar",(req,res)=>{
    try {
        const newProducto = {
            id: uuidv4(),
            ...req.body,
        }
        listaProductos.push(newProducto);
        // res.status(201).json(listaProductos)
        res.redirect("/");
    } catch (error) {
        res.status(404).json({msg: "error: 'No se agrego el producto a la lista'"});
    }
});
//Actualiza producto y lo devuelve.
api.put("/productos/actualizar/:id", (req,res)=>{
    const { id } =  req.params;
    const { title, price, thumbnail } = req.body;
    const producto = listaProductos.find((producto) => producto.id == id);
    if (!producto) {
        return res.status(404).json({msg: "Usuario encontrado"});
    }
    (producto.title = title), (producto.price = price), (producto.thumbnail = thumbnail);

    rest.status(200).json(producto);
})
//Borra producto y devuelve el mismo.
api.delete("/productos/borrar/:id", (req, res) => {
    const { id } = req.params;
    const producto = listaProductos.find((producto) => producto.id == id);
  
    if (!producto) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
  
    const index = productos.findIndex((producto) => producto.id == id);
    listaProductos.splice(index, 1);
  
    res.status(200).end(); 
  });