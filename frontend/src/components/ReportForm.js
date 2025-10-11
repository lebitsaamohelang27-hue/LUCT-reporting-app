import React, { useEffect, useState } from 'react';

function ReportForm() {
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    class_id: '',
    week: '',
    lecture_date: '',
    topic_taught: '',
    learning_outcomes: '',
    recommendations: '',
    actual_students_present: ''
  });

  // Backend URL
  const API_URL = 'http://localhost:5000/api/reports';

  // Fetch all reports
  const fetchReports = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setFormData({
          class_id: '',
          week: '',
          lecture_date: '',
          topic_taught: '',
          learning_outcomes: '',
          recommendations: '',
          actual_students_present: ''
        });
        fetchReports();
      })
      .catch(err => console.error(err));
  };

  // Handle delete
  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        fetchReports();
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Reports</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="class_id"
          placeholder="Class ID"
          value={formData.class_id}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="week"
          placeholder="Week"
          value={formData.week}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="lecture_date"
          placeholder="Lecture Date"
          value={formData.lecture_date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="topic_taught"
          placeholder="Topic Taught"
          value={formData.topic_taught}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="learning_outcomes"
          placeholder="Learning Outcomes"
          value={formData.learning_outcomes}
          onChange={handleChange}
        />
        <input
          type="text"
          name="recommendations"
          placeholder="Recommendations"
          value={formData.recommendations}
          onChange={handleChange}
        />
        <input
          type="number"
          name="actual_students_present"
          placeholder="Actual Students Present"
          value={formData.actual_students_present}
          onChange={handleChange}
        />
        <button type="submit">Add Report</button>
      </form>

      <hr />

      <ul>
        {reports.map(report => (
          <li key={report.id}>
            <strong>{report.class_name}</strong> - Week {report.week}: {report.topic_taught}
            <button onClick={() => handleDelete(report.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReportForm;
