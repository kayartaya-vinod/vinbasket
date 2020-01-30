const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const fs = require('fs');
let data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
data = JSON.parse(data);
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 80;

server.use(middlewares);
server.use(router);

server.listen(port, ()=>{
    console.warn('VINOD:: deployed on port', port);
});
