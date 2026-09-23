const http = require('http');
const server = http.createServer((request, response) => { response.end('Client connected to Node.js server'); });
server.listen(3000, () => console.log('Server: http://localhost:3000'));