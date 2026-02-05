const express = require("express");
const router = express.Router();
const db = require("../config/db"); // your mysql connection

// GET ALL USERS
router.get("/", (req, res) => {
  const sql = "SELECT id, name, email, role, LOWER(status) as status, created_at FROM users ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// GET USER BY ID
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT id, name, email, role, status, created_at FROM users WHERE id = ?";

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(results[0]);
  });
});

// CREATE USER
router.post("/", (req, res) => {
  const { name, email, role, status = 'active' } = req.body;
  
  // Generate temporary password
  const temporaryPassword = Math.random().toString(36).slice(-8);
  
  const sql = "INSERT INTO users (name, email, role, status, password, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
  
  db.query(sql, [name, email, role, status, temporaryPassword], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    
    res.status(201).json({
      id: results.insertId,
      name,
      email,
      role,
      status,
      temporaryPassword,
      message: "User created successfully"
    });
  });
});

// UPDATE USER
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email, role, status } = req.body;
  
  const sql = "UPDATE users SET name = ?, email = ?, role = ?, status = ? WHERE id = ?";
  
  db.query(sql, [name, email, role, status, userId], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  });
});

// DELETE USER
router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";
  
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  });
});

module.exports = router;
