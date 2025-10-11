import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

function LecturerDashboard({ user }) {
  const [classes, setClasses] = useState([]);
  const [reports, setReports] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeTab, setActiveTab] = useState('classes');
  const [newReport, setNewReport] = useState({
    week_number: '',
    date_of_lecture: '',
    topic_taught: '',
    learning_outcomes: '',
    student_engagement_level: '',
    key_achievements: ''
  });

  useEffect(() => {
    fetchLecturerData();
  }, []);

  const fetchLecturerData = async () => {
    const mockClasses = [
      {
        id: 1,
        class_name: "BIT Year 2 - Group A",
        course_name: "Web Application Development",
        course_code: "DIWA2110",
        venue: "Lab 301",
        schedule_time: "Monday 10:00-12:00"
      },
      {
        id: 2,
        class_name: "BIT Year 3 - Group B",
        course_name: "Advanced Database Systems",
        course_code: "ADBS3101",
        venue: "Lab 302",
        schedule_time: "Wednesday 14:00-16:00"
      },
      {
        id: 3,
        class_name: "BIT Year 1 - Group C",
        course_name: "Introduction to Programming",
        course_code: "ITP1101",
        venue: "Lab 303",
        schedule_time: "Friday 09:00-11:00"
      }
    ];

    const mockReports = [
      {
        id: 1,
        class_name: "BIT Year 2 - Group A",
        course_name: "Web Application Development",
        week_number: 1,
        date_of_lecture: "2024-01-15",
        topic_taught: "React Component Architecture",
        student_engagement_level: "High",
        status: "Submitted"
      },
      {
        id: 2,
        class_name: "BIT Year 3 - Group B",
        course_name: "Advanced Database Systems",
        week_number: 1,
        date_of_lecture: "2024-01-17",
        topic_taught: "Database Normalization",
        student_engagement_level: "Medium",
        status: "Submitted"
      }
    ];

    const mockRatings = [
      {
        id: 1,
        class_name: "BIT Year 2 - Group A",
        rating: 4,
        comment: "Good engagement during practical session",
        date: "2024-01-15"
      },
      {
        id: 2,
        class_name: "BIT Year 3 - Group B", 
        rating: 3,
        comment: "Need more interactive examples",
        date: "2024-01-17"
      }
    ];

    setClasses(mockClasses);
    setReports(mockReports);
    setRatings(mockRatings);
  };

  const handleCreateReport = (classItem) => {
    setSelectedClass(classItem);
    setNewReport({
      week_number: '',
      date_of_lecture: '',
      topic_taught: '',
      learning_outcomes: '',
      student_engagement_level: '',
      key_achievements: ''
    });
    setShowReportForm(true);
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    
    const reportData = {
      id: reports.length + 1,
      class_name: selectedClass.class_name,
      course_name: selectedClass.course_name,
      course_code: selectedClass.course_code,
      week_number: newReport.week_number,
      date_of_lecture: newReport.date_of_lecture,
      topic_taught: newReport.topic_taught,
      learning_outcomes: newReport.learning_outcomes,
      student_engagement_level: newReport.student_engagement_level,
      key_achievements: newReport.key_achievements,
      status: "Submitted",
      created_at: new Date().toISOString()
    };

    setReports(prev => [reportData, ...prev]);
    setShowReportForm(false);
    alert('Academic report submitted successfully!');
  };

  const addRating = (class_name, rating, comment) => {
    const newRating = {
      id: ratings.length + 1,
      class_name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };
    setRatings(prev => [newRating, ...prev]);
    alert('Class rating submitted!');
  };

  const downloadReportsExcel = () => {
    if (reports.length === 0) {
      alert("No academic reports available to download");
      return;
    }

    const excelData = reports.map(report => ({
      'Academic Week': report.week_number,
      'Course': report.course_name,
      'Class Group': report.class_name,
      'Session Date': report.date_of_lecture,
      'Topic Covered': report.topic_taught,
      'Learning Outcomes': report.learning_outcomes,
      'Student Engagement': report.student_engagement_level,
      'Key Achievements': report.key_achievements
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Academic Reports");
    
    const fileName = `academic_reports_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  const downloadMonitoringExcel = () => {
    const excelData = ratings.map(rating => ({
      'Class': rating.class_name,
      'Rating': rating.rating,
      'Comments': rating.comment,
      'Date': rating.date
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Class Monitoring");
    
    const fileName = `class_monitoring_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

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
    button: { 
      padding: '8px 12px', 
      margin: '2px', 
      border: 'none', 
      borderRadius: '4px', 
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '12px'
    },
    primaryButton: { 
      backgroundColor: '#ffffff', 
      color: '#121212'
    },
    successButton: { 
      backgroundColor: '#4CAF50', 
      color: '#ffffff'
    },
    formGroup: { 
      marginBottom: '15px' 
    },
    label: { 
      display: 'block', 
      marginBottom: '5px', 
      fontWeight: '600',
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
      fontSize: '12px'
    },
    textarea: { 
      width: '100%', 
      padding: '8px', 
      border: '1px solid #333', 
      borderRadius: '4px', 
      minHeight: '60px', 
      resize: 'vertical',
      backgroundColor: '#2a2a2a',
      color: '#ffffff',
      fontSize: '12px'
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
    compactForm: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{margin: '0 0 10px 0', color: '#ffffff'}}>Lecturer Dashboard</h2>
        <p style={{color: '#b0b0b0', margin: '0 0 15px 0'}}>Class management and academic reporting</p>
        <div>
          <button style={{...styles.button, ...styles.primaryButton, marginRight: '10px'}} onClick={downloadReportsExcel}>
            Export Reports
          </button>
          <button style={{...styles.button, ...styles.successButton}} onClick={downloadMonitoringExcel}>
            Export Monitoring
          </button>
        </div>
      </div>

      {showReportForm && (
        <div style={styles.card}>
          <h3 style={{color: '#ffffff', marginBottom: '15px', fontSize: '16px'}}>
            Quick Report - {selectedClass?.class_name}
          </h3>
          <form onSubmit={handleSubmitReport}>
            <div style={styles.compactForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Week *</label>
                <input
                  style={styles.input}
                  type="number"
                  value={newReport.week_number}
                  onChange={(e) => setNewReport({...newReport, week_number: e.target.value})}
                  required
                  min="1"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Date *</label>
                <input
                  style={styles.input}
                  type="date"
                  value={newReport.date_of_lecture}
                  onChange={(e) => setNewReport({...newReport, date_of_lecture: e.target.value})}
                  required
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Topic *</label>
              <input
                style={styles.input}
                type="text"
                value={newReport.topic_taught}
                onChange={(e) => setNewReport({...newReport, topic_taught: e.target.value})}
                required
                placeholder="Main topic covered"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Learning Outcomes</label>
              <textarea
                style={styles.textarea}
                value={newReport.learning_outcomes}
                onChange={(e) => setNewReport({...newReport, learning_outcomes: e.target.value})}
                placeholder="Key learning objectives achieved"
              />
            </div>

            <div style={styles.compactForm}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Engagement Level *</label>
                <select
                  style={styles.select}
                  value={newReport.student_engagement_level}
                  onChange={(e) => setNewReport({...newReport, student_engagement_level: e.target.value})}
                  required
                >
                  <option value="">Select</option>
                  <option value="Excellent">Excellent</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Key Achievements</label>
              <textarea
                style={styles.textarea}
                value={newReport.key_achievements}
                onChange={(e) => setNewReport({...newReport, key_achievements: e.target.value})}
                placeholder="Notable successes"
              />
            </div>

            <div style={{marginTop: '15px', textAlign: 'right'}}>
              <button 
                type="button" 
                style={{...styles.button, backgroundColor: '#666', color: 'white', marginRight: '10px'}}
                onClick={() => setShowReportForm(false)}
              >
                Cancel
              </button>
              <button type="submit" style={{...styles.button, ...styles.successButton}}>
                Submit Report
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={styles.tabContainer}>
        <div style={styles.tabHeader}>
          <div style={styles.tabButtons}>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'classes' ? styles.tabButtonActive : {})
              }}
              onClick={() => setActiveTab('classes')}
            >
              My Classes
            </button>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'reports' ? styles.tabButtonActive : {})
              }}
              onClick={() => setActiveTab('reports')}
            >
              Reports ({reports.length})
            </button>
            <button 
              style={{
                ...styles.tabButton,
                ...(activeTab === 'monitoring' ? styles.tabButtonActive : {})
              }}
              onClick={() => setActiveTab('monitoring')}
            >
              Monitoring & Rating
            </button>
          </div>
        </div>

        <div style={styles.tabContent}>
          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Class</th>
                    <th style={styles.th}>Course</th>
                    <th style={styles.th}>Schedule</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map(cls => (
                    <tr key={cls.id}>
                      <td style={styles.td}>
                        <strong style={{color: '#ffffff'}}>{cls.class_name}</strong>
                        <br />
                        <div style={styles.smallText}>{cls.course_code}</div>
                      </td>
                      <td style={styles.td}>{cls.course_name}</td>
                      <td style={styles.td}>
                        <div style={styles.smallText}>{cls.schedule_time}</div>
                        <div style={styles.smallText}>{cls.venue}</div>
                      </td>
                      <td style={styles.td}>
                        <button 
                          style={{...styles.button, ...styles.primaryButton, marginBottom: '5px'}}
                          onClick={() => handleCreateReport(cls)}
                        >
                          Quick Report
                        </button>
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
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Class</th>
                    <th style={styles.th}>Week</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Topic</th>
                    <th style={styles.th}>Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id}>
                      <td style={styles.td}>
                        <strong style={{color: '#ffffff'}}>{report.class_name}</strong>
                        <br />
                        <div style={styles.smallText}>{report.course_code}</div>
                      </td>
                      <td style={styles.td}>Week {report.week_number}</td>
                      <td style={styles.td}>{report.date_of_lecture}</td>
                      <td style={styles.td}>
                        <div style={{maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                          {report.topic_taught}
                        </div>
                      </td>
                      <td style={styles.td}>
                        <div style={{
                          padding: '2px 6px',
                          borderRadius: '3px',
                          fontSize: '11px',
                          backgroundColor: 
                            report.student_engagement_level === 'Excellent' ? '#4CAF50' :
                            report.student_engagement_level === 'High' ? '#8BC34A' :
                            report.student_engagement_level === 'Medium' ? '#FFC107' : '#F44336',
                          color: '#ffffff',
                          textAlign: 'center'
                        }}>
                          {report.student_engagement_level}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Monitoring & Rating Tab */}
          {activeTab === 'monitoring' && (
            <div>
              <div style={{marginBottom: '20px'}}>
                <h4 style={{color: '#ffffff', marginBottom: '15px'}}>Rate Your Classes</h4>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
                  {classes.map(cls => (
                    <div key={cls.id} style={{...styles.card, padding: '15px'}}>
                      <h5 style={{color: '#ffffff', margin: '0 0 10px 0'}}>{cls.class_name}</h5>
                      <div style={styles.smallText}>{cls.course_name}</div>
                      <div style={{marginTop: '10px'}}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            style={{
                              ...styles.button,
                              backgroundColor: '#333',
                              color: '#fff',
                              margin: '2px'
                            }}
                            onClick={() => addRating(cls.class_name, star, 'Rated session')}
                          >
                            {star}★
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h4 style={{color: '#ffffff', marginBottom: '15px'}}>Rating History</h4>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Class</th>
                    <th style={styles.th}>Rating</th>
                    <th style={styles.th}>Comments</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.map(rating => (
                    <tr key={rating.id}>
                      <td style={styles.td}>{rating.class_name}</td>
                      <td style={styles.td}>
                        <div style={{color: '#FFD700'}}>
                          {'★'.repeat(rating.rating)}{'☆'.repeat(5 - rating.rating)}
                        </div>
                      </td>
                      <td style={styles.td}>{rating.comment}</td>
                      <td style={styles.td}>{rating.date}</td>
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

export default LecturerDashboard;