let http = require('http');
let server = http.createServer(funtion(peticion, respuesta){
    respuesta.end('hola');
});
server.listen(3000, function() {
    console.log('tu servidor esta listo en' + this.address)
})