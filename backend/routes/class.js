const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all classes
router.get('/', (req, res) => {
    const sql = `
        SELECT cl.*, c.name AS course_name
        FROM classes cl
        LEFT JOIN courses c ON cl.course_id = c.id
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get class by ID
router.get('/:id', (req, res) => {
    const classId = req.params.id;
    db.query('SELECT * FROM classes WHERE id=?', [classId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Class not found' });
        res.json(results[0]);
    });
});

// Add a class
router.post('/', (req, res) => {
    const { name, course_id, venue, scheduled_time } = req.body;
    db.query(
        'INSERT INTO classes (name, course_id, venue, scheduled_time) VALUES (?, ?, ?, ?)',
        [name, course_id, venue, scheduled_time],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Class added', classId: result.insertId });
        }
    );
});

// Update a class
router.put('/:id', (req, res) => {
    const classId = req.params.id;
    const { name, course_id, venue, scheduled_time } = req.body;
    db.query(
        'UPDATE classes SET name=?, course_id=?, venue=?, scheduled_time=? WHERE id=?',
        [name, course_id, venue, scheduled_time, classId],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Class updated' });
        }
    );
});

// Delete a class
router.delete('/:id', (req, res) => {
    const classId = req.params.id;
    db.query('DELETE FROM classes WHERE id=?', [classId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Class deleted' });
    });
});

module.exports = router;
