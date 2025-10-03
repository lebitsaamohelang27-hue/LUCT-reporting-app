import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    faculty: "FICT",
    stream: "IT",
    role: "student",
    studentId: "",
    employeeId: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.email.includes('@')) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.role === 'student' && !formData.studentId) {
      newErrors.studentId = "Student ID is required";
    }

    if ((formData.role === 'lecturer' || formData.role === 'program_leader' || formData.role === 'principal_lecturer') && !formData.employeeId) {
      newErrors.employeeId = "Employee ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getStreamOptions = () => {
    if (formData.faculty === "FICT") {
      return ["IT", "CS", "SE", "Business IT", "Data Science", "Network Engineering"];
    } else if (formData.faculty === "FABE") {
      return ["Architecture", "Interior Design", "Civil Engineering", "Urban Planning", "Construction Management"];
    }
    return [];
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        role: formData.role,
        faculty: formData.faculty,
        stream: formData.stream,
        fullName: formData.fullName,
        id: Math.random().toString(36).substr(2, 9)
      }));

      setMessage("Registration successful! Redirecting to login...");
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container professional-auth">
        <div className="auth-header">
          <Link to="/" className="back-home">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
          <div className="auth-logo">
            <div className="logo-icon">🎓</div>
            <h1>Create Account</h1>
          </div>
          <p className="auth-subtitle">Join LUCT Reporting System</p>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Username</label>
            <div className="input-with-icon">
              <i className="fas fa-at"></i>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Faculty</label>
              <select 
                name="faculty" 
                value={formData.faculty}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="FICT">Faculty of ICT (FICT)</option>
                <option value="FABE">Faculty of Architecture (FABE)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Stream/Program</label>
              <select 
                name="stream" 
                value={formData.stream}
                onChange={handleChange}
                disabled={loading}
              >
                {getStreamOptions().map(stream => (
                  <option key={stream} value={stream}>{stream}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Role</label>
            <select 
              name="role" 
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="program_leader">Program Leader</option>
              <option value="principal_lecturer">Principal Lecturer</option>
            </select>
          </div>

          {formData.role === 'student' && (
            <div className="form-group">
              <label>Student ID</label>
              <div className="input-with-icon">
                <i className="fas fa-id-card"></i>
                <input
                  type="text"
                  name="studentId"
                  placeholder="Enter your student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              {errors.studentId && <span className="error-text">{errors.studentId}</span>}
            </div>
          )}

          {(formData.role === 'lecturer' || formData.role === 'program_leader' || formData.role === 'principal_lecturer') && (
            <div className="form-group">
              <label>Employee ID</label>
              <div className="input-with-icon">
                <i className="fas fa-id-badge"></i>
                <input
                  type="text"
                  name="employeeId"
                  placeholder="Enter your employee ID"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              {errors.employeeId && <span className="error-text">{errors.employeeId}</span>}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <div className="input-with-icon">
                <i className="fas fa-key"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-with-icon">
                <i className="fas fa-key"></i>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          </div>

          <button 
            type="submit" 
            className={`btn btn-primary btn-auth ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Creating Account...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i>
                Create Account
              </>
            )}
          </button>
          
          {message && (
            <div className={`message ${message.includes('successful') ? 'success-message' : 'error-message'}`}>
              {message}
            </div>
          )}
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;