import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PublicDashboard from './components/PublicDashboard';
import Login from './components/Login';
import Register from './components/Register';
import StudentDashboard from './components/StudentDashboard';
import LecturerDashboard from './components/LecturerDashboard';
import ProgramLeaderDashboard from './components/ProgramLeaderDashboard';
import PrincipalLecturerDashboard from './components/PrincipalLecturerDashboard';
import ReportForm from './components/ReportForm';
import Layout from './layout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* PublicDashboard has its own header/footer with buttons */}
          <Route path="/" element={<PublicDashboard />} />
          
          {/* All other pages use Layout (logo + footer only) */}
          <Route path="/login" element={
            <Layout>
              <Login />
            </Layout>
          } />
          <Route path="/register" element={
            <Layout>
              <Register />
            </Layout>
          } />
          <Route path="/student-dashboard" element={
            <Layout>
              <StudentDashboard />
            </Layout>
          } />
          <Route path="/lecturer-dashboard" element={
            <Layout>
              <LecturerDashboard />
            </Layout>
          } />
          <Route path="/program-leader-dashboard" element={
            <Layout>
              <ProgramLeaderDashboard />
            </Layout>
          } />
          <Route path="/principal-lecturer-dashboard" element={
            <Layout>
              <PrincipalLecturerDashboard />
            </Layout>
          } />
          <Route path="/report-form" element={
            <Layout>
              <ReportForm />
            </Layout>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;