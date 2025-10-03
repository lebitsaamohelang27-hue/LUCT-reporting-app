const express = require('express');
const router = express.Router();
const db = require('../database');

// Search courses by name or code
router.get('/courses', (req, res) => {
    const { q } = req.query;
    db.query(
        'SELECT * FROM courses WHERE name LIKE ? OR code LIKE ?',
        [`%${q}%`, `%${q}%`],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
});

// Search classes by name
router.get('/classes', (req, res) => {
    const { q } = req.query;
    db.query(
        'SELECT * FROM classes WHERE name LIKE ?',
        [`%${q}%`],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        }
    );
});

module.exports = router;
