import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';

function LecturerDashboard({ user }) {
  const [classes, setClasses] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalClasses: 0,
    totalReports: 0,
    averageAttendance: 0,
    pendingTasks: 0
  });

  useEffect(() => {
    fetchLecturerData();
  }, []);

  const fetchLecturerData = async () => {
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

      const mockReports = [
        {
          report_id: 1,
          class_name: "BIT Year 2 - Group A",
          course_name: "Web Application Development",
          week_of_reporting: 1,
          date_of_lecture: "2024-01-15",
          topic_taught: "Introduction to React JS",
          actual_students_present: 42,
          total_students: 45,
          attendance_rate: 93
        },
        {
          report_id: 2,
          class_name: "BIT Year 3 - Group B",
          course_name: "Advanced Web Technologies",
          week_of_reporting: 1,
          date_of_lecture: "2024-01-17",
          topic_taught: "Node.js and Express",
          actual_students_present: 35,
          total_students: 38,
          attendance_rate: 92
        }
      ];

      setClasses(mockClasses);
      setReports(mockReports);
      setStats({
        totalClasses: mockClasses.length,
        totalReports: mockReports.length,
        averageAttendance: 92,
        pendingTasks: 3
      });
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadAllReportsExcel = () => {
    if (reports.length === 0) {
      alert("No reports available to download");
      return;
    }

    const excelData = reports.map(report => ({
      'Class': report.class_name,
      'Course': report.course_name,
      'Week': report.week_of_reporting,
      'Date': report.date_of_lecture,
      'Topic Taught': report.topic_taught,
      'Students Present': report.actual_students_present,
      'Total Students': report.total_students,
      'Attendance Rate': `${report.attendance_rate}%`,
      'Venue': classes.find(c => c.class_id === report.class_id)?.venue || 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "My Lecture Reports");
    
    const fileName = `lecture_reports_${user?.username}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const downloadClassSummaryExcel = () => {
    if (classes.length === 0) {
      alert("No classes available");
      return;
    }

    const excelData = classes.map(cls => ({
      'Class Name': cls.class_name,
      'Course': cls.course_name,
      'Course Code': cls.course_code,
      'Students Assigned': cls.students_assigned,
      'Venue': cls.venue,
      'Schedule': cls.schedule_time,
      'Total Reports': reports.filter(r => r.class_id === cls.class_id).length
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "My Classes Summary");
    
    const fileName = `classes_summary_${user?.username}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-large"></div>
          <p>Loading lecturer dashboard...</p>
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
            <h2>Lecturer Dashboard</h2>
            <p className="text-muted">Welcome, {user?.fullName || user?.username}</p>
          </div>
          <div className="col-md-4 text-end">
            <div className="btn-group">
              <button 
                className="btn btn-success me-2"
                onClick={downloadClassSummaryExcel}
                disabled={classes.length === 0}
              >
                <i className="fas fa-download me-2"></i>
                Classes Excel
              </button>
              <button 
                className="btn btn-info me-2"
                onClick={downloadAllReportsExcel}
                disabled={reports.length === 0}
              >
                <i className="fas fa-download me-2"></i>
                Reports Excel
              </button>
              <Link to="/submit-report" className="btn btn-primary">
                <i className="fas fa-plus me-2"></i>
                New Report
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Classes
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.totalClasses}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-chalkboard-teacher fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Reports Submitted
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.totalReports}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-file-alt fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Avg Attendance
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.averageAttendance}%</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Pending Tasks
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{stats.pendingTasks}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-tasks fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* My Classes Section */}
        <div className="col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex justify-content-between align-items-center">
              <h6 className="m-0 font-weight-bold text-primary">
                <i className="fas fa-chalkboard-teacher me-2"></i>
                My Classes ({classes.length})
              </h6>
              <span className="badge bg-primary">{classes.length} classes</span>
            </div>
            <div className="card-body">
              {classes.length > 0 ? (
                <div className="list-group">
                  {classes.map((cls, idx) => (
                    <div key={idx} className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{cls.class_name}</h6>
                        <small className="text-muted">{cls.students_assigned} students</small>
                      </div>
                      <p className="mb-1">{cls.course_name} ({cls.course_code})</p>
                      <small className="text-muted">
                        <i className="fas fa-map-marker-alt me-1"></i>
                        {cls.venue} | 
                        <i className="fas fa-clock ms-2 me-1"></i>
                        {cls.schedule_time}
                      </small>
                      <div className="mt-2">
                        <small>
                          Reports: {reports.filter(r => r.class_id === cls.class_id).length}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="fas fa-chalkboard-teacher fa-3x text-muted mb-3"></i>
                  <p>No classes assigned yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Reports Section */}
        <div className="col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex justify-content-between align-items-center">
              <h6 className="m-0 font-weight-bold text-success">
                <i className="fas fa-file-alt me-2"></i>
                Recent Reports ({reports.length})
              </h6>
              <span className="badge bg-success">{reports.length} reports</span>
            </div>
            <div className="card-body">
              {reports.length > 0 ? (
                <div className="list-group">
                  {reports.slice(0, 5).map((report, idx) => (
                    <div key={idx} className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">{report.course_name}</h6>
                        <small className="text-muted">Week {report.week_of_reporting}</small>
                      </div>
                      <p className="mb-1">{report.topic_taught}</p>
                      <small className="text-muted">
                        <i className="fas fa-users me-1"></i>
                        {report.actual_students_present}/{report.total_students} students
                        <span className="ms-2 text-success">
                          ({report.attendance_rate}%)
                        </span>
                      </small>
                      <div className="mt-2">
                        <small className="text-muted">
                          <i className="fas fa-calendar me-1"></i>
                          {report.date_of_lecture}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="fas fa-file-alt fa-3x text-muted mb-3"></i>
                  <p>No reports submitted yet.</p>
                  <Link to="/submit-report" className="btn btn-primary btn-sm">
                    Submit Your First Report
                  </Link>
                </div>
              )}
              {reports.length > 5 && (
                <div className="text-center mt-3">
                  <Link to="/submit-report" className="btn btn-outline-primary btn-sm">
                    View All Reports
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card shadow">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-info">
                <i className="fas fa-bolt me-2"></i>
                Quick Actions
              </h6>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-6 mb-3">
                  <Link to="/submit-report" className="btn btn-primary btn-block">
                    <i className="fas fa-plus-circle me-2"></i>
                    New Report
                  </Link>
                </div>
                <div className="col-6 mb-3">
                  <button className="btn btn-success btn-block" onClick={downloadAllReportsExcel}>
                    <i className="fas fa-download me-2"></i>
                    Export Data
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn btn-info btn-block">
                    <i className="fas fa-chart-line me-2"></i>
                    View Analytics
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn btn-warning btn-block">
                    <i className="fas fa-calendar me-2"></i>
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturerDashboard;