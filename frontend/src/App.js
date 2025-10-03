import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PublicDashboard from './components/PublicDashboard';
import StudentDashboard from './components/StudentDashboard';
import LecturerDashboard from './components/LecturerDashboard';
import PrincipalLecturerDashboard from './components/PrincipalLecturerDashboard';
import ProgramLeaderDashboard from './components/ProgramLeaderDashboard';
import ReportForm from './components/ReportForm';
import Dashboard from './components/Dashboard';
import './App.css';
import Layout from './layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PublicDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
          <Route path="/principal-lecturer-dashboard" element={<PrincipalLecturerDashboard />} />
          <Route path="/program-leader-dashboard" element={<ProgramLeaderDashboard />} />
          <Route path="/submit-report" element={<ReportForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;