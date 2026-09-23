const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express(); app.use(express.json()); app.use(cookieParser());
app.use(session({secret:'demo-secret',resave:false,saveUninitialized:false,cookie:{maxAge:3600000}}));
app.get('/cookie/set', (request, response) => { response.cookie('theme','dark'); response.send('Cookie created'); });
app.get('/cookie/read', (request, response) => response.json(request.cookies));
app.delete('/cookie/delete', (request, response) => { response.clearCookie('theme'); response.send('Cookie deleted'); });
app.post('/login', (request, response) => { request.session.user={name:request.body.name||'Student'}; response.json({loggedIn:true,user:request.session.user}); });
app.post('/logout', (request, response) => request.session.destroy(() => response.send('Logged out')));
function sessionAuth(request, response, next) { if (!request.session.user) return response.status(401).send('Login required'); next(); }
app.get('/protected', sessionAuth, (request, response) => response.json({secret:'Session protected data'}));
app.listen(3000, () => console.log('Cookie/session server on port 3000'));