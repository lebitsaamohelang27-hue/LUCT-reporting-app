const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all reports
router.get('/', (req, res) => {
    const sql = `
        SELECT r.*, cl.name AS class_name
        FROM reports r
        LEFT JOIN classes cl ON r.class_id = cl.id
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a report
router.post('/', (req, res) => {
    const { class_id, week, lecture_date, topic_taught, learning_outcomes, recommendations, actual_students_present } = req.body;
    db.query(
        'INSERT INTO reports (class_id, week, lecture_date, topic_taught, learning_outcomes, recommendations, actual_students_present) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [class_id, week, lecture_date, topic_taught, learning_outcomes, recommendations, actual_students_present],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Report added', reportId: result.insertId });
        }
    );
});

// Update report
router.put('/:id', (req, res) => {
    const reportId = req.params.id;
    const { topic_taught, learning_outcomes, recommendations, actual_students_present } = req.body;
    db.query(
        'UPDATE reports SET topic_taught=?, learning_outcomes=?, recommendations=?, actual_students_present=? WHERE id=?',
        [topic_taught, learning_outcomes, recommendations, actual_students_present, reportId],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Report updated' });
        }
    );
});

// Delete report
router.delete('/:id', (req, res) => {
    const reportId = req.params.id;
    db.query('DELETE FROM reports WHERE id=?', [reportId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Report deleted' });
    });
});

module.exports = router;
