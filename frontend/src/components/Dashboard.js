import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgramLeaderDashboard from './ProgramLeaderDashboard';
import PrincipalLecturerDashboard from './PrincipalLecturerDashboard';
import LecturerDashboard from './LecturerDashboard';
import StudentDashboard from './StudentDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    if (!userData || !token) {
      navigate('/login');
      return;
    }
    
    setUser(userData);
    setRole(userData.role);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const getFacultyFullName = (facultyCode) => {
    const faculties = {
      'FICT': 'Faculty of Information Communication Technology',
      'FABE': 'Faculty of Architecture and Built Environment'
    };
    return faculties[facultyCode] || facultyCode;
  };

  const getRoleDisplayName = (role) => {
    const roles = {
      'student': 'Student',
      'lecturer': 'Lecturer',
      'program_leader': 'Program Leader',
      'principal_lecturer': 'Principal Lecturer'
    };
    return roles[role] || role;
  };

  const renderDashboard = () => {
    switch (role) {
      case 'program_leader':
        return <ProgramLeaderDashboard user={user} />;
      case 'principal_lecturer':
        return <PrincipalLecturerDashboard user={user} />;
      case 'lecturer':
        return <LecturerDashboard user={user} />;
      case 'student':
        return <StudentDashboard user={user} />;
      default:
        return (
          <div className="container mt-4">
            <div className="card">
              <div className="card-body text-center">
                <h3>Welcome to LUCT Reporting System</h3>
                <p>Please select a valid role or contact administrator.</p>
                <button onClick={handleLogout} className="btn btn-primary">
                  Back to Login
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  if (!user) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-large"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand">
            <i className="fas fa-graduation-cap me-2"></i>
            LUCT Reporting System
          </span>
          <div className="navbar-nav ms-auto d-flex align-items-center">
            <div className="user-info me-3 text-light">
              <small>
                <strong>{user.username}</strong> | 
                <span className={`role-badge role-${user.role}`}>
                  {getRoleDisplayName(user.role)}
                </span> | 
                {getFacultyFullName(user.faculty)}
              </small>
            </div>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-1"></i>
              Logout
            </button>
          </div>
        </div>
      </nav>
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;