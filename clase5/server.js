const http = require('http');
const randomNumber = require('./util.js');


const server = http.createServer((req,res) => {
  const entero1a100= randomNumber(1,100);
  const respuesta = {
    id: entero1a100,
    title: `Producto ${entero1a100}`,
    price: randomNumber(0,9999,2),
    thumbnail: `Foto ${entero1a100}`
  }
  res.end(JSON.stringify(respuesta));
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`escuchando en port ${PORT}`)
})



