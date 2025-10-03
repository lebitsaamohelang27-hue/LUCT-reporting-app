import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);
    fetchStudentData();
  }, [navigate]);

  const fetchStudentData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockCourses = [
        {
          id: 1,
          course_name: "Web Application Development",
          course_code: "DIWA2110",
          lecturer_name: "Dr. Smith",
          schedule_time: "Mon 10:00-12:00",
          venue: "Lab 301",
          credits: 3,
          status: "Active",
          description: "Learn modern web development with React, Node.js, and databases"
        },
        {
          id: 2,
          course_name: "Database Management",
          course_code: "DBMS2101",
          lecturer_name: "Prof. Johnson",
          schedule_time: "Wed 14:00-16:00",
          venue: "Lab 302",
          credits: 3,
          status: "Active",
          description: "Database design, SQL, and database administration"
        },
        {
          id: 3,
          course_name: "Mobile App Development",
          course_code: "MADV2105",
          lecturer_name: "Dr. Wilson",
          schedule_time: "Fri 09:00-11:00",
          venue: "Lab 303",
          credits: 3,
          status: "Active",
          description: "Cross-platform mobile development with React Native"
        },
        {
          id: 4,
          course_name: "Software Engineering",
          course_code: "SENG2103",
          lecturer_name: "Prof. Brown",
          schedule_time: "Tue 13:00-15:00",
          venue: "Room 205",
          credits: 3,
          status: "Active",
          description: "Software development methodologies and project management"
        }
      ];

      const mockAttendance = [
        {
          id: 1,
          course_name: "Web Application Development",
          date: "2024-01-15",
          week: 1,
          topic_covered: "Introduction to React",
          present: true,
          notes: "First class introduction"
        },
        {
          id: 2,
          course_name: "Database Management",
          date: "2024-01-16",
          week: 1,
          topic_covered: "SQL Basics",
          present: true,
          notes: "Database fundamentals"
        },
        {
          id: 3,
          course_name: "Mobile App Development",
          date: "2024-01-17",
          week: 1,
          topic_covered: "Flutter Introduction",
          present: false,
          notes: "Missed due to illness"
        },
        {
          id: 4,
          course_name: "Software Engineering",
          date: "2024-01-18",
          week: 1,
          topic_covered: "Agile Methodology",
          present: true,
          notes: "Scrum framework"
        },
        {
          id: 5,
          course_name: "Web Application Development",
          date: "2024-01-22",
          week: 2,
          topic_covered: "React Components",
          present: true,
          notes: "Component lifecycle"
        }
      ];

      const mockGrades = [
        {
          id: 1,
          course_name: "Web Application Development",
          assignment: "Assignment 1 - React Basics",
          marks: 85,
          total_marks: 100,
          percentage: 85,
          grade: "A",
          submitted_date: "2024-01-10",
          feedback: "Excellent work on component structure"
        },
        {
          id: 2,
          course_name: "Database Management",
          assignment: "Quiz 1 - SQL Fundamentals",
          marks: 78,
          total_marks: 100,
          percentage: 78,
          grade: "B+",
          submitted_date: "2024-01-12",
          feedback: "Good understanding of basic queries"
        },
        {
          id: 3,
          course_name: "Mobile App Development",
          assignment: "Project Proposal",
          marks: 92,
          total_marks: 100,
          percentage: 92,
          grade: "A",
          submitted_date: "2024-01-14",
          feedback: "Innovative project idea with clear scope"
        },
        {
          id: 4,
          course_name: "Software Engineering",
          assignment: "Requirements Analysis",
          marks: 88,
          total_marks: 100,
          percentage: 88,
          grade: "B+",
          submitted_date: "2024-01-16",
          feedback: "Thorough analysis with good documentation"
        }
      ];

      setCourses(mockCourses);
      setAttendance(mockAttendance);
      setGrades(mockGrades);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const submitRating = async (courseId, rating) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRatings(prev => ({
        ...prev,
        [courseId]: rating
      }));
      
      // Show success message
      const course = courses.find(c => c.id === courseId);
      alert(`Rating submitted for ${course?.course_name}: ${getRatingText(rating)}`);
    } catch (err) {
      alert('Error submitting rating');
    }
  };

  const getRatingText = (rating) => {
    const ratingsMap = {
      '5': '⭐️⭐️⭐️⭐️⭐️ (Excellent)',
      '4': '⭐️⭐️⭐️⭐️ (Very Good)',
      '3': '⭐️⭐️⭐️ (Good)',
      '2': '⭐️⭐️ (Fair)',
      '1': '⭐️ (Poor)'
    };
    return ratingsMap[rating] || 'Not rated';
  };

  const downloadAttendanceReport = () => {
    const attendanceByCourse = courses.map(course => {
      const courseAttendance = attendance.filter(a => a.course_name === course.course_name);
      const presentCount = courseAttendance.filter(a => a.present).length;
      const totalCount = courseAttendance.length;
      const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
      
      return {
        'Course': course.course_name,
        'Course Code': course.course_code,
        'Total Classes': totalCount,
        'Classes Attended': presentCount,
        'Classes Missed': totalCount - presentCount,
        'Attendance Rate': `${attendanceRate}%`,
        'Lecturer': course.lecturer_name
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(attendanceByCourse);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Summary");
    
    const fileName = `attendance_report_${user?.username}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const downloadGradeReport = () => {
    const excelData = grades.map(grade => ({
      'Course': grade.course_name,
      'Course Code': courses.find(c => c.course_name === grade.course_name)?.course_code || 'N/A',
      'Assignment': grade.assignment,
      'Marks Obtained': grade.marks,
      'Total Marks': grade.total_marks,
      'Percentage': `${grade.percentage}%`,
      'Grade': grade.grade,
      'Submitted Date': grade.submitted_date,
      'Lecturer Feedback': grade.feedback
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grade Report");
    
    const fileName = `grade_report_${user?.username}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const downloadDetailedAttendance = () => {
    const excelData = attendance.map(record => ({
      'Course': record.course_name,
      'Course Code': courses.find(c => c.course_name === record.course_name)?.course_code || 'N/A',
      'Date': record.date,
      'Week': `Week ${record.week}`,
      'Topic Covered': record.topic_covered,
      'Status': record.present ? 'Present' : 'Absent',
      'Notes': record.notes || 'N/A',
      'Lecturer': courses.find(c => c.course_name === record.course_name)?.lecturer_name || 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Detailed Attendance");
    
    const fileName = `detailed_attendance_${user?.username}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  // Calculate statistics
  const totalCourses = courses.length;
  const totalAssignments = grades.length;
  const averageGrade = grades.length > 0 
    ? grades.reduce((sum, grade) => sum + grade.percentage, 0) / grades.length 
    : 0;
  const attendanceRate = attendance.length > 0
    ? Math.round((attendance.filter(a => a.present).length / attendance.length) * 100)
    : 0;

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-large"></div>
          <p>Loading student dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <p>Please log in to access the dashboard.</p>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Navigation Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">
            <i className="fas fa-graduation-cap me-2"></i>
            Student Portal - LUCT
          </span>
          <div className="navbar-nav ms-auto d-flex align-items-center">
            <div className="user-info me-3 text-light">
              <small>
                <strong>{user.username}</strong> | 
                <span className="role-badge role-student">
                  Student
                </span> | 
                {user.faculty}
              </small>
            </div>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-1"></i>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        {/* Header */}
        <div className="dashboard-header mb-4">
          <div className="row">
            <div className="col-md-8">
              <h2>Student Dashboard</h2>
              <p className="text-muted">
                Welcome back, {user?.fullName || user?.username} 
                {user?.stream && ` - ${user.stream} Program`}
              </p>
            </div>
            <div className="col-md-4 text-end">
              <div className="btn-group">
                <button className="btn btn-success me-2" onClick={downloadAttendanceReport}>
                  <i className="fas fa-download me-2"></i>
                  Attendance
                </button>
                <button className="btn btn-info me-2" onClick={downloadGradeReport}>
                  <i className="fas fa-download me-2"></i>
                  Grades
                </button>
                <button className="btn btn-warning" onClick={downloadDetailedAttendance}>
                  <i className="fas fa-file-excel me-2"></i>
                  Full Report
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
                      Enrolled Courses
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{totalCourses}</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-book fa-2x text-gray-300"></i>
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
                      Attendance Rate
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{attendanceRate}%</div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar-check fa-2x text-gray-300"></i>
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
                      Average Grade
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {averageGrade > 0 ? Math.round(averageGrade) + '%' : 'N/A'}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-chart-line fa-2x text-gray-300"></i>
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
                      Assignments Submitted
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">{totalAssignments}</div>
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
                  className={`nav-link ${activeTab === 'courses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('courses')}
                >
                  <i className="fas fa-book me-2"></i>
                  My Courses ({courses.length})
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'attendance' ? 'active' : ''}`}
                  onClick={() => setActiveTab('attendance')}
                >
                  <i className="fas fa-calendar-check me-2"></i>
                  Attendance ({attendance.length} records)
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'grades' ? 'active' : ''}`}
                  onClick={() => setActiveTab('grades')}
                >
                  <i className="fas fa-chart-bar me-2"></i>
                  Grades & Progress ({grades.length})
                </button>
              </li>
            </ul>
          </div>

          <div className="card-body">
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="row">
                {courses.map(course => (
                  <div className="col-md-6 col-lg-4 mb-4" key={course.id}>
                    <div className="card rectangle course-card h-100">
                      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">{course.course_code}</h5>
                        <span className="badge bg-light text-primary">{course.credits} Credits</span>
                      </div>
                      <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-dark">{course.course_name}</h6>
                        <p className="card-text small text-muted mb-3">{course.description}</p>
                        
                        <div className="course-info">
                          <p className="mb-1">
                            <i className="fas fa-user text-primary me-2"></i>
                            <strong>Lecturer:</strong> {course.lecturer_name}
                          </p>
                          <p className="mb-1">
                            <i className="fas fa-clock text-primary me-2"></i>
                            <strong>Schedule:</strong> {course.schedule_time}
                          </p>
                          <p className="mb-1">
                            <i className="fas fa-map-marker-alt text-primary me-2"></i>
                            <strong>Venue:</strong> {course.venue}
                          </p>
                          <p className="mb-0">
                            <i className="fas fa-star text-warning me-2"></i>
                            <strong>Your Rating:</strong> {ratings[course.id] ? getRatingText(ratings[course.id]) : 'Not rated'}
                          </p>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="rating-section">
                          <label className="form-label small fw-bold">Rate this course:</label>
                          <select 
                            className="form-select form-select-sm"
                            value={ratings[course.id] || ''}
                            onChange={(e) => submitRating(course.id, e.target.value)}
                          >
                            <option value="">Select rating</option>
                            <option value="5">⭐️⭐️⭐️⭐️⭐️ (Excellent)</option>
                            <option value="4">⭐️⭐️⭐️⭐️ (Very Good)</option>
                            <option value="3">⭐️⭐️⭐️ (Good)</option>
                            <option value="2">⭐️⭐️ (Fair)</option>
                            <option value="1">⭐️ (Poor)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div>
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Course</th>
                        <th>Date</th>
                        <th>Week</th>
                        <th>Topic Covered</th>
                        <th>Status</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.map(record => (
                        <tr key={record.id}>
                          <td>
                            <strong>{record.course_name}</strong>
                            <br />
                            <small className="text-muted">
                              {courses.find(c => c.course_name === record.course_name)?.course_code}
                            </small>
                          </td>
                          <td>{new Date(record.date).toLocaleDateString()}</td>
                          <td>
                            <span className="badge bg-secondary">Week {record.week}</span>
                          </td>
                          <td>{record.topic_covered}</td>
                          <td>
                            <span className={`badge ${record.present ? 'bg-success' : 'bg-danger'}`}>
                              {record.present ? 'Present' : 'Absent'}
                            </span>
                          </td>
                          <td>
                            <small className="text-muted">{record.notes}</small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {attendance.length === 0 && (
                  <div className="text-center py-4">
                    <i className="fas fa-calendar-times fa-3x text-muted mb-3"></i>
                    <p>No attendance records found.</p>
                  </div>
                )}
              </div>
            )}

            {/* Grades Tab */}
            {activeTab === 'grades' && (
              <div>
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Course</th>
                        <th>Assignment</th>
                        <th>Marks</th>
                        <th>Percentage</th>
                        <th>Grade</th>
                        <th>Date</th>
                        <th>Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map(grade => (
                        <tr key={grade.id}>
                          <td>
                            <strong>{grade.course_name}</strong>
                            <br />
                            <small className="text-muted">
                              {courses.find(c => c.course_name === grade.course_name)?.course_code}
                            </small>
                          </td>
                          <td>{grade.assignment}</td>
                          <td>
                            <strong>{grade.marks}</strong>/<small>{grade.total_marks}</small>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="progress flex-grow-1 me-2" style={{ height: '20px', minWidth: '100px' }}>
                                <div 
                                  className={`progress-bar ${grade.percentage >= 80 ? 'bg-success' : grade.percentage >= 60 ? 'bg-warning' : 'bg-danger'}`}
                                  style={{ width: `${grade.percentage}%` }}
                                  role="progressbar"
                                  aria-valuenow={grade.percentage}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  {grade.percentage}%
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${grade.grade === 'A' ? 'bg-success' : grade.grade === 'B+' ? 'bg-info' : grade.grade === 'B' ? 'bg-primary' : 'bg-warning'}`}>
                              {grade.grade}
                            </span>
                          </td>
                          <td>{new Date(grade.submitted_date).toLocaleDateString()}</td>
                          <td>
                            <small className="text-muted" title={grade.feedback}>
                              {grade.feedback.length > 50 ? grade.feedback.substring(0, 50) + '...' : grade.feedback}
                            </small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {grades.length === 0 && (
                  <div className="text-center py-4">
                    <i className="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
                    <p>No grade records found.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="row">
          <div className="col-md-12">
            <div className="card rectangle">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <i className="fas fa-rocket me-2"></i>
                  Quick Actions
                </h5>
              </div>
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <button className="btn btn-outline-primary btn-block" onClick={downloadAttendanceReport}>
                      <i className="fas fa-download fa-2x mb-2"></i>
                      <br />
                      Attendance Report
                    </button>
                  </div>
                  <div className="col-md-3 mb-3">
                    <button className="btn btn-outline-success btn-block" onClick={downloadGradeReport}>
                      <i className="fas fa-file-excel fa-2x mb-2"></i>
                      <br />
                      Grade Report
                    </button>
                  </div>
                  <div className="col-md-3 mb-3">
                    <button className="btn btn-outline-info btn-block" onClick={downloadDetailedAttendance}>
                      <i className="fas fa-chart-bar fa-2x mb-2"></i>
                      <br />
                      Full Analytics
                    </button>
                  </div>
                  <div className="col-md-3 mb-3">
                    <button className="btn btn-outline-warning btn-block" onClick={() => window.print()}>
                      <i className="fas fa-print fa-2x mb-2"></i>
                      <br />
                      Print Summary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;