const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const jwtSecret = 'change-this-secret-in-production';
const users = [];
const students = [];
const products = [];
let nextId = 1;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'demo-session-secret', resave: false, saveUninitialized: false }));

function logger(request, response, next) {
  console.log(new Date().toISOString(), request.method, request.originalUrl);
  next();
}

function validateBody(...fields) {
  return (request, response, next) => {
    const missing = fields.filter(field => request.body[field] === undefined || request.body[field] === '');
    if (missing.length) return response.status(400).json({ error: `Missing fields: ${missing.join(', ')}` });
    next();
  };
}

function requireLogin(request, response, next) {
  if (!request.session.user) return response.status(401).json({ error: 'Login required' });
  next();
}

function requireJwt(request, response, next) {
  try {
    const token = (request.headers.authorization || '').replace('Bearer ', '');
    request.authUser = jwt.verify(token, jwtSecret);
    next();
  } catch (error) {
    response.status(401).json({ error: 'Valid Bearer token required' });
  }
}

function requireRole(...roles) {
  return (request, response, next) => {
    const role = request.authUser?.role || request.headers['x-role'];
    if (!roles.includes(role)) return response.status(403).json({ error: 'Forbidden for this role' });
    next();
  };
}

function findRecord(collection, request, response) {
  const record = collection.find(item => item.id === Number(request.params.id));
  if (!record) response.status(404).json({ error: 'Record not found' });
  return record;
}

app.use(logger);

// Routing, route parameters, query parameters, modular-style resources, and 404 handling.
const apiRouter = express.Router();
apiRouter.get('/', (request, response) => response.json({ message: 'All-in-one Express API' }));
apiRouter.get('/route/:id', (request, response) => response.json({ id: request.params.id, query: request.query }));
apiRouter.get('/users', (request, response) => response.json(users));
apiRouter.get('/products', (request, response) => response.json(products));
apiRouter.get('/students', (request, response) => response.json(students));
app.use('/api', apiRouter);

// Middleware execution order: logger -> validator/auth middleware -> route -> error middleware.
app.post('/middleware/validate', validateBody('name'), (request, response) => response.json({ validated: request.body }));
app.get('/middleware/auth', requireJwt, (request, response) => response.json({ authenticated: request.authUser }));
app.get('/middleware/order', (request, response, next) => { console.log('1. route middleware'); next(); }, (request, response) => { console.log('2. route handler'); response.json({ order: ['logger', 'route middleware', 'route handler'] }); });

// Cookies and sessions: set, read, delete, login, logout, and protected session route.
app.get('/cookies/set', (request, response) => { response.cookie('theme', 'dark', { httpOnly: true }); response.json({ message: 'Cookie created' }); });
app.get('/cookies/read', (request, response) => response.json(request.cookies));
app.delete('/cookies/delete', (request, response) => { response.clearCookie('theme'); response.json({ message: 'Cookie deleted' }); });
app.post('/session/login', validateBody('username', 'password'), (request, response) => { request.session.user = { username: request.body.username, role: 'user' }; response.json({ message: 'Logged in', user: request.session.user }); });
app.post('/session/logout', (request, response) => request.session.destroy(() => response.json({ message: 'Logged out' })));
app.get('/session/protected', requireLogin, (request, response) => response.json({ message: 'Session-protected data' }));

// Database-style persistence with an in-memory collection and table-like CRUD operations.
function crudRoutes(name, collection) {
  app.get(`/db/${name}`, (request, response) => response.status(200).json(collection));
  app.post(`/db/${name}`, validateBody('name'), (request, response) => { const record = { id: nextId++, ...request.body }; collection.push(record); response.status(201).json(record); });
  app.put(`/db/${name}/:id`, validateBody('name'), (request, response) => { const record = findRecord(collection, request, response); if (!record) return; Object.assign(record, request.body); response.status(200).json(record); });
  app.delete(`/db/${name}/:id`, (request, response) => { const index = collection.findIndex(item => item.id === Number(request.params.id)); if (index < 0) return response.status(404).json({ error: 'Record not found' }); collection.splice(index, 1); response.status(204).end(); });
}
crudRoutes('students', students);
crudRoutes('users', users);
crudRoutes('products', products);

// Registration, password hashing and verification, login/logout, JWT, protected APIs.
app.post('/auth/register', validateBody('username', 'password'), async (request, response) => { if (users.some(user => user.username === request.body.username)) return response.status(409).json({ error: 'User exists' }); const user = { id: nextId++, username: request.body.username, password: await bcrypt.hash(request.body.password, 10), role: request.body.role === 'admin' ? 'admin' : 'user' }; users.push(user); response.status(201).json({ id: user.id, username: user.username, role: user.role }); });
app.post('/auth/login', validateBody('username', 'password'), async (request, response) => { const user = users.find(item => item.username === request.body.username); if (!user || !(await bcrypt.compare(request.body.password, user.password))) return response.status(401).json({ error: 'Invalid credentials' }); const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, jwtSecret, { expiresIn: '1h' }); request.session.user = { id: user.id, username: user.username, role: user.role }; response.json({ token, user: request.session.user }); });
app.post('/auth/logout', (request, response) => request.session.destroy(() => response.json({ message: 'Logged out' })));
app.get('/auth/profile', requireJwt, (request, response) => response.json(request.authUser));
app.get('/auth/protected', requireJwt, (request, response) => response.json({ message: 'Protected API route', user: request.authUser }));

// Role-based authorization with admin and user roles.
app.get('/roles/user', requireJwt, requireRole('user', 'admin'), (request, response) => response.json({ message: 'User and admin access granted' }));
app.get('/roles/admin', requireJwt, requireRole('admin'), (request, response) => response.json({ message: 'Admin access granted' }));

// RESTful API with GET, POST, PUT/PATCH, DELETE, status codes, validation, and errors.
app.get('/rest/products', (request, response) => response.status(200).json(products));
app.post('/rest/products', validateBody('name', 'price'), (request, response) => { if (typeof request.body.price !== 'number') return response.status(400).json({ error: 'price must be numeric' }); const product = { id: nextId++, ...request.body }; products.push(product); response.status(201).json(product); });
app.put('/rest/products/:id', requireJwt, requireRole('admin'), validateBody('name', 'price'), (request, response) => { const product = findRecord(products, request, response); if (!product) return; Object.assign(product, request.body); response.status(200).json(product); });
app.patch('/rest/products/:id', validateBody('name'), (request, response) => { const product = findRecord(products, request, response); if (!product) return; Object.assign(product, request.body); response.status(200).json(product); });
app.delete('/rest/products/:id', requireJwt, requireRole('admin'), (request, response) => { const index = products.findIndex(item => item.id === Number(request.params.id)); if (index < 0) return response.status(404).json({ error: 'Product not found' }); products.splice(index, 1); response.status(204).end(); });
app.get('/rest/students', (request, response) => response.status(200).json(students));
app.post('/rest/students', validateBody('name'), (request, response) => { const student = { id: nextId++, ...request.body }; students.push(student); response.status(201).json(student); });
app.get('/rest/users', requireJwt, requireRole('admin'), (request, response) => response.status(200).json(users.map(({ password, ...user }) => user)));

app.use((request, response) => response.status(404).json({ error: 'Route not found' }));
app.use((error, request, response, next) => { console.error(error); response.status(500).json({ error: 'Internal server error' }); });

app.listen(port, () => console.log(`All-in-one backend running at http://localhost:${port}`));
