const http = require('http')

const server = http.createServer((req, res) =>{
  res.end("Hola soy un servidor Http desde Node.js")
})

const numeroAleatorio = function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

const objeto = {
  id : numeroAleatorio,
  title: "Producto" + numeroAleatorio,
  price: numeroAleatorio,
  thumbnail: "Foto" + numeroAleatorio
};
objeto.JSON.stringify();

const PORT = process.env.PORT || 8000

server.listen(PORT, () => {
  console.log(`Servidor Http escuchando en el puerto ${PORT}`);
})