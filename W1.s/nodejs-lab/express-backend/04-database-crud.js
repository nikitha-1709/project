const express = require('express');
const Database = require('better-sqlite3');
const app = express(); app.use(express.json());
const database = new Database('students.db'); database.exec('CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, mark INTEGER NOT NULL)');
app.get('/students', (request, response) => response.json(database.prepare('SELECT * FROM students').all()));
app.post('/students', (request, response) => { const {name,mark}=request.body; if (!name || mark === undefined) return response.status(400).json({error:'name and mark required'}); const result=database.prepare('INSERT INTO students (name,mark) VALUES (?,?)').run(name,mark); response.status(201).json({id:result.lastInsertRowid,name,mark}); });
app.put('/students/:id', (request, response) => { const result=database.prepare('UPDATE students SET name=?, mark=? WHERE id=?').run(request.body.name,request.body.mark,request.params.id); response.json({updated:result.changes}); });
app.delete('/students/:id', (request, response) => { const result=database.prepare('DELETE FROM students WHERE id=?').run(request.params.id); response.json({deleted:result.changes}); });
app.listen(3000, () => console.log('SQLite CRUD server on port 3000'));