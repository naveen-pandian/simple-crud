const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Naveen@29',
  database: 'crud'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Define CRUD routes here

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Create a new item
app.post('/api/items', (req, res) => {
    const { name, description } = req.body;
    const insertQuery = `INSERT INTO items (name, description) VALUES (?, ?)`;
    db.query(insertQuery, [name, description], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  
  // Fetch all items
  app.get('/api/items', (req, res) => {
    db.query('SELECT * FROM items', (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  
  // Update an item
  app.put('/api/items/:id', (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    const updateQuery = `UPDATE items SET name = ?, description = ? WHERE id = ?`;
    db.query(updateQuery, [name, description, id], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  
  // Delete an item
  app.delete('/api/items/:id', (req, res) => {
    const id = req.params.id;
    const deleteQuery = `DELETE FROM items WHERE id = ?`;
    db.query(deleteQuery, [id], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  
// Fetch a single item by ID
app.get('/api/items/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM items WHERE id = ?', [id], (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    });
  });
  