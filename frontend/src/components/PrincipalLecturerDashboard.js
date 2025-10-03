import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

function PrincipalLecturerDashboard({ user }) {
  const [reports, setReports] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('reports');

  useEffect(() => {
    fetchPRLData();
  }, []);

  const fetchPRLData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockReports = [
        {
          report_id: 1,
          class_name: "BIT Year 2 - Group A",
          course_name: "Web Application Development",
          course_code: "DIWA2110",
          lecturer_name: "Dr. Smith",
          week_of_reporting: 1,
          date_of_lecture: "2024-01-15",
          topic_taught: "Introduction to React JS",
          actual_students_present: 42,
          total_students: 45,
          learning_outcomes: "Students understood basic React concepts and built their first component",
          recommendations: "Need to cover state management in next class",
          feedback: "Good coverage of fundamentals. Consider adding more practical examples.",
          attendance_rate: 93,
          status: "Reviewed"
        },
        {
          report_id: 2,
          class_name: "BIT Year 3 - Group B",
          course_name: "Advanced Web Technologies",
          course_code: "AWT3101",
          lecturer_name: "Prof. Johnson",
          week_of_reporting: 1,
          date_of_lecture: "2024-01-17",
          topic_taught: "Node.js and Express Framework",
          actual_students_present: 35,
          total_students: 38,
          learning_outcomes: "Students learned to create basic REST APIs",
          recommendations: "Practice with database integration needed",
          feedback: "",
          attendance_rate: 92,
          status: "Pending Review"
        }
      ];

      const mockCourses = [
        {
          course_id: 1,
          course_name: "Web Application Development",
          course_code: "DIWA2110",
          lecturer_name: "Dr. Smith",
          total_students: 45,
          reports_count: 12,
          avg_attendance: 92,
          faculty: "FICT"
        },
        {
          course_id: 2,
          course_name: "Database Management",
          course_code: "DBMS2101",
          lecturer_name: "Prof. Wilson",
          total_students: 38,
          reports_count: 10,
          avg_attendance: 88,
          faculty: "FICT"
        }
      ];

      const mockLecturers = [
        {
          id: 1,
          name: "Dr. Smith",
          email: "smith@luct.ac.ls",
          courses_count: 3,
          total_reports: 15,
          avg_attendance: 91
        },
        {
          id: 2,
          name: "Prof. Johnson",
          email: "johnson@luct.ac.ls",
          courses_count: 2,
          total_reports: 12,
          avg_attendance: 89
        }
      ];

      setReports(mockReports);
      setCourses(mockCourses);
      setLecturers(mockLecturers);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const addFeedback = async (reportId, feedback) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setReports(prevReports => 
        prevReports.map(report => 
          report.report_id === reportId 
            ? { ...report, feedback, status: 'Reviewed' }
            : report
        )
      );
      
      alert('Feedback added successfully!');
    } catch (err) {
      alert('Error adding feedback');
    }
  };

  const downloadAllReportsExcel = () => {
    if (reports.length === 0) {
      alert("No reports available to download");
      return;
    }

    const excelData = reports.map(report => ({
      'Faculty': 'FICT',
      'Class': report.class_name,
      'Course': report.course_name,
      'Course Code': report.course_code,
      'Lecturer': report.lecturer_name,
      'Week': report.week_of_reporting,
      'Date': report.date_of_lecture,
      'Topic': report.topic_taught,
      'Students Present': report.actual_students_present,
      'Total Students': report.total_students,
      'Attendance Rate': `${report.attendance_rate}%`,
      'Learning Outcomes': report.learning_outcomes,
      'Recommendations': report.recommendations,
      'PRL Feedback': report.feedback || 'Not provided',
      'Status': report.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All Lecture Reports");
    
    const fileName = `prl_reports_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const downloadCourseAnalyticsExcel = () => {
    if (courses.length === 0) {
      alert("No courses available");
      return;
    }

    const excelData = courses.map(course => ({
      'Course Name': course.course_name,
      'Course Code': course.course_code,
      'Lecturer': course.lecturer_name,
      'Total Students': course.total_students,
      'Reports Submitted': course.reports_count,
      'Average Attendance': `${course.avg_attendance}%`,
      'Faculty': course.faculty
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Course Analytics");
    
    const fileName = `course_analytics_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-large"></div>
          <p>Loading principal lecturer dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="dashboard-header">
        <div className="row">
          <div className="col-md-8">
            <h2>Principal Lecturer Dashboard</h2>
            <p className="text-muted">Academic oversight and reporting management</p>
          </div>
          <div className="col-md-4 text-end">
            <div className="btn-group">
              <button 
                className="btn btn-success me-2"
                onClick={downloadCourseAnalyticsExcel}
                disabled={courses.length === 0}
              >
                <i className="fas fa-download me-2"></i>
                Course Analytics
              </button>
              <button 
                className="btn btn-info"
                onClick={downloadAllReportsExcel}
                disabled={reports.length === 0}
              >
                <i className="fas fa-download me-2"></i>
                All Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card square border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Reports
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{reports.length}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-file-alt fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card square border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Courses Monitored
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{courses.length}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-book fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card square border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Lecturers
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{lecturers.length}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-chalkboard-teacher fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card square border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Pending Reviews
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {reports.filter(r => !r.feedback).length}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-tasks fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="card rectangle mb-4">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`}
                onClick={() => setActiveTab('reports')}
              >
                <i className="fas fa-file-alt me-2"></i>
                Reports for Review
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'courses' ? 'active' : ''}`}
                onClick={() => setActiveTab('courses')}
              >
                <i className="fas fa-book me-2"></i>
                Course Overview
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'lecturers' ? 'active' : ''}`}
                onClick={() => setActiveTab('lecturers')}
              >
                <i className="fas fa-chalkboard-teacher me-2"></i>
                Lecturer Performance
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body">
          {/* Reports Tab */
}
          {activeTab === 'reports' && (
            <div>
              {reports.length > 0 ? (
                reports.map((report, idx) => (
                  <div key={idx} className="card rectangle mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        {report.course_name} - {report.class_name}
                      </h5>
                      <div>
                        <span className={`badge ${report.status === 'Reviewed' ? 'bg-success' : 'bg-warning'}`}>
                          {report.status}
                        </span>
                        <span className="badge bg-info ms-2">
                          Week {report.week_of_reporting}
                        </span>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <p><strong>Lecturer:</strong> {report.lecturer_name}</p>
                          <p><strong>Date:</strong> {report.date_of_lecture}</p>
                          <p><strong>Topic:</strong> {report.topic_taught}</p>
                          <p>
                            <strong>Attendance:</strong> {report.actual_students_present}/{report.total_students} 
                            <span className="text-success"> ({report.attendance_rate}%)</span>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Learning Outcomes:</strong></p>
                          <p className="text-muted">{report.learning_outcomes}</p>
                          <p><strong>Lecturer Recommendations:</strong></p>
                          <p className="text-muted">{report.recommendations}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <label><strong>Your Feedback:</strong></label>
                        <textarea 
                          className="form-control"
                          rows="3"
                          placeholder="Provide your feedback and suggestions..."
                          defaultValue={report.feedback || ''}
                          onBlur={(e) => addFeedback(report.report_id, e.target.value)}
                        />
                        <small className="text-muted">
                          Your feedback will be visible to the lecturer.
                        </small>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <i className="fas fa-file-alt fa-3x text-muted mb-3"></i>
                  <p>No reports available for review.</p>
                </div>
              )}
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Course Code</th>
                    <th>Lecturer</th>
                    <th>Students</th>
                    <th>Reports</th>
                    <th>Avg Attendance</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(course => (
                    <tr key={course.course_id}>
                      <td>{course.course_name}</td>
                      <td>{course.course_code}</td>
                      <td>{course.lecturer_name}</td>
                      <td>{course.total_students}</td>
                      <td>{course.reports_count}</td>
                      <td>
                        <div className="progress" style={{ height: '20px' }}>
                          <div 
                            className={`progress-bar ${course.avg_attendance >= 90 ? 'bg-success' : course.avg_attendance >= 80 ? 'bg-warning' : 'bg-danger'}`}
                            style={{ width: `${course.avg_attendance}%` }}
                          >
                            {course.avg_attendance}%
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${course.avg_attendance >= 85 ? 'bg-success' : 'bg-warning'}`}>
                          {course.avg_attendance >= 85 ? 'Good' : 'Needs Attention'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Lecturers Tab */}
          {activeTab === 'lecturers' && (
            <div className="row">
              {lecturers.map(lecturer => (
                <div key={lecturer.id} className="col-md-6 mb-4">
                  <div className="card rectangle h-100">
                    <div className="card-header">
                      <h5 className="card-title mb-0">{lecturer.name}</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        <i className="fas fa-envelope me-2 text-muted"></i>
                        {lecturer.email}
                      </p>
                      <div className="row text-center">
                        <div className="col-4">
                          <div className="border rounded p-2">
                            <h6 className="mb-0">{lecturer.courses_count}</h6>
                            <small className="text-muted">Courses</small>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="border rounded p-2">
                            <h6 className="mb-0">{lecturer.total_reports}</h6>
                            <small className="text-muted">Reports</small>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="border rounded p-2">
                            <h6 className="mb-0">{lecturer.avg_attendance}%</h6>
                            <small className="text-muted">Attendance</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-outline-primary btn-sm">
                        View Detailed Report
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PrincipalLecturerDashboard;