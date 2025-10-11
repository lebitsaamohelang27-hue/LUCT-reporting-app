import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.username.trim()) {
      setError("Username is required");
      setLoading(false);
      return;
    }

    if (!formData.fullName.trim()) {
      setError("Full name is required");
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      // Check if username already exists
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const usernameExists = existingUsers.some(user => user.username === formData.username);
      
      if (usernameExists) {
        setError("Username already exists. Please choose a different one.");
        setLoading(false);
        return;
      }

      // Check if email already exists
      const emailExists = existingUsers.some(user => user.email === formData.email);
      if (emailExists) {
        setError("Email already registered. Please use a different email.");
        setLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create new user
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        createdAt: new Date().toISOString(),
        isActive: true
      };

      // Save to registered users
      existingUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

      // Create session
      const token = `mock-jwt-token-${Date.now()}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
        id: newUser.id,
        loginTime: new Date().toISOString()
      }));

      // Redirect to appropriate dashboard
      const dashboardPaths = {
        student: '/student-dashboard',
        lecturer: '/lecturer-dashboard',
        program_leader: '/program-leader-dashboard',
        principal_lecturer: '/principal-lecturer-dashboard'
      };

      navigate(dashboardPaths[formData.role] || '/dashboard');

    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Card Header */}
        <div className="auth-card-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join the LUCT Academic Platform</p>
        </div>

        {/* Card Body */}
        <div className="auth-card-body">
          <form onSubmit={handleSubmit}>
            {/* Username Field - FIRST */}
            <div className="form-group">
              <label className="form-label">Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
                disabled={loading}
                className="form-input"
                autoComplete="username"
              />
            </div>

            {/* Full Name Field - SECOND */}
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={loading}
                className="form-input"
                autoComplete="name"
              />
            </div>

            {/* Email Field - THIRD */}
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={loading}
                className="form-input"
                autoComplete="email"
              />
            </div>

            {/* Password Field - FOURTH */}
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password (min. 6 characters)"
                required
                disabled={loading}
                className="form-input"
                autoComplete="new-password"
              />
            </div>

            {/* Confirm Password Field - FIFTH */}
            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                disabled={loading}
                className="form-input"
                autoComplete="new-password"
              />
            </div>

            {/* Role Selection - SIXTH */}
            <div className="form-group">
              <label className="form-label">Role *</label>
              <select 
                name="role" 
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
                className="form-select"
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
                <option value="program_leader">Program Leader</option>
                <option value="principal_lecturer">Principal Lecturer</option>
              </select>
            </div>

            <button 
              type="submit" 
              className={`btn-auth ${loading ? 'btn-loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            {error && <div className="error-message">{error}</div>}

            

            <div className="auth-links">
              <p>
                 
                <Link to="/login" className="auth-link">
                 Already have an account?{' '} Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        .auth-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #000000;
          padding: 2rem 1rem;
        }

        .auth-card {
          max-width: 450px;
          width: 100%;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border: 1px solid #333333;
          overflow: hidden;
        }

        .auth-card-header {
          background: #1a1a1a;
          padding: 2rem 2.5rem;
          text-align: center;
          border-bottom: 1px solid #333333;
        }

        .auth-card-body {
          padding: 2.5rem;
          background: #ffffff;
        }

        .auth-title {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          color: #ffffff;
          font-weight: 700;
        }

        .auth-subtitle {
          color: #cccccc;
          font-size: 1rem;
          font-weight: 400;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          color: #000000;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .form-input {
          width: 100%;
          background-color: #ffffff;
          border: 2px solid #e0e0e0;
          color: #000000;
          padding: 0.75rem 1rem;
          height: 50px;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .form-input:focus {
          border-color: #000000;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
          outline: none;
        }

        .form-select {
          width: 100%;
          background-color: #ffffff;
          border: 2px solid #e0e0e0;
          color: #000000;
          padding: 0.75rem 1rem;
          height: 50px;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          cursor: pointer;
        }

        .form-select:focus {
          border-color: #000000;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
          outline: none;
        }

        .btn-auth {
          width: 100%;
          height: 55px;
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 1rem;
          border-radius: 8px;
          background: #000000;
          border: 2px solid #000000;
          color: #ffffff;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        .btn-auth:hover {
          background: #333333;
          border-color: #333333;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .btn-loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-loading:hover {
          transform: none;
          box-shadow: none;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid transparent;
          border-top: 2px solid #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .error-message {
          color: #dc2626;
          margin-top: 1rem;
          text-align: center;
          font-weight: 500;
          padding: 0.75rem;
          background: #fef2f2;
          border-radius: 6px;
          border: 1px solid #fecaca;
        }

        .demo-info {
          margin-top: 1rem;
          padding: 0.75rem;
          background: #f0f9ff;
          border-radius: 6px;
          border: 1px solid #bae6fd;
          text-align: center;
        }

        .demo-info p {
          margin: 0;
          color: #0369a1;
          font-size: 0.85rem;
        }

        .auth-links {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e0e0e0;
        }

        .auth-link {
          color: #000000;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .auth-link:hover {
          color: #666666;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .auth-card {
            margin: 1rem;
          }
          
          .auth-card-header {
            padding: 1.5rem 2rem;
          }
          
          .auth-card-body {
            padding: 2rem 1.5rem;
          }
          
          .auth-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;