const http = require('http');
const app = require('./app');//importing app object
const port = 3000;

const server = http.createServer(app);//passing app object to function

server.listen(port, '127.0.0.1', ()=>{
    console.log(`server running at ${port} port`);
})