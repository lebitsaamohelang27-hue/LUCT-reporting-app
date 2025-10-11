import React, { useState, useEffect } from 'react';

function PrincipalLecturerDashboard({ user }) {
  const [reports, setReports] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('reports');
  const [feedbackText, setFeedbackText] = useState({});

  useEffect(() => {
    fetchPRLData();
  }, []);

  const fetchPRLData = async () => {
    try {
      // Mock data (same as before)
      const mockCourses = [
        {
          id: 1,
          course_name: "Web Application Development",
          course_code: "DIWA2110",
          lecturer_name: "Mohl. Thabo Moloi",
          total_students: 45,
          reports_count: 12,
          avg_attendance: 92,
          faculty: "FICT",
          stream: "IT"
        },
        {
          id: 2,
          course_name: "Database Management Systems",
          course_code: "DBMS2101",
          lecturer_name: "Mohl. 'Mabafokeng Mokoena",
          total_students: 38,
          reports_count: 10,
          avg_attendance: 88,
          faculty: "FICT",
          stream: "IT"
        },
        {
          id: 3,
          course_name: "Mobile Application Development",
          course_code: "MADV2105",
          lecturer_name: "Mohl. Khoali Moshoeshoe",
          total_students: 42,
          reports_count: 8,
          avg_attendance: 90,
          faculty: "FICT",
          stream: "IT"
        },
        {
          id: 4,
          course_name: "Software Engineering",
          course_code: "SENG2103",
          lecturer_name: "Mohl. Lerato Motaung",
          total_students: 35,
          reports_count: 15,
          avg_attendance: 85,
          faculty: "FICT",
          stream: "CS"
        }
      ];

      const mockLecturers = [
        {
          id: 1,
          name: "Mohl. Thabo Moloi",
          email: "t.moloi@luct.ac.ls",
          courses_count: 3,
          total_reports: 15,
          avg_attendance: 91,
          faculty: "FICT"
        },
        {
          id: 2,
          name: "Mohl. 'Mabafokeng Mokoena",
          email: "m.mokoena@luct.ac.ls",
          courses_count: 2,
          total_reports: 12,
          avg_attendance: 89,
          faculty: "FICT"
        },
        {
          id: 3,
          name: "Mohl. Khoali Moshoeshoe",
          email: "k.moshoeshoe@luct.ac.ls",
          courses_count: 2,
          total_reports: 10,
          avg_attendance: 87,
          faculty: "FICT"
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
          schedule: "Monday 10:00-12:00"
        },
        {
          id: 2,
          class_name: "BIT Year 3 - Group B",
          course_name: "Advanced Database Systems",
          lecturer_name: "Mohl. 'Mabafokeng Mokoena",
          total_students: 38,
          venue: "Lab 302",
          schedule: "Wednesday 14:00-16:00"
        },
        {
          id: 3,
          class_name: "BIT Year 1 - Group C",
          course_name: "Introduction to Programming",
          lecturer_name: "Mohl. Khoali Moshoeshoe",
          total_students: 52,
          venue: "Lab 303",
          schedule: "Friday 09:00-11:00"
        }
      ];

      const mockReports = [
        {
          id: 1,
          class_name: "BIT Year 2 - Group A",
          course_name: "Web Application Development",
          course_code: "DIWA2110",
          lecturer_name: "Mohl. Thabo Moloi",
          week_number: 1,
          date_of_lecture: "2024-01-15",
          topic_taught: "React Component Architecture and State Management",
          learning_outcomes: "Students understood basic React concepts and built their first component",
          recommendations: "Need to cover state management in next class",
          feedback: "",
          student_engagement_level: "High",
          status: "Pending Review"
        },
        {
          id: 2,
          class_name: "BIT Year 3 - Group B",
          course_name: "Advanced Database Systems",
          course_code: "ADBS3101",
          lecturer_name: "Mohl. 'Mabafokeng Mokoena",
          week_number: 1,
          date_of_lecture: "2024-01-17",
          topic_taught: "Database Normalization and SQL Optimization",
          learning_outcomes: "Students learned normalization techniques and query optimization",
          recommendations: "More practice with complex queries needed",
          feedback: "Good coverage of database concepts. Consider adding more practical examples.",
          student_engagement_level: "Medium",
          status: "Reviewed"
        },
        {
          id: 3,
          class_name: "BIT Year 1 - Group C",
          course_name: "Introduction to Programming",
          course_code: "ITP1101",
          lecturer_name: "Mohl. Khoali Moshoeshoe",
          week_number: 1,
          date_of_lecture: "2024-01-19",
          topic_taught: "Python Basics and Syntax",
          learning_outcomes: "Students grasped basic Python syntax and wrote simple programs",
          recommendations: "More practice with loops and conditionals needed",
          feedback: "Good foundational coverage. Consider adding more interactive examples.",
          student_engagement_level: "Low",
          status: "Reviewed"
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

  // Handle feedback text change
  const handleFeedbackChange = (reportId, text) => {
    setFeedbackText(prev => ({
      ...prev,
      [reportId]: text
    }));
  };

  // ✅ SUBMIT FEEDBACK with button
  const submitFeedback = (reportId) => {
    const feedback = feedbackText[reportId] || '';
    
    if (!feedback.trim()) {
      alert('Please enter feedback before submitting.');
      return;
    }

    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId 
          ? { ...report, feedback, status: 'Reviewed' }
          : report
      )
    );

    // Clear the feedback text for this report
    setFeedbackText(prev => ({
      ...prev,
      [reportId]: ''
    }));

    alert('Feedback submitted successfully!');
  };

  // ✅ RATING: Rate lecturer performance
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
      totalClasses: classes.length,
      pendingReviews: reports.filter(r => r.status === 'Pending Review').length,
      reviewedReports: reports.filter(r => r.status === 'Reviewed').length
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
    textarea: {
      width: '100%',
      padding: '8px',
      border: '1px solid #333',
      borderRadius: '4px',
      backgroundColor: '#2a2a2a',
      color: '#ffffff',
      resize: 'vertical',
      minHeight: '60px',
      fontSize: '12px',
      marginBottom: '8px'
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
    secondaryButton: {
      backgroundColor: '#666666',
      color: '#ffffff'
    },
    feedbackSection: {
      backgroundColor: '#2a2a2a',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #333',
      marginTop: '5px'
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{textAlign: 'center', paddingTop: '100px'}}>
          <p>Loading principal lecturer dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{margin: '0 0 10px 0', color: '#ffffff'}}>Principal Lecturer Dashboard</h2>
        <p style={{color: '#b0b0b0', margin: '0 0 15px 0'}}>Faculty of ICT - Academic Oversight</p>
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
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#ffffff'}}>{stats.totalClasses}</div>
          <div style={styles.smallText}>Active Classes</div>
        </div>
        <div style={styles.statCard}>
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#FF9800'}}>{stats.pendingReviews}</div>
          <div style={styles.smallText}>Pending Reviews</div>
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
              📚 Courses & Streams
            </button>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'reports' ? styles.tabButtonActive : {})
              }}
              onClick={() => setActiveTab('reports')}
            >
              📋 Reports & Feedback ({reports.length})
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
                ...(activeTab === 'rating' ? styles.tabButtonActive : {})
              }}
              onClick={() => setActiveTab('rating')}
            >
              ⭐ Rating
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
          </div>
        </div>

        <div style={styles.tabContent}>
          {/* ✅ COURSES: View all courses & lectures under his stream */}
          {activeTab === 'courses' && (
            <div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Course Details</th>
                    <th style={styles.th}>Lecturer</th>
                    <th style={styles.th}>Faculty & Stream</th>
                    <th style={styles.th}>Students</th>
                    <th style={styles.th}>Reports</th>
                    <th style={styles.th}>Avg Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(course => (
                    <tr key={course.id}>
                      <td style={styles.td}>
                        <strong style={{color: '#ffffff'}}>{course.course_name}</strong>
                        <br />
                        <div style={styles.smallText}>{course.course_code}</div>
                      </td>
                      <td style={styles.td}>{course.lecturer_name}</td>
                      <td style={styles.td}>
                        <div style={styles.smallText}>{course.faculty}</div>
                        <div style={styles.smallText}>{course.stream} Stream</div>
                      </td>
                      <td style={styles.td}>{course.total_students}</td>
                      <td style={styles.td}>{course.reports_count}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.badge,
                          backgroundColor: course.avg_attendance >= 90 ? '#4CAF50' :
                                         course.avg_attendance >= 80 ? '#FF9800' : '#F44336'
                        }}>
                          {course.avg_attendance}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ✅ REPORTS: View lectures reports & add feedback WITH SUBMIT BUTTONS */}
          {activeTab === 'reports' && (
            <div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Course & Class</th>
                    <th style={styles.th}>Lecturer</th>
                    <th style={styles.th}>Week & Date</th>
                    <th style={styles.th}>Topic</th>
                    <th style={styles.th}>Engagement</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Feedback Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id}>
                      <td style={styles.td}>
                        <strong style={{color: '#ffffff'}}>{report.course_name}</strong>
                        <br />
                        <div style={styles.smallText}>{report.course_code} - {report.class_name}</div>
                      </td>
                      <td style={styles.td}>{report.lecturer_name}</td>
                      <td style={styles.td}>
                        <span style={{...styles.badge, ...styles.badgeSecondary}}>
                          Week {report.week_number}
                        </span>
                        <br />
                        <div style={styles.smallText}>{report.date_of_lecture}</div>
                      </td>
                      <td style={styles.td}>
                        <div style={{maxWidth: '200px'}}>{report.topic_taught}</div>
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.badge,
                          backgroundColor: 
                            report.student_engagement_level === 'High' ? '#4CAF50' :
                            report.student_engagement_level === 'Medium' ? '#FF9800' : '#F44336'
                        }}>
                          {report.student_engagement_level}
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
                      <td style={styles.td}>
                        {report.status === 'Pending Review' ? (
                          <div style={styles.feedbackSection}>
                            <textarea 
                              style={styles.textarea}
                              placeholder="Enter your feedback for the lecturer..."
                              value={feedbackText[report.id] || ''}
                              onChange={(e) => handleFeedbackChange(report.id, e.target.value)}
                            />
                            <button 
                              style={{...styles.button, ...styles.successButton}}
                              onClick={() => submitFeedback(report.id)}
                            >
                              SUBMIT FEEDBACK
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div style={styles.smallText}>
                              <strong>Your Feedback:</strong>
                              <br />
                              {report.feedback}
                            </div>
                            <button 
                              style={{...styles.button, ...styles.secondaryButton, marginTop: '5px'}}
                              onClick={() => {
                                handleFeedbackChange(report.id, report.feedback);
                                setReports(prev => prev.map(r => r.id === report.id ? {...r, status: 'Pending Review'} : r));
                              }}
                            >
                              EDIT FEEDBACK
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ✅ MONITORING: Overall faculty monitoring */}
          {activeTab === 'monitoring' && (
            <div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Metric</th>
                    <th style={styles.th}>IT Stream</th>
                    <th style={styles.th}>CS Stream</th>
                    <th style={styles.th}>Overall</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={styles.td}>Total Courses</td>
                    <td style={styles.td}>{courses.filter(c => c.stream === 'IT').length}</td>
                    <td style={styles.td}>{courses.filter(c => c.stream === 'CS').length}</td>
                    <td style={styles.td}>{courses.length}</td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, ...styles.badgeSuccess}}>Good</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Average Attendance</td>
                    <td style={styles.td}>
                      {Math.round(courses.filter(c => c.stream === 'IT').reduce((sum, c) => sum + c.avg_attendance, 0) / courses.filter(c => c.stream === 'IT').length)}%
                    </td>
                    <td style={styles.td}>
                      {Math.round(courses.filter(c => c.stream === 'CS').reduce((sum, c) => sum + c.avg_attendance, 0) / courses.filter(c => c.stream === 'CS').length)}%
                    </td>
                    <td style={styles.td}>
                      {Math.round(courses.reduce((sum, c) => sum + c.avg_attendance, 0) / courses.length)}%
                    </td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, ...styles.badgeSuccess}}>Good</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Reports Submitted</td>
                    <td style={styles.td}>{courses.filter(c => c.stream === 'IT').reduce((sum, c) => sum + c.reports_count, 0)}</td>
                    <td style={styles.td}>{courses.filter(c => c.stream === 'CS').reduce((sum, c) => sum + c.reports_count, 0)}</td>
                    <td style={styles.td}>{courses.reduce((sum, c) => sum + c.reports_count, 0)}</td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, ...styles.badgeSuccess}}>Good</span>
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Pending Reviews</td>
                    <td style={styles.td}>{reports.filter(r => r.status === 'Pending Review' && courses.find(c => c.course_name === r.course_name)?.stream === 'IT').length}</td>
                    <td style={styles.td}>{reports.filter(r => r.status === 'Pending Review' && courses.find(c => c.course_name === r.course_name)?.stream === 'CS').length}</td>
                    <td style={styles.td}>{reports.filter(r => r.status === 'Pending Review').length}</td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, ...styles.badgeWarning}}>Needs Attention</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* ✅ RATING: Rate lecturer performance */}
          {activeTab === 'rating' && (
            <div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Lecturer</th>
                    <th style={styles.th}>Contact</th>
                    <th style={styles.th}>Courses</th>
                    <th style={styles.th}>Reports</th>
                    <th style={styles.th}>Avg Attendance</th>
                    <th style={styles.th}>Performance Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {lecturers.map(lecturer => (
                    <tr key={lecturer.id}>
                      <td style={styles.td}>
                        <strong style={{color: '#ffffff'}}>{lecturer.name}</strong>
                        <br />
                        <div style={styles.smallText}>{lecturer.faculty}</div>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.smallText}>{lecturer.email}</div>
                      </td>
                      <td style={styles.td}>{lecturer.courses_count}</td>
                      <td style={styles.td}>{lecturer.total_reports}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.badge,
                          backgroundColor: lecturer.avg_attendance >= 90 ? '#4CAF50' :
                                         lecturer.avg_attendance >= 80 ? '#FF9800' : '#F44336'
                        }}>
                          {lecturer.avg_attendance}%
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
                    <th style={styles.th}>Reports</th>
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
                        {reports.filter(r => r.class_name === cls.class_name).length}
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

export default PrincipalLecturerDashboard;