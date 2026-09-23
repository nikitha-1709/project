const express = require('express');
const app = express();
function logger(request, response, next) { console.log(new Date().toISOString(), request.method, request.url); next(); }
function validate(request, response, next) { if (!request.body.name) return response.status(400).json({error:'name is required'}); next(); }
function authenticate(request, response, next) { if (request.headers.authorization !== 'Bearer demo-token') return response.status(401).json({error:'Unauthorized'}); next(); }
function errorHandler(error, request, response, next) { console.error(error); response.status(500).json({error:'Server error'}); }
app.use(express.json()); app.use(logger);
app.post('/validated', validate, (request, response) => response.json(request.body));
app.get('/protected', authenticate, (request, response) => response.json({message:'Protected data'}));
app.get('/order', (request, response, next) => { console.log('route middleware'); next(); }, (request, response) => response.send('Middleware order complete'));
app.use(errorHandler); app.listen(3000, () => console.log('Middleware server on port 3000'));