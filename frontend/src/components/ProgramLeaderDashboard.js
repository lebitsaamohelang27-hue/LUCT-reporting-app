import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

function ProgramLeaderDashboard({ user }) {
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [students, setStudents] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    fetchPLData();
  }, []);

  const fetchPLData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockCourses = [
        {
          course_id: 1,
          course_name: "Web Application Development",
          course_code: "DIWA2110",
          class_name: "BIT Year 2 - Group A",
          total_students: 45,
          lecturer_name: "Dr. Smith",
          lecturer_id: 1,
          faculty: "FICT",
          stream: "IT",
          credits: 3,
          status: "Active"
        },
        {
          course_id: 2,
          course_name: "Database Management",
          course_code: "DBMS2101",
          class_name: "BIT Year 2 - Group B",
          total_students: 38,
          lecturer_name: null,
          lecturer_id: null,
          faculty: "FICT",
          stream: "IT",
          credits: 3,
          status: "Unassigned"
        }
      ];

      const mockLecturers = [
        {
          id: 1,
          name: "Dr. Smith",
          email: "smith@luct.ac.ls",
          faculty: "FICT",
          assigned_courses: 3,
          total_students: 120,
          status: "Active"
        },
        {
          id: 2,
          name: "Prof. Johnson",
          email: "johnson@luct.ac.ls",
          faculty: "FICT",
          assigned_courses: 2,
          total_students: 85,
          status: "Active"
        },
        {
          id: 3,
          name: "Dr. Wilson",
          email: "wilson@luct.ac.ls",
          faculty: "FICT",
          assigned_courses: 0,
          total_students: 0,
          status: "Available"
        }
      ];

      const mockStudents = [
        {
          id: 1,
          name: "John Doe",
          student_id: "BIT2023001",
          stream: "IT",
          year: 2,
          courses_enrolled: 6,
          attendance_rate: 92,
          status: "Active"
        },
        {
          id: 2,
          name: "Jane Smith",
          student_id: "BIT2023002",
          stream: "CS",
          year: 2,
          courses_enrolled: 6,
          attendance_rate: 88,
          status: "Active"
        }
      ];

      const mockReports = [
        {
          id: 1,
          type: "Course Report",
          description: "Web Development course needs additional resources",
          submitted_by: "Dr. Smith",
          date: "2024-01-15",
          status: "Reviewed"
        },
        {
          id: 2,
          type: "Student Feedback",
          description: "Request for additional lab sessions",
          submitted_by: "Student Council",
          date: "2024-01-14",
          status: "Pending"
        }
      ];

      setCourses(mockCourses);
      setLecturers(mockLecturers);
      setStudents(mockStudents);
      setReports(mockReports);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const assignCourse = async (courseId, lecturerId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      const lecturer = lecturers.find(l => l.id === parseInt(lecturerId));
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course.course_id === courseId 
            ? { 
                ...course, 
                lecturer_name: lecturer?.name, 
                lecturer_id: lecturerId,
                status: 'Active'
              }
            : course
        )
      );
      
      alert('Course assigned successfully!');
    } catch (err) {
      alert('Error assigning course');
    }
  };

  const downloadCourseCatalogExcel = () => {
    const excelData = courses.map(course => ({
      'Course Name': course.course_name,
      'Course Code': course.course_code,
      'Class': course.class_name,
      'Faculty': course.faculty,
      'Stream': course.stream,
      'Credits': course.credits,
      'Total Students': course.total_students,
      'Assigned Lecturer': course.lecturer_name || 'Not assigned',
      'Status': course.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Course Catalog");
    
    const fileName = `course_catalog_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const downloadLecturerReportExcel = () => {
    const excelData = lecturers.map(lecturer => ({
      'Name': lecturer.name,
      'Email': lecturer.email,
      'Faculty': lecturer.faculty,
      'Assigned Courses': lecturer.assigned_courses,
      'Total Students': lecturer.total_students,
      'Status': lecturer.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lecturer Report");
    
    const fileName = `lecturer_report_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-large"></div>
          <p>Loading program leader dashboard...</p>
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
            <h2>Program Leader Dashboard</h2>
            <p className="text-muted">Program management and academic administration</p>
          </div>
          <div className="col-md-4 text-end">
            <div className="btn-group">
              <button 
                className="btn btn-success me-2"
                onClick={downloadCourseCatalogExcel}
              >
                <i className="fas fa-download me-2"></i>
                Course Catalog
              </button>
              <button 
                className="btn btn-info"
                onClick={downloadLecturerReportExcel}
              >
                <i className="fas fa-download me-2"></i>
                Lecturer Report
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
                    Total Courses
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
          <div className="card square border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Active Lecturers
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {lecturers.filter(l => l.status === 'Active').length}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-chalkboard-teacher fa-2x text-gray-300"></i>
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
                    Total Students
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {students.reduce((sum, student) => sum + 1, 0)}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-gray-300"></i>
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
                    Unassigned Courses
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {courses.filter(c => !c.lecturer_name).length}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-exclamation-triangle fa-2x text-gray-300"></i>
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
                Course Management
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'lecturers' ? 'active' : ''}`}
                onClick={() => setActiveTab('lecturers')}
              >
                <i className="fas fa-chalkboard-teacher me-2"></i>
                Lecturer Management
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'students' ? 'active' : ''}`}
                onClick={() => setActiveTab('students')}
              >
                <i className="fas fa-users me-2"></i>
                Student Overview
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`}
                onClick={() => setActiveTab('reports')}
              >
                <i className="fas fa-chart-bar me-2"></i>
                Program Reports
              </button>
            </li>
          </ul>
        </div>

        <div className="card-body">
          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Course Code</th>
                    <th>Class</th>
                    <th>Students</th>
                    <th>Lecturer</th>
                    <th>Faculty</th>
                    <th>Stream</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(course => (
                    <tr key={course.course_id}>
                      <td>{course.course_name}</td>
                      <td>{course.course_code}</td>
                      <td>{course.class_name}</td>
                      <td>{course.total_students}</td>
                      <td>
                        {course.lecturer_name || (
                          <span className="text-danger">Not assigned</span>
                        )}
                      </td>
                      <td>{course.faculty}</td>
                      <td>{course.stream}</td>
                      <td>
                        <span className={`badge ${course.status === 'Active' ? 'bg-success' : 'bg-warning'}`}>
                          {course.status}
                        </span>
                      </td>
                      <td>
                        <select 
                          className="form-select form-select-sm"
                          onChange={(e) => assignCourse(course.course_id, e.target.value)}
                          defaultValue={course.lecturer_id || ""}
                        >
                          <option value="">Assign Lecturer</option>
                          {lecturers.map(lecturer => (
                            <option key={lecturer.id} value={lecturer.id}>
                              {lecturer.name}
                            </option>
                          ))}
                        </select>
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
                <div key={lecturer.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card rectangle h-100">
                    <div className="card-header">
                      <h5 className="card-title mb-0">{lecturer.name}</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        <i className="fas fa-envelope me-2 text-muted"></i>
                        {lecturer.email}
                      </p>
                      <p className="card-text">
                        <i className="fas fa-building me-2 text-muted"></i>
                        {lecturer.faculty}
                      </p>
                      <div className="lecturer-stats">
                        <div className="row text-center">
                          <div className="col-6">
                            <div className="border rounded p-2 mb-2">
                              <h6 className="mb-0 text-primary">{lecturer.assigned_courses}</h6>
                              <small className="text-muted">Courses</small>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="border rounded p-2 mb-2">
                              <h6 className="mb-0 text-success">{lecturer.total_students}</h6>
                              <small className="text-muted">Students</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <span className={`badge ${lecturer.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                        {lecturer.status}
                      </span>
                      <button className="btn btn-outline-primary btn-sm float-end">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Student ID</th>
                    <th>Stream</th>
                    <th>Year</th>
                    <th>Courses</th>
                    <th>Attendance</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.student_id}</td>
                      <td>{student.stream}</td>
                      <td>Year {student.year}</td>
                      <td>{student.courses_enrolled}</td>
                      <td>
                        <div className="progress" style={{ height: '20px' }}>
                          <div 
                            className={`progress-bar ${student.attendance_rate >= 90 ? 'bg-success' : student.attendance_rate >= 80 ? 'bg-warning' : 'bg-danger'}`}
                            style={{ width: `${student.attendance_rate}%` }}
                          >
                            {student.attendance_rate}%
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-success">{student.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card rectangle">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Program Analytics</h5>
                    </div>
                    <div className="card-body">
                      <div className="row text-center">
                        <div className="col-6">
                          <h3 className="text-primary">{courses.length}</h3>
                          <small className="text-muted">Total Courses</small>
                        </div>
                        <div className="col-6">
                          <h3 className="text-success">{students.length}</h3>
                          <small className="text-muted">Total Students</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card rectangle">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Recent Activities</h5>
                    </div>
                    <div className="card-body">
                      {reports.map(report => (
                        <div key={report.id} className="border-bottom pb-2 mb-2">
                          <h6 className="mb-1">{report.type}</h6>
                          <p className="mb-1 small">{report.description}</p>
                          <small className="text-muted">
                            By {report.submitted_by} on {report.date}
                          </small>
                          <span className={`badge ${report.status === 'Reviewed' ? 'bg-success' : 'bg-warning'} float-end`}>
                            {report.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgramLeaderDashboard;