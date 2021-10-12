const express = require("express");
const handlebars = require("express-handlebars");
const methodOverride = require('method-override');

//MessagesDB
const msgOptions = require('./options/sqlite3');
const msgKnex = require('knex')(msgOptions);

//ProductsDB
const prodsOptions = require('./options/mariaDB');
const prodsKnex = require('knex')(prodsOptions);

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const routerAPI = express.Router();
const PORT = 8080; //+
// middleware
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
        partialsDir: __dirname + "/views/partials",
    })
);
app.set("views", "./views");
app.set("view engine", "hbs");
app.get('/', (_, res) => res.redirect('/productos'));

// Ruta base para uso de HANDLEBARS
app.get('/productos', (req, res) => {
    prodsKnex.select('*').from('products').orderBy('idproducts', 'asc')
        .then(products => {
            if (products.length) {
                res.render('index', { ok: true, updateForm: false, error: null, products: products })
            } else {
                res.render('index', { ok: false, error: 'No hay products cargados', productos: [] })
            }
        })
        .catch(e => {
            console.log('Error getting products: ', e);
            prodsKnex.destroy();
        });
});

app.post('/agregar', (req, res) => {
    prodsKnex('products').insert(req.body)
        .then(() => {
            console.log('producto insertado');
            res.redirect('/productos')
        })
        .catch(e => {
            console.log('Error en Insert producto: ', e);
            prodsKnex.destroy;
        });
});

app.get('/productos/editar/:idprod', (req, res) => {

    let id = req.params.idprod;

    prodsKnex('products').first().where({ idproducts: id })
        .then(product => {
            res.render('index', { product: product, updateForm: true, viewTitle: "Editar producto", errorMessage: "No hay productos." })
        })
        .catch(e => {
            console.log('Error getting products: ', e);
            prodsKnex.destroy();
        });
});

app.put('/productos/ed/:idprod', (req, res) => {
    let id = req.params.idprod;
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
    prodsKnex('products').del().where({ idproducts: id })
        .then(prod => {
            console.log('producto eliminado: ', prod);
            res.redirect('/productos');
        })
        .catch(e => {
            console.log('Error en Delete producto: ', e);
            prodsKnex.destroy;
        });
});

io.on('connection', (socket) => {
    console.log('Someone is connected');

    // funcion para leer todos los mensajes de la db y mostrarlos.
    function selectAllMessages() {
        msgKnex.select('*').from('messages').orderBy('date', 'desc')
            .then(messages => {
                socket.emit('messages', { messages: messages });
            })
            .catch(e => {
                console.log('Error getting messages: ', e);
                msgKnex.destroy();
            });
    }

    //Llamo a la funcion para que se muestren los mensajes al levantar el servidor.
    selectAllMessages();

    prodsKnex.select('*').from('products').orderBy('idproducts', 'asc')
        .then(products => {
            socket.emit('productCatalog', { products: products, updateForm: false, viewTitle: "Listado de productos", errorMessage: "No hay productos." });
        })
        .catch(e => {
            console.log('Error getting products: ', e);
            prodsKnex.destroy();
        });

    //Inserto un nuevo mensaje en la base de datos de mensajes.
    socket.on('newMsg', newMsg => {
        msgKnex('messages').insert(newMsg)
            .then(() => {
                console.log('Mensaje insertado');
                selectAllMessages();
                return false;
            })
            .catch(e => {
                console.log('Error en Insert message: ', e);
                msgKnex.destroy;
            });
    });
});