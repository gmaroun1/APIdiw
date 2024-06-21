const jsonServer = require('json-server')
const server = jsonServer.create()
const cors = require('cors');

// Para permitir que os dados sejam alterados, altere a linha abaixo
// colocando o atributo readOnly como false.
const middlewares = jsonServer.defaults()

server.use(cors())
server.use(middlewares)

const router1 = jsonServer.router('./db/db.json');
const router2 = jsonServer.router('./db/pessoas.json');


server.use('/db', router1);
server.use('/pessoas', router2);

server.listen(3000, () => {
  console.log('JSON Server is running em http://localhost:3000')
})