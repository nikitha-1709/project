const express = require('express');
const app = express();
app.get('/html', (request, response) => response.send('<h1>HTML response</h1>'));
app.get('/json', (request, response) => response.json({message:'JSON response'}));
app.listen(3000, () => console.log('Response server on port 3000'));