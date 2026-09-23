const express = require('express'); const app = express(); app.use(express.json());
function requireRole(...roles){return (request,response,next)=>{const role=request.headers['x-role'];if(!roles.includes(role))return response.status(403).json({error:'Forbidden'});request.user={role};next()}}
app.get('/user-area',requireRole('user','admin'),(request,response)=>response.json({message:'User area',role:request.user.role}));
app.get('/admin-area',requireRole('admin'),(request,response)=>response.json({message:'Admin area'}));
app.listen(3000,()=>console.log('Authorization server on port 3000'));