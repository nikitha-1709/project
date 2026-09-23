const express = require('express');
const app = express();
app.use(express.json());
app.get('/users', (request, response) => response.json([{name:'Alex'}]));
app.post('/users', (request, response) => response.status(201).json({created:request.body}));
app.listen(3000, () => console.log('GET/POST server on port 3000'));