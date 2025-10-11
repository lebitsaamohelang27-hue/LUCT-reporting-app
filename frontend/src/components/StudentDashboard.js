import React, { useState, useEffect } from 'react';

function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      // Matching course data with Lecturer Dashboard
      const mockCourses = [
        {
          id: 1,
          class_name: "BIT 2A",
          course_name: "Web Application Development",
          course_code: "DIWA2110",
          lecturer_name: "Mohl. Thabo Moloi",
          schedule_time: "Monday 10:00-12:00",
          venue: "Lab 301",
          credits: 3
        },
        {
          id: 2,
          class_name: "BIT 3B", 
          course_name: "Advanced Database Systems",
          course_code: "ADBS3101",
          lecturer_name: "Mohl. 'Mabafokeng Mokoena",
          schedule_time: "Wednesday 14:00-16:00",
          venue: "Lab 302",
          credits: 3
        },
        {
          id: 3,
          class_name: "BIT 1C",
          course_name: "Introduction to Programming",
          course_code: "ITP1101",
          lecturer_name: "Mohl. Khoali Moshoeshoe",
          schedule_time: "Friday 09:00-11:00",
          venue: "Lab 303",
          credits: 3
        },
        {
          id: 4,
          class_name: "BIT 2D",
          course_name: "Mobile Application Development", 
          course_code: "MADV2105",
          lecturer_name: "Mohl. Lerato Motaung",
          schedule_time: "Tuesday 13:00-15:00",
          venue: "Lab 304",
          credits: 3
        }
      ];

      // Matching attendance data structure
      const mockAttendance = [
        {
          id: 1,
          class_name: "BIT 2A",
          course_name: "Web Application Development",
          week_number: 1,
          date_of_lecture: "2024-01-15",
          topic_covered: "React Component Architecture and State Management",
          present: true,
          student_engagement_level: "High"
        },
        {
          id: 2,
          class_name: "BIT 3B",
          course_name: "Advanced Database Systems", 
          week_number: 1,
          date_of_lecture: "2024-01-17",
          topic_covered: "Database Normalization and SQL Optimization",
          present: true,
          student_engagement_level: "Medium"
        },
        {
          id: 3,
          class_name: "BIT 1C",
          course_name: "Introduction to Programming",
          week_number: 1,
          date_of_lecture: "2024-01-19",
          topic_covered: "Python Basics and Syntax",
          present: false,
          student_engagement_level: "Low"
        },
        {
          id: 4,
          class_name: "BIT 2A",
          course_name: "Web Application Development",
          week_number: 2,
          date_of_lecture: "2024-01-22",
          topic_covered: "React Hooks and Context API",
          present: true,
          student_engagement_level: "High"
        }
      ];

      setCourses(mockCourses);
      setAttendance(mockAttendance);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitRating = async (courseId, rating) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setRatings(prev => ({
        ...prev,
        [courseId]: rating
      }));
      
      const course = courses.find(c => c.id === courseId);
      const ratingText = {
        '5': 'Excellent',
        '4': 'Very Good', 
        '3': 'Good',
        '2': 'Fair',
        '1': 'Poor'
      }[rating];
      
      alert(`Rating submitted for ${course?.course_name}: ${ratingText}`);
    } catch (err) {
      alert('Error submitting rating');
    }
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
    const totalCourses = courses.length;
    const totalSessions = attendance.length;
    const attendedSessions = attendance.filter(a => a.present).length;
    const attendanceRate = totalSessions > 0 ? Math.round((attendedSessions / totalSessions) * 100) : 0;
    const ratedCourses = Object.keys(ratings).length;

    return {
      totalCourses,
      totalSessions, 
      attendedSessions,
      attendanceRate,
      ratedCourses,
      missedSessions: totalSessions - attendedSessions
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
    card: { 
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
      gap: '10px'
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
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{textAlign: 'center', paddingTop: '100px'}}>
          <p>Loading student dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{margin: '0 0 10px 0', color: '#ffffff'}}>Student Dashboard - {user?.username}</h2>
        <p style={{color: '#b0b0b0', margin: '0 0 15px 0'}}>Academic monitoring and course management</p>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#ffffff'}}>{stats.totalCourses}</div>
          <div style={styles.smallText}>Enrolled Courses</div>
        </div>
        <div style={styles.statCard}>
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#4CAF50'}}>{stats.attendanceRate}%</div>
          <div style={styles.smallText}>Attendance Rate</div>
        </div>
        <div style={styles.statCard}>
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#ffffff'}}>{stats.ratedCourses}</div>
          <div style={styles.smallText}>Courses Rated</div>
        </div>
        <div style={styles.statCard}>
          <div style={{fontSize: '20px', fontWeight: 'bold', color: '#F44336'}}>{stats.missedSessions}</div>
          <div style={styles.smallText}>Sessions Missed</div>
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
              My Courses & Rating
            </button>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'monitoring' ? styles.tabButtonActive : {})
              }}
              onClick={() => setActiveTab('monitoring')}
            >
              Academic Monitoring
            </button>
          </div>
        </div>

        <div style={styles.tabContent}>
          {/* Courses & Rating Tab */}
          {activeTab === 'courses' && (
            <div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Class & Course</th>
                    <th style={styles.th}>Lecturer</th>
                    <th style={styles.th}>Schedule</th>
                    <th style={styles.th}>Course Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(course => (
                    <tr key={course.id}>
                      <td style={styles.td}>
                        <strong style={{color: '#ffffff'}}>{course.class_name}</strong>
                        <br />
                        <div style={styles.smallText}>{course.course_name}</div>
                        <div style={styles.smallText}>{course.course_code} • {course.credits} Credits</div>
                      </td>
                      <td style={styles.td}>
                        <div style={{color: '#ffffff'}}>{course.lecturer_name}</div>
                        <div style={styles.smallText}>{course.venue}</div>
                      </td>
                      <td style={styles.td}>
                        <div style={{color: '#ffffff'}}>{course.schedule_time}</div>
                      </td>
                      <td style={styles.td}>
                        <select 
                          style={styles.select}
                          value={ratings[course.id] || ''}
                          onChange={(e) => submitRating(course.id, e.target.value)}
                        >
                          <option value="">Rate course</option>
                          <option value="5">Excellent</option>
                          <option value="4">Very Good</option>
                          <option value="3">Good</option>
                          <option value="2">Fair</option>
                          <option value="1">Poor</option>
                        </select>
                        {ratings[course.id] && (
                          <div style={{...styles.smallText, marginTop: '5px', textAlign: 'center'}}>
                            <span style={{
                              ...styles.badge,
                              backgroundColor: 
                                ratings[course.id] >= 4 ? '#4CAF50' :
                                ratings[course.id] >= 3 ? '#FF9800' : '#F44336'
                            }}>
                              {ratings[course.id]}/5 - {getRatingText(ratings[course.id])}
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

          {/* Monitoring Tab */}
          {activeTab === 'monitoring' && (
            <div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Class & Course</th>
                    <th style={styles.th}>Week & Date</th>
                    <th style={styles.th}>Topic Covered</th>
                    <th style={styles.th}>Engagement</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map(record => (
                    <tr key={record.id}>
                      <td style={styles.td}>
                        <strong style={{color: '#ffffff'}}>{record.class_name}</strong>
                        <br />
                        <div style={styles.smallText}>{record.course_name}</div>
                      </td>
                      <td style={styles.td}>
                        <span style={{...styles.badge, ...styles.badgeSecondary}}>
                          Week {record.week_number}
                        </span>
                        <br />
                        <div style={styles.smallText}>{record.date_of_lecture}</div>
                      </td>
                      <td style={styles.td}>
                        <div style={{maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                          {record.topic_covered}
                        </div>
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.badge,
                          backgroundColor: 
                            record.student_engagement_level === 'High' ? '#4CAF50' :
                            record.student_engagement_level === 'Medium' ? '#FF9800' : '#F44336'
                        }}>
                          {record.student_engagement_level}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.badge,
                          ...(record.present ? styles.badgeSuccess : styles.badgeDanger)
                        }}>
                          {record.present ? 'Present' : 'Absent'}
                        </span>
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

export default StudentDashboard;