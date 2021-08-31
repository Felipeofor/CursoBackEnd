import express from 'express';

const app = express();

const puerto = 8080

const server =  app.listen(puerto, () => {
    console.log(`Servidor inicializado en puerto ${server.adress().port}`)
})