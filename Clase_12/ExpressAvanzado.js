const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const routerAPI = express.Router();
const PORT = 8000; //+
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

//listado de productos
let productCatalog = [
    {
        id: 1,
        title: "Guia para ser chofer",
        price: 7000,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/online-learning-vol-1-2/64/Video_Lession-256.png"
    },
    {
        id: 2,
        title: "Clase de manejo",
        price: 3000,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/LUMINA/accounting/png/256/bus.png"
    },
    {
        id: 3,
        title: "Hoja de vida",
        price: 1000,
        thumbnail: "https://cdn0.iconfinder.com/data/icons/job-seeker/256/cv_job_seeker_employee_unemployee_work-256.png"
    }
];

// Ruta base para uso de HANDLEBARS
app.get('/productos', (req, res) => {
    if (productCatalog.length) {
        res.render('index', { ok: true, error: null, products: productCatalog })
    } else {
        res.render('index', { ok: false, error: 'No hay products cargados', productos: [] })
    }
})

io.on('connection', (socket) => {
    console.log('Someone is connected');
    socket.emit('productCatalog', { products: productCatalog, viewTitle: "Listado de productos", errorMessage: "No hay productos." });
    socket.on('newProduct', (data) => {
        console.log(data);
        productCatalog.push({ id: productCatalog.length + 1, ...data });
        console.log(productCatalog);
        io.sockets.emit('productCatalog', { products: productCatalog, viewTitle: "Listado de productos", errorMessage: "No hay productos." });
    });
});
