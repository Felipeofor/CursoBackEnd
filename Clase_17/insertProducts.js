const prodsOptions = require('./options/mariaDB');
const prodsKnex = require('knex')(prodsOptions);

const products = [
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

prodsKnex('products').insert(products)
    .then(() => console.log("Productos agregados"))
    .catch(e => {
        console.log(e)
        prodsKnex.destroy();
    });