const express = require('express');
const router = express.Router();
const db = require('../../db/database');
const inputCheck = require('../../utils/inputCheck');

// get all employees and roles
router.get('/employees', (req, res) => {
  const sql =  `SELECT employees.*, role.name 
                AS role_name 
                FROM employees 
                LEFT JOIN role 
                ON employees.role_id = roles.id`;
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: rows
    });
  });
});

// get employee and role
router.get('/employees/:id', (req, res) => {
  const sql = `SELECT employees.*, role.name 
               AS role_name 
               FROM employees 
               LEFT JOIN role 
               ON employees.role_id = roles.id 
               WHERE employees.id = ?`;
  const params = [req.params.id];
  db.get(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: rows
    });
  });
});

// create employee
router.post('/employees', ({ body }, res) => {
   const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql =  `INSERT INTO candidates (first_name, last_name, industry_connected, party_id) 
                VALUES (?,?,?,?)`;
  const params = [body.first_name, body.last_name, body.industry_connected, body.party_id];
  // function,not arrow, to use this
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: body,
      id: this.lastID
    });
  });
});

// Update a candidate's party
router.put('/candidate/:id', (req, res) => {
  // Data validation 
  const errors = inputCheck(req.body, 'party_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `UPDATE candidates SET party_id = ? WHERE id = ?`;
  const params = [req.body.party_id, req.params.id];
  // function,not arrow, to use this
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: req.body,
      changes: this.changes
    });
  });
});

// Delete a candidate
router.delete('/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`
  db.run(sql, req.params.id, function(err, result) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }

    res.json({ message: 'deleted', changes: this.changes, deleted: result });
  });
});

module.exports = router;
