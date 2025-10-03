import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';

const ReportForm = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [reports, setReports] = useState([]);
  const [showDownloadSection, setShowDownloadSection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    faculty_name: "FICT",
    class_id: "",
    week_of_reporting: "",
    date_of_lecture: "",
    course_name: "",
    course_code: "",
    lecturer_name: "",
    actual_students_present: "",
    total_students: "",
    venue: "",
    scheduled_time: "",
    topic_taught: "",
    learning_outcomes: "",
    recommendations: ""
  });

  useEffect(() => {
    fetchClasses();
    fetchMyReports();
  }, []);

  const fetchClasses = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockClasses = [
        {
          class_id: 1,
          class_name: "BIT Year 2 - Group A",
          course_name: "Web Application Development",
          course_code: "DIWA2110",
          students_assigned: 45,
          venue: "Lab 301",
          schedule_time: "Mon 10:00-12:00"
        },
        {
          class_id: 2,
          class_name: "BIT Year 3 - Group B",
          course_name: "Advanced Web Technologies",
          course_code: "AWT3101",
          students_assigned: 38,
          venue: "Lab 302",
          schedule_time: "Wed 14:00-16:00"
        }
      ];
      setClasses(mockClasses);
    } catch (err) {
      console.error('Error fetching classes:', err);
    }
  };

  const fetchMyReports = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockReports = [
        {
          id: 1,
          class_name: "BIT Year 2 - Group A",
          course_name: "Web Application Development",
          course_code: "DIWA2110",
          week_of_reporting: 1,
          date_of_lecture: "2024-01-15",
          topic_taught: "Introduction to React JS",
          actual_students_present: 42,
          total_students: 45,
          venue: "Lab 301",
          scheduled_time: "10:00",
          learning_outcomes: "Students understood basic React concepts",
          recommendations: "Need more practice with components",
          created_at: "2024-01-15T10:00:00Z"
        }
      ];
      setReports(mockReports);
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-fill course details when class is selected
    if (name === 'class_id') {
      const selectedClass = classes.find(cls => cls.class_id == value);
      if (selectedClass) {
        setForm(prev => ({
          ...prev,
          course_name: selectedClass.course_name,
          course_code: selectedClass.course_code,
          total_students: selectedClass.students_assigned,
          venue: selectedClass.venue
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock submission
      const newReport = {
        id: reports.length + 1,
        ...form,
        created_at: new Date().toISOString()
      };
      
      setReports(prev => [newReport, ...prev]);
      alert("Report Submitted Successfully!");
      
      // Reset form
      setForm({
        faculty_name: "FICT",
        class_id: "",
        week_of_reporting: "",
        date_of_lecture: "",
        course_name: "",
        course_code: "",
        lecturer_name: "",
        actual_students_present: "",
        total_students: "",
        venue: "",
        scheduled_time: "",
        topic_taught: "",
        learning_outcomes: "",
        recommendations: ""
      });
      
    } catch (error) {
      alert("Failed to submit report!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = () => {
    if (reports.length === 0) {
      alert("No reports available to download");
      return;
    }

    const excelData = reports.map(report => ({
      'Faculty Name': report.faculty_name,
      'Class Name': report.class_name,
      'Week of Reporting': report.week_of_reporting,
      'Date of Lecture': report.date_of_lecture,
      'Course Name': report.course_name,
      'Course Code': report.course_code,
      'Lecturer Name': report.lecturer_name,
      'Students Present': report.actual_students_present,
      'Total Students': report.total_students,
      'Attendance Rate': `${Math.round((report.actual_students_present / report.total_students) * 100)}%`,
      'Venue': report.venue,
      'Scheduled Time': report.scheduled_time,
      'Topic Taught': report.topic_taught,
      'Learning Outcomes': report.learning_outcomes,
      'Recommendations': report.recommendations,
      'Submission Date': new Date(report.created_at).toLocaleDateString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lecture Reports");
    
    const fileName = `lecture_reports_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const downloadSingleReport = (report) => {
    const excelData = [{
      'Faculty Name': report.faculty_name,
      'Class Name': report.class_name,
      'Week of Reporting': report.week_of_reporting,
      'Date of Lecture': report.date_of_lecture,
      'Course Name': report.course_name,
      'Course Code': report.course_code,
      'Lecturer Name': report.lecturer_name,
      'Students Present': report.actual_students_present,
      'Total Students': report.total_students,
      'Attendance Rate': `${Math.round((report.actual_students_present / report.total_students) * 100)}%`,
      'Venue': report.venue,
      'Scheduled Time': report.scheduled_time,
      'Topic Taught': report.topic_taught,
      'Learning Outcomes': report.learning_outcomes,
      'Recommendations': report.recommendations,
      'Submission Date': new Date(report.created_at).toLocaleDateString()
    }];

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lecture Report");
    
    const fileName = `report_${report.course_code}_week_${report.week_of_reporting}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const fields = [
    { name: 'faculty_name', label: 'Faculty Name', type: 'text', readOnly: true },
    { name: 'class_id', label: 'Class', type: 'select', options: classes },
    { name: 'week_of_reporting', label: 'Week of Reporting', type: 'number' },
    { name: 'date_of_lecture', label: 'Date of Lecture', type: 'date' },
    { name: 'course_name', label: 'Course Name', type: 'text', readOnly: true },
    { name: 'course_code', label: 'Course Code', type: 'text', readOnly: true },
    { name: 'lecturer_name', label: "Lecturer's Name", type: 'text' },
    { name: 'actual_students_present', label: 'Actual Number of Students Present', type: 'number' },
    { name: 'total_students', label: 'Total Number of Registered Students', type: 'number', readOnly: true },
    { name: 'venue', label: 'Venue of the Class', type: 'text', readOnly: true },
    { name: 'scheduled_time', label: 'Scheduled Lecture Time', type: 'time' },
    { name: 'topic_taught', label: 'Topic Taught', type: 'text' },
    { name: 'learning_outcomes', label: 'Learning Outcomes of the Topic', type: 'textarea' },
    { name: 'recommendations', label: "Lecturer's Recommendations", type: 'textarea' }
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lecture Report Management</h2>
        <div>
          <button 
            className="btn btn-success me-2"
            onClick={() => setShowDownloadSection(!showDownloadSection)}
          >
            {showDownloadSection ? '📋 Hide Reports' : '📥 Download Reports'}
          </button>
          <button 
            className="btn btn-primary"
            onClick={downloadExcel}
            disabled={reports.length === 0}
          >
            📊 Download All Excel
          </button>
        </div>
      </div>

      {showDownloadSection && (
        <div className="card mb-4">
          <div className="card-header">
            <h5>My Submitted Reports</h5>
          </div>
          <div className="card-body">
            {reports.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Class</th>
                      <th>Week</th>
                      <th>Date</th>
                      <th>Attendance</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, index) => (
                      <tr key={index}>
                        <td>{report.course_name}</td>
                        <td>{report.class_name}</td>
                        <td>Week {report.week_of_reporting}</td>
                        <td>{report.date_of_lecture}</td>
                        <td>
                          {report.actual_students_present}/{report.total_students} 
                          ({Math.round((report.actual_students_present / report.total_students) * 100)}%)
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-success"
                            onClick={() => downloadSingleReport(report)}
                            title="Download as Excel"
                          >
                            📥 Excel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No reports submitted yet.</p>
            )}
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h4>📝 Submit New Lecture Report</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {fields.map(field => (
                <div className={`${field.type === 'textarea' ? 'col-12' : 'col-md-6'} mb-3`} key={field.name}>
                  <label className="form-label">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      className="form-control"
                      value={form[field.name]}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map(option => (
                        <option key={option.class_id} value={option.class_id}>
                          {option.class_name}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      className="form-control"
                      value={form[field.name]}
                      onChange={handleChange}
                      rows="3"
                      required
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      className="form-control"
                      value={form[field.name]}
                      onChange={handleChange}
                      readOnly={field.readOnly}
                      required
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/lecturer-dashboard')}>
                Back to Dashboard
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;