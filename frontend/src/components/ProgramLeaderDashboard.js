import React, { useState, useEffect } from 'react';

function ProgramLeaderDashboard({ user }) {
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [reports, setReports] = useState([]);
  const [classes, setClasses] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');
  const [newCourse, setNewCourse] = useState({
    course_name: '',
    course_code: '',
    class_name: '',
    total_students: '',
    credits: '3'
  });

  useEffect(() => {
    fetchPLData();
  }, []);

  const fetchPLData = async () => {
    try {
      // Hardcoded data with proper assignments
      const mockCourses = [
        {
          course_id: 1,
          course_name: "Web Application Development",
          course_code: "DIWA2110",
          class_name: "BIT Year 2 - Group A",
          total_students: 45,
          lecturer_name: "Mohl. Thabo Moloi",
          lecturer_id: 1,
          credits: 3,
          faculty: "FICT",
          status: "Active"
        },
        {
          course_id: 2,
          course_name: "Database Management Systems",
          course_code: "DBMS2101",
          class_name: "BIT Year 3 - Group B",
          total_students: 38,
          lecturer_name: "Mohl. Thabo Moloi",
          lecturer_id: 1,
          credits: 3,
          faculty: "FICT",
          status: "Active"
        },
        {
          course_id: 3,
          course_name: "Mobile Application Development",
          course_code: "MADV2105",
          class_name: "BIT Year 1 - Group C",
          total_students: 52,
          lecturer_name: "Mohl. 'Mabafokeng Mokoena",
          lecturer_id: 2,
          credits: 3,
          faculty: "FICT",
          status: "Active"
        },
        {
          course_id: 4,
          course_name: "Software Engineering",
          course_code: "SENG2103",
          class_name: "BIT Year 2 - Group D",
          total_students: 35,
          lecturer_name: "Mohl. 'Mabafokeng Mokoena",
          lecturer_id: 2,
          credits: 3,
          faculty: "FICT",
          status: "Active"
        },
        {
          course_id: 5,
          course_name: "Network Security",
          course_code: "NSEC2102",
          class_name: "BIT Year 3 - Group A",
          total_students: 40,
          lecturer_name: "Mohl. 'Mabafokeng Mokoena",
          lecturer_id: 2,
          credits: 3,
          faculty: "FICT",
          status: "Active"
        },
        {
          course_id: 6,
          course_name: "Artificial Intelligence",
          course_code: "AINT2107",
          class_name: "BIT Year 4 - Group A",
          total_students: 28,
          lecturer_name: null,
          lecturer_id: null,
          credits: 3,
          faculty: "FICT",
          status: "Unassigned"
        }
      ];

      // Calculate actual assigned courses and students for each lecturer
      const calculateLecturerStats = (courses) => {
        const stats = {};
        courses.forEach(course => {
          if (course.lecturer_id) {
            if (!stats[course.lecturer_id]) {
              stats[course.lecturer_id] = {
                assigned_courses: 0,
                total_students: 0
              };
            }
            stats[course.lecturer_id].assigned_courses += 1;
            stats[course.lecturer_id].total_students += course.total_students;
          }
        });
        return stats;
      };

      const lecturerStats = calculateLecturerStats(mockCourses);

      const mockLecturers = [
        {
          id: 1,
          name: "Mohl. Thabo Moloi",
          email: "t.moloi@luct.ac.ls",
          assigned_courses: lecturerStats[1]?.assigned_courses || 0,
          total_students: lecturerStats[1]?.total_students || 0,
          faculty: "FICT",
          status: "Active"
        },
        {
          id: 2,
          name: "Mohl. 'Mabafokeng Mokoena",
          email: "m.mokoena@luct.ac.ls",
          assigned_courses: lecturerStats[2]?.assigned_courses || 0,
          total_students: lecturerStats[2]?.total_students || 0,
          faculty: "FICT",
          status: "Active"
        },
        {
          id: 3,
          name: "Mohl. Khoali Moshoeshoe",
          email: "k.moshoeshoe@luct.ac.ls",
          assigned_courses: 0,
          total_students: 0,
          faculty: "FICT",
          status: "Available"
        },
        {
          id: 4,
          name: "Mohl. Lerato Motaung",
          email: "l.motaung@luct.ac.ls",
          assigned_courses: 0,
          total_students: 0,
          faculty: "FICT",
          status: "Available"
        }
      ];

      const mockClasses = [
        {
          id: 1,
          class_name: "BIT Year 2 - Group A",
          course_name: "Web Application Development",
          lecturer_name: "Mohl. Thabo Moloi",
          total_students: 45,
          venue: "Lab 301",
          schedule: "Monday 10:00-12:00",
          status: "Active"
        },
        {
          id: 2,
          class_name: "BIT Year 3 - Group B",
          course_name: "Database Management Systems",
          lecturer_name: "Mohl. Thabo Moloi",
          total_students: 38,
          venue: "Lab 302",
          schedule: "Wednesday 14:00-16:00",
          status: "Active"
        },
        {
          id: 3,
          class_name: "BIT Year 1 - Group C",
          course_name: "Mobile Application Development",
          lecturer_name: "Mohl. 'Mabafokeng Mokoena",
          total_students: 52,
          venue: "Lab 303",
          schedule: "Friday 09:00-11:00",
          status: "Active"
        },
        {
          id: 4,
          class_name: "BIT Year 2 - Group D",
          course_name: "Software Engineering",
          lecturer_name: "Mohl. 'Mabafokeng Mokoena",
          total_students: 35,
          venue: "Lab 304",
          schedule: "Tuesday 13:00-15:00",
          status: "Active"
        }
      ];

      const mockReports = [
        {
          id: 1,
          type: "Course Performance Report",
          description: "Web Development course needs additional lab resources",
          submitted_by: "Mohl. Thabo Moloi (PRL)",
          date: "2024-01-15",
          status: "Reviewed",
          priority: "Medium"
        },
        {
          id: 2,
          type: "Faculty Feedback",
          description: "Request for additional teaching assistants in large classes",
          submitted_by: "Mohl. 'Mabafokeng Mokoena (PRL)",
          date: "2024-01-17",
          status: "Pending",
          priority: "High"
        },
        {
          id: 3,
          type: "Program Review",
          description: "Quarterly program performance and enrollment analysis",
          submitted_by: "Academic Committee",
          date: "2024-01-10",
          status: "Reviewed",
          priority: "Low"
        },
        {
          id: 4,
          type: "Resource Allocation",
          description: "Need more computers in Lab 301 for practical sessions",
          submitted_by: "Mohl. Khoali Moshoeshoe",
          date: "2024-01-18",
          status: "Pending",
          priority: "High"
        }
      ];

      setCourses(mockCourses);
      setLecturers(mockLecturers);
      setClasses(mockClasses);
      setReports(mockReports);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ COURSES: Add new course
  const addNewCourse = () => {
    if (!newCourse.course_name || !newCourse.course_code || !newCourse.class_name) {
      alert('Please fill in all required fields');
      return;
    }

    const courseData = {
      course_id: courses.length + 1,
      course_name: newCourse.course_name,
      course_code: newCourse.course_code,
      class_name: newCourse.class_name,
      total_students: parseInt(newCourse.total_students) || 0,
      lecturer_name: null,
      lecturer_id: null,
      credits: parseInt(newCourse.credits),
      faculty: "FICT",
      status: "Unassigned"
    };

    setCourses(prev => [courseData, ...prev]);
    setNewCourse({
      course_name: '',
      course_code: '',
      class_name: '',
      total_students: '',
      credits: '3'
    });
    alert('New course added successfully!');
  };

  // ✅ COURSES: Assign lecturer to course
  const assignCourse = (courseId, lecturerId) => {
    const course = courses.find(c => c.course_id === courseId);
    const lecturer = lecturers.find(l => l.id === parseInt(lecturerId));
    const currentLecturer = course.lecturer_id ? lecturers.find(l => l.id === course.lecturer_id) : null;

    if (lecturerId === "") {
      // Unassign course
      setCourses(prevCourses => 
        prevCourses.map(c => 
          c.course_id === courseId 
            ? { 
                ...c, 
                lecturer_name: null, 
                lecturer_id: null,
                status: 'Unassigned'
              }
            : c
        )
      );

      // Update lecturer counts
      if (currentLecturer) {
        setLecturers(prev => 
          prev.map(l => 
            l.id === currentLecturer.id 
              ? { 
                  ...l, 
                  assigned_courses: Math.max(0, l.assigned_courses - 1),
                  total_students: Math.max(0, l.total_students - course.total_students)
                }
              : l
          )
        );
      }
    } else {
      // Assign course to lecturer
      setCourses(prevCourses => 
        prevCourses.map(c => 
          c.course_id === courseId 
            ? { 
                ...c, 
                lecturer_name: lecturer?.name, 
                lecturer_id: lecturerId,
                status: 'Active'
              }
            : c
        )
      );

      // Remove from current lecturer if exists
      if (currentLecturer) {
        setLecturers(prev => 
          prev.map(l => 
            l.id === currentLecturer.id 
              ? { 
                  ...l, 
                  assigned_courses: Math.max(0, l.assigned_courses - 1),
                  total_students: Math.max(0, l.total_students - course.total_students)
                }
              : l
          )
        );
      }

      // Add to new lecturer
      setLecturers(prev => 
        prev.map(l => 
          l.id === parseInt(lecturerId) 
            ? { 
                ...l, 
                assigned_courses: l.assigned_courses + 1,
                total_students: l.total_students + course.total_students
              }
            : l
        )
      );
    }
    
    alert(lecturerId === "" ? 'Lecturer unassigned!' : `Course assigned to ${lecturer?.name}`);
  };

  // ✅ RATING: Rate lecturers
  const rateLecturer = (lecturerId, rating) => {
    setRatings(prev => ({
      ...prev,
      [lecturerId]: rating
    }));
    const lecturer = lecturers.find(l => l.id === lecturerId);
    alert(`Rating submitted for ${lecturer?.name}: ${rating}/5`);
  };

  const getRatingText = (rating) => {
    const ratingsMap = {
      '5': 'Excellent',
      '4': 'Very Good',
      '3': 'Good',
      '2': 'Fair',
      '1': 'Poor'
    };
    return ratingsMap[rating] || 'Not rated';
  };

  const calculateStats = () => {
    return {
      totalCourses: courses.length,
      totalLecturers: lecturers.length,
      activeClasses: classes.length,
      unassignedCourses: courses.filter(c => !c.lecturer_name).length,
      pendingReports: reports.filter(r => r.status === 'Pending').length
    };
  };

  const stats = calculateStats();

  const styles = {
    container: { 
      padding: '20px', 
      backgroundColor: '#121212', 
      minHeight: '100vh',
      color: '#ffffff'
    },
    header: { 
      backgroundColor: '#1e1e1e', 
      padding: '20px', 
      borderRadius: '8px', 
      marginBottom: '20px', 
      border: '1px solid #333'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      marginBottom: '20px'
    },
    statCard: {
      backgroundColor: '#2a2a2a',
      padding: '15px',
      borderRadius: '6px',
      textAlign: 'center',
      border: '1px solid #333'
    },
    tabContainer: {
      backgroundColor: '#1e1e1e',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '20px'
    },
    tabHeader: {
      backgroundColor: '#2a2a2a',
      borderBottom: '1px solid #333',
      padding: '15px 20px'
    },
    tabButtons: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap'
    },
    tabButton: {
      padding: '10px 20px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#aaa',
      cursor: 'pointer',
      borderRadius: '4px',
      transition: 'all 0.3s'
    },
    tabButtonActive: {
      backgroundColor: '#333',
      color: '#fff'
    },
    tabContent: {
      padding: '20px'
    },
    table: { 
      width: '100%', 
      borderCollapse: 'collapse', 
      backgroundColor: '#1e1e1e'
    },
    th: { 
      backgroundColor: '#2a2a2a', 
      color: '#ffffff', 
      padding: '12px', 
      textAlign: 'left', 
      border: '1px solid #333',
      fontWeight: '600'
    },
    td: { 
      padding: '12px', 
      border: '1px solid #333', 
      textAlign: 'left',
      color: '#e0e0e0'
    },
    select: {
      width: '100%',
      padding: '8px',
      border: '1px solid #333',
      borderRadius: '4px',
      backgroundColor: '#2a2a2a',
      color: '#ffffff',
      fontSize: '12px'
    },
    input: {
      width: '100%',
      padding: '8px',
      border: '1px solid #333',
      borderRadius: '4px',
      backgroundColor: '#2a2a2a',
      color: '#ffffff',
      fontSize: '12px',
      marginBottom: '10px'
    },
    smallText: {
      color: '#b0b0b0',
      fontSize: '11px'
    },
    badge: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: 'bold'
    },
    badgeSuccess: {
      backgroundColor: '#4CAF50',
      color: '#ffffff'
    },
    badgeWarning: {
      backgroundColor: '#FF9800',
      color: '#ffffff'
    },
    badgeDanger: {
      backgroundColor: '#F44336',
      color: '#ffffff'
    },
    badgeSecondary: {
      backgroundColor: '#666666',
      color: '#ffffff'
    },
    button: {
      padding: '8px 12px',
      margin: '2px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '11px',
      fontWeight: '500'
    },
    primaryButton: {
      backgroundColor: '#ffffff',
      color: '#121212'
    },
    successButton: {
      backgroundColor: '#4CAF50',
      color: '#ffffff'
    },
    formSection: {
      backgroundColor: '#2a2a2a',
      padding: '15px',
      borderRadius: '6px',
      border: '1px solid #333',
      marginBottom: '20px'
    },
    monitoringCard: {
      backgroundColor: '#2a2a2a',
      padding: '15px',
      borderRadius: '6px',
      border: '1px solid #333',
      marginBottom: '15px'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{textAlign: 'center', paddingTop: '100px'}}>
          <p>Loading program leader dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{margin: '0 0 10px 0', color: '#ffffff'}}>Program Leader Dashboard</h2>
        <p style={{color: '#b0b0b0', margin: '0 0 15px 0'}}>FICT Program Management & Administration</p>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#ffffff'}}>{stats.totalCourses}</div>
          <div style={styles.smallText}>Total Courses</div>
        </div>
        <div style={styles.statCard}>
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#4CAF50'}}>{stats.totalLecturers}</div>
          <div style={styles.smallText}>Faculty Lecturers</div>
        </div>
        <div style={styles.statCard}>
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#ffffff'}}>{stats.activeClasses}</div>
          <div style={styles.smallText}>Active Classes</div>
        </div>
        <div style={styles.statCard}>
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#FF9800'}}>{stats.unassignedCourses}</div>
          <div style={styles.smallText}>Unassigned Courses</div>
        </div>
      </div>

      <div style={styles.tabContainer}>
        <div style={styles.tabHeader}>
          <div style={styles.tabButtons}>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'courses' ? styles.tabButtonActive : {})
              }}
              onClick={() => setActiveTab('courses')}
            >
              📚 Courses Management
            </button>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'lecturers' ? styles.tabButtonActive : {})
              }}
              onClick={() => setActiveTab('lecturers')}
            >
              👨‍🏫 Lecturer Management
            </button>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'reports' ? styles.tabButtonActive : {})
              }}
              onClick={() => setActiveTab('reports')}
            >
              📋 Program Reports
            </button>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'monitoring' ? styles.tabButtonActive : {})
              }}
              onClick={() => setActiveTab('monitoring')}
            >
              📊 Monitoring
            </button>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'classes' ? styles.tabButtonActive : {})
              }}
              onClick={() => setActiveTab('classes')}
            >
              👥 Classes
            </button>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'rating' ? styles.tabButtonActive : {})
              }}
              onClick={() => setActiveTab('rating')}
            >
              ⭐ Rating
            </button>
          </div>
        </div>

        <div style={styles.tabContent}>
          {/* ✅ COURSES: Add, assign lectures modules */}
          {activeTab === 'courses' && (
            <div>
              <div style={styles.formSection}>
                <h4 style={{color: '#ffffff', marginBottom: '15px'}}>Add New Course</h4>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px'}}>
                  <input
                    style={styles.input}
                    placeholder="Course Name *"
                    value={newCourse.course_name}
                    onChange={(e) => setNewCourse({...newCourse, course_name: e.target.value})}
                  />
                  <input
                    style={styles.input}
                    placeholder="Course Code *"
                    value={newCourse.course_code}
                    onChange={(e) => setNewCourse({...newCourse, course_code: e.target.value})}
                  />
                  <input
                    style={styles.input}
                    placeholder="Class Name *"
                    value={newCourse.class_name}
                    onChange={(e) => setNewCourse({...newCourse, class_name: e.target.value})}
                  />
                  <input
                    style={styles.input}
                    placeholder="Total Students"
                    type="number"
                    value={newCourse.total_students}
                    onChange={(e) => setNewCourse({...newCourse, total_students: e.target.value})}
                  />
                </div>
                <button 
                  style={{...styles.button, ...styles.successButton}}
                  onClick={addNewCourse}
                >
                  Add New Course
                </button>
              </div>

              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Course Details</th>
                    <th style={styles.th}>Class</th>
                    <th style={styles.th}>Students</th>
                    <th style={styles.th}>Assigned Lecturer</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Assign Lecturer</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(course => (
                    <tr key={course.course_id}>
                      <td style={styles.td}>
                        <strong style={{color: '#ffffff'}}>{course.course_name}</strong>
                        <br />
                        <div style={styles.smallText}>{course.course_code} • {course.credits} Credits</div>
                      </td>
                      <td style={styles.td}>{course.class_name}</td>
                      <td style={styles.td}>{course.total_students}</td>
                      <td style={styles.td}>
                        {course.lecturer_name || 'Not assigned'}
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.badge,
                          ...(course.status === 'Active' ? styles.badgeSuccess : styles.badgeWarning)
                        }}>
                          {course.status}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <select 
                          style={styles.select}
                          value={course.lecturer_id || ""}
                          onChange={(e) => assignCourse(course.course_id, e.target.value)}
                        >
                          <option value="">Select Lecturer</option>
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

          {/* ✅ LECTURERS: Lectures management */}
          {activeTab === 'lecturers' && (
            <div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Lecturer</th>
                    <th style={styles.th}>Contact</th>
                    <th style={styles.th}>Faculty</th>
                    <th style={styles.th}>Assigned Courses</th>
                    <th style={styles.th}>Total Students</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {lecturers.map(lecturer => (
                    <tr key={lecturer.id}>
                      <td style={styles.td}>
                        <strong style={{color: '#ffffff'}}>{lecturer.name}</strong>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.smallText}>{lecturer.email}</div>
                      </td>
                      <td style={styles.td}>{lecturer.faculty}</td>
                      <td style={styles.td}>{lecturer.assigned_courses}</td>
                      <td style={styles.td}>{lecturer.total_students}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.badge,
                          ...(lecturer.status === 'Active' ? styles.badgeSuccess : 
                              lecturer.status === 'Available' ? styles.badgeWarning : styles.badgeSecondary)
                        }}>
                          {lecturer.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ✅ REPORTS: View reports from PRL */}
          {activeTab === 'reports' && (
            <div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Report Type</th>
                    <th style={styles.th}>Description</th>
                    <th style={styles.th}>Submitted By</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Priority</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id}>
                      <td style={styles.td}>{report.type}</td>
                      <td style={styles.td}>{report.description}</td>
                      <td style={styles.td}>{report.submitted_by}</td>
                      <td style={styles.td}>{report.date}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.badge,
                          backgroundColor: 
                            report.priority === 'High' ? '#F44336' :
                            report.priority === 'Medium' ? '#FF9800' : '#4CAF50'
                        }}>
                          {report.priority}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.badge,
                          ...(report.status === 'Reviewed' ? styles.badgeSuccess : styles.badgeWarning)
                        }}>
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ✅ MONITORING: Program monitoring */}
          {activeTab === 'monitoring' && (
            <div>
              <div style={styles.monitoringCard}>
                <h4 style={{color: '#ffffff', marginBottom: '15px'}}>Program Performance Overview</h4>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px'}}>
                  <div>
                    <h5 style={{color: '#b0b0b0', marginBottom: '10px'}}>Course Assignment Rate</h5>
                    <div style={{fontSize: '24px', fontWeight: 'bold', color: '#4CAF50'}}>
                      {((courses.filter(c => c.lecturer_name).length / courses.length) * 100).toFixed(1)}%
                    </div>
                    <div style={styles.smallText}>Target: 95%</div>
                  </div>
                  <div>
                    <h5 style={{color: '#b0b0b0', marginBottom: '10px'}}>Lecturer Utilization</h5>
                    <div style={{fontSize: '24px', fontWeight: 'bold', color: '#4CAF50'}}>
                      {((lecturers.filter(l => l.assigned_courses > 0).length / lecturers.length) * 100).toFixed(1)}%
                    </div>
                    <div style={styles.smallText}>Target: 85%</div>
                  </div>
                  <div>
                    <h5 style={{color: '#b0b0b0', marginBottom: '10px'}}>Average Class Size</h5>
                    <div style={{fontSize: '24px', fontWeight: 'bold', color: '#FF9800'}}>
                      {Math.round(classes.reduce((sum, c) => sum + c.total_students, 0) / classes.length)}
                    </div>
                    <div style={styles.smallText}>Target: 40 students</div>
                  </div>
                </div>
              </div>

              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Program Metric</th>
                    <th style={styles.th}>Current Status</th>
                    <th style={styles.th}>Target</th>
                    <th style={styles.th}>Performance</th>
                    <th style={styles.th}>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.td}>Course Assignment Rate</td>
                    <td style={styles.td}>{((courses.filter(c => c.lecturer_name).length / courses.length) * 100).toFixed(1)}%</td>
                    <td style={styles.td}>95%</td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, ...styles.badgeSuccess}}>Good</span>
                    </td>
                    <td style={styles.td}>↑ Improving</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Lecturer Utilization</td>
                    <td style={styles.td}>{((lecturers.filter(l => l.assigned_courses > 0).length / lecturers.length) * 100).toFixed(1)}%</td>
                    <td style={styles.td}>85%</td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, ...styles.badgeSuccess}}>Good</span>
                    </td>
                    <td style={styles.td}>→ Stable</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Average Class Size</td>
                    <td style={styles.td}>{Math.round(classes.reduce((sum, c) => sum + c.total_students, 0) / classes.length)}</td>
                    <td style={styles.td}>40</td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, ...styles.badgeWarning}}>High</span>
                    </td>
                    <td style={styles.td}>↑ Increasing</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Report Response Rate</td>
                    <td style={styles.td}>{((reports.filter(r => r.status === 'Reviewed').length / reports.length) * 100).toFixed(1)}%</td>
                    <td style={styles.td}>90%</td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, ...styles.badgeSuccess}}>Good</span>
                    </td>
                    <td style={styles.td}>→ Stable</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* ✅ CLASSES: View all classes */}
          {activeTab === 'classes' && (
            <div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Class Group</th>
                    <th style={styles.th}>Course</th>
                    <th style={styles.th}>Lecturer</th>
                    <th style={styles.th}>Students</th>
                    <th style={styles.th}>Venue</th>
                    <th style={styles.th}>Schedule</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map(cls => (
                    <tr key={cls.id}>
                      <td style={styles.td}>
                        <strong style={{color: '#ffffff'}}>{cls.class_name}</strong>
                      </td>
                      <td style={styles.td}>{cls.course_name}</td>
                      <td style={styles.td}>{cls.lecturer_name}</td>
                      <td style={styles.td}>{cls.total_students}</td>
                      <td style={styles.td}>{cls.venue}</td>
                      <td style={styles.td}>{cls.schedule}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.badge,
                          ...styles.badgeSuccess
                        }}>
                          {cls.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ✅ RATING: Rate lecturers */}
          {activeTab === 'rating' && (
            <div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Lecturer</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Assigned Courses</th>
                    <th style={styles.th}>Total Students</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Performance Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {lecturers.map(lecturer => (
                    <tr key={lecturer.id}>
                      <td style={styles.td}>
                        <strong style={{color: '#ffffff'}}>{lecturer.name}</strong>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.smallText}>{lecturer.email}</div>
                      </td>
                      <td style={styles.td}>{lecturer.assigned_courses}</td>
                      <td style={styles.td}>{lecturer.total_students}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.badge,
                          ...(lecturer.status === 'Active' ? styles.badgeSuccess : 
                              lecturer.status === 'Available' ? styles.badgeWarning : styles.badgeSecondary)
                        }}>
                          {lecturer.status}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <select 
                          style={styles.select}
                          value={ratings[lecturer.id] || ''}
                          onChange={(e) => rateLecturer(lecturer.id, e.target.value)}
                        >
                          <option value="">Rate performance</option>
                          <option value="5">Excellent (5)</option>
                          <option value="4">Very Good (4)</option>
                          <option value="3">Good (3)</option>
                          <option value="2">Fair (2)</option>
                          <option value="1">Poor (1)</option>
                        </select>
                        {ratings[lecturer.id] && (
                          <div style={{...styles.smallText, marginTop: '5px', textAlign: 'center'}}>
                            <span style={{
                              ...styles.badge,
                              backgroundColor: 
                                ratings[lecturer.id] >= 4 ? '#4CAF50' :
                                ratings[lecturer.id] >= 3 ? '#FF9800' : '#F44336'
                            }}>
                              {ratings[lecturer.id]}/5 - {getRatingText(ratings[lecturer.id])}
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgramLeaderDashboard;