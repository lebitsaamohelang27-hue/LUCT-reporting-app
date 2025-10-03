import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    faculty: "FICT",
    role: "student"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication
      if (formData.username && formData.password) {
        localStorage.setItem('token', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify({
          username: formData.username,
          role: formData.role,
          faculty: formData.faculty,
          id: Math.random().toString(36).substr(2, 9)
        }));

        // Redirect based on role
        const dashboardPaths = {
          student: '/student-dashboard',
          lecturer: '/lecturer-dashboard',
          program_leader: '/program-leader-dashboard',
          principal_lecturer: '/principal-lecturer-dashboard'
        };

        navigate(dashboardPaths[formData.role] || '/dashboard');
      } else {
        setError("Please fill in all fields");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
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
            <h1>LUCT Login</h1>
          </div>
          <p className="auth-subtitle">Access your account</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <div className="input-with-icon">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
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
                <option value="FICT">FICT</option>
                <option value="FABE">FABE</option>
              </select>
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
          </div>

          <button 
            type="submit" 
            className={`btn btn-primary btn-auth ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Signing In...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Sign In
              </>
            )}
          </button>
          
          {error && <div className="error-message">{error}</div>}
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Create one here</Link></p>
          <div className="auth-links">
            <a href="#forgot">Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;