const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all courses
router.get('/', (req, res) => {
    db.query('SELECT * FROM courses', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get course by ID
router.get('/:id', (req, res) => {
    const courseId = req.params.id;
    db.query('SELECT * FROM courses WHERE id = ?', [courseId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Course not found' });
        res.json(results[0]);
    });
});

// Add a new course
router.post('/', (req, res) => {
    const { name, code, stream, assigned_lecturer_id } = req.body;
    db.query(
        'INSERT INTO courses (name, code, stream, assigned_lecturer_id) VALUES (?, ?, ?, ?)',
        [name, code, stream, assigned_lecturer_id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Course added', courseId: result.insertId });
        }
    );
});

// Update a course
router.put('/:id', (req, res) => {
    const courseId = req.params.id;
    const { name, code, stream, assigned_lecturer_id } = req.body;
    db.query(
        'UPDATE courses SET name=?, code=?, stream=?, assigned_lecturer_id=? WHERE id=?',
        [name, code, stream, assigned_lecturer_id, courseId],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Course updated' });
        }
    );
});

// Delete a course
router.delete('/:id', (req, res) => {
    const courseId = req.params.id;
    db.query('DELETE FROM courses WHERE id=?', [courseId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Course deleted' });
    });
});

module.exports = router;
