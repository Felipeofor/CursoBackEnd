const express = require("express");
const handlebars = require("express-handlebars");
const methodOverride = require('method-override');
const mongoose = require("mongoose");

const Message = require("./db/Message");
const Product = require("./db//Product");


const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const routerAPI = express.Router();
const PORT = 8080; //

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static("./public"));
app.use("/api", routerAPI);
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
server.on("error", (error) => console.log("Server Error\n\t", error));

// handlebars engine
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views",
    })
);
app.set("views", "./views");
app.set("view engine", "hbs");
app.get('/', (_, res) => res.redirect('/productos'));

//Mongoose
connect()

function connect() {
    const URI = 'mongodb://localhost:27017/ecommerce';
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 1000
    })
        .then(() => console.log('Conectado a la base de datos...'))
        .catch(error => console.log('Error al conectarse a la base de datos', error));
}

// Ruta base para uso de HANDLEBARS
app.get('/productos', (req, res) => {
    Product.find().sort({ '_id': 1 })
        .then(products => {
            if (products.length) {
                res.render('index', { ok: true, updateForm: false, error: null, products: products })
            } else {
                res.render('index', { ok: false, error: 'No hay products cargados', productos: [] })
            }
        })
        .catch(e => {
            console.log('Error getting products: ', e);
        })
});

app.post('/productos/agregar', (req, res) => {
    Product.create(req.body)
        .then(() => {
            console.log('producto insertado');
            res.redirect('/productos')
        })
        .catch(e => {
            console.log('Error en Insert producto: ', e);
        });
});

app.get("/productos/editar/:_id", (req, res) => {

    let prodID = req.params._id;

    console.log(req.params._id);

    Product.findById(prodID)
        .then(product => {
            res.render('index', { product: product, updateForm: true, viewTitle: "Editar producto", errorMessage: "No hay productos." })
        })
        .catch(e => {
            console.log('Error getting products: ', e);
        });
});

app.put('/productos/ed/:_id', (req, res) => {
    let id = req.params._id;
    console.log(req.body);
    prodsKnex('products').update(req.body).where({ idproducts: id })
        .then(prod => {
            console.log('producto actualizado: ', prod);
            res.redirect('/productos');
        })
        .catch(e => {
            console.log('Error en Update producto: ', e);
            prodsKnex.destroy;
        });
});

app.delete('/productos/borrar/:idprod', (req, res) => {
    let id = req.params.idprod;
    Product.findByIdAndDelete(id)
        .then(prod => {
            console.log('producto eliminado: ', prod);
            res.redirect('/productos');
        })
        .catch(e => {
            console.log('Error en Delete producto: ', e);
        });
});

io.on('connection', (socket) => {
    console.log('Someone is connected');

    //     //funcion para leer todos los mensajes de la db y mostrarlos.
    //     function selectAllMessages() {
    //         msgKnex.select('*').from('messages').orderBy('date', 'desc')
    //             .then(messages => {
    //                 socket.emit('messages', { messages: messages });
    //             })
    //             .catch(e => {
    //                 console.log('Error getting messages: ', e);
    //                 msgKnex.destroy();
    //             });
    //     }

    //     //Llamo a la funcion para que se muestren los mensajes al levantar el servidor.
    //     selectAllMessages();

    Product.find().sort({ '_id': 1 })
        .then(products => {
            socket.emit('productCatalog', { products: products, updateForm: false, viewTitle: "Listado de productos", errorMessage: "No hay productos." });
        })
        .catch(e => {
            console.log('Error getting products: ', e);
        });

    //     //Inserto un nuevo mensaje en la base de datos de mensajes.
    //     socket.on('newMsg', newMsg => {
    //         msgKnex('messages').insert(newMsg)
    //             .then(() => {
    //                 console.log('Mensaje insertado');
    //                 selectAllMessages();
    //                 return false;
    //             })
    //             .catch(e => {
    //                 console.log('Error en Insert message: ', e);
    //                 msgKnex.destroy;
    //             });
    //     });
});