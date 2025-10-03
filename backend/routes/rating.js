const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all ratings
router.get('/', (req, res) => {
    const sql = `
        SELECT r.*, u.username AS student_name, c.name AS class_name
        FROM ratings r
        LEFT JOIN users u ON r.user_id = u.id
        LEFT JOIN classes c ON r.class_id = c.id
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add rating
router.post('/', (req, res) => {
    const { user_id, class_id, rating, comments } = req.body;
    db.query(
        'INSERT INTO ratings (user_id, class_id, rating, comments) VALUES (?, ?, ?, ?)',
        [user_id, class_id, rating, comments],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Rating added', ratingId: result.insertId });
        }
    );
});

module.exports = router;
