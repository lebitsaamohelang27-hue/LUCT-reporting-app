import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';

const PublicDashboard = () => {
  const features = [
    {
      icon: '📊',
      title: 'Real-time Reporting',
      description: 'Submit and track academic reports instantly.',
    },
    {
      icon: '👨‍🏫',
      title: 'Role-based Access',
      description: 'Different dashboards for students, lecturers, and administrators.',
    },
    {
      icon: '📈',
      title: 'Progress Analytics',
      description: 'Monitor academic performance and attendance patterns.',
    }
  ];

  const modules = [
    {
      role: 'Student',
      icon: '🎓',
      features: ['Course Tracking', 'Attendance', 'Progress Reports'],
    },
    {
      role: 'Lecturer',
      icon: '👨‍🏫',
      features: ['Report Submission', 'Class Management', 'Student Monitoring'],
    },
    {
      role: 'Program Leader',
      icon: '⚡',
      features: ['Course Management', 'Analytics', 'System Oversight'],
    }
  ];

  return (
    <div className="public-dashboard">
      {/* Custom Header for PublicDashboard Only */}
      <header className="public-header">
        <div className="header-content">
          <div className="logo-left">
            <img 
              src={logo} 
              alt="Limkokwing University of Creative Technology Lesotho"
              className="logo-img"
            />
          </div>
          <div className="buttons-right">
            <Link to="/register" className="btn btn-primary">
              Register Now
            </Link>
            <Link to="/login" className="btn btn-outline">
              Login to Your Account
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="public-hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                LUCT Academic
                <span className="hero-highlight"> Platform</span>
              </h1>
              <p className="hero-subtitle">
                Comprehensive academic management system for Limkokwing University of Creative Technology Lesotho
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Key Features</h2>
            <p>Essential tools for academic management</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="modules-section">
        <div className="section-container">
          <div className="section-header">
            <h2>User Roles</h2>
            <p>Access levels for different users</p>
          </div>
          <div className="modules-grid">
            {modules.map((module, index) => (
              <div key={index} className="module-card">
                <div className="module-icon">{module.icon}</div>
                <div className="module-content">
                  <h3>{module.role}</h3>
                  <ul className="module-features">
                    {module.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer for PublicDashboard Only */}
      <footer className="public-footer">
        <div className="footer-content">
          <p>&copy; 2024 Limkokwing University of Creative Technology Lesotho. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .public-dashboard {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #000000; /* ONLY THIS LINE CHANGED - now black background */
          color: white;
          font-family: Arial, sans-serif;
        }

        /* PublicDashboard Header - Logo left, buttons right */
        .public-header {
          background:  #707477ff;
          padding: 0.8rem 0;
        }
        .public-header .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo-img {
          height: 60px;
          width: auto;
        }
        .buttons-right {
          display: flex;
          gap: 0.8rem;
        }

        /* Button Styles */
        .btn {
          padding: 0.5rem 1.2rem;
          border-radius: 5px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-block;
          border: 2px solid transparent;
          text-align: center;
          font-size: 0.85rem;
                 background: #020c16ff;
        }
        .btn-primary {
     
          background: #020c16ff;
          color: #e5eaecff;
          border-color: #0e0105ff;
        }
        .btn-primary:hover {
          background: #0a0e13ff;

          border-color: #01070eff;
          transform: translateY(-2px);
        }
        .btn-outline {
          background: #01070eff;
          color: #f3f5f7ff;
          border: 2px solid white;
        }
        .btn-outline:hover {
           
          color: #f1eaeaff;
          border-color: #01060cff;
          transform: translateY(-2px);
        }

        /* Rest of your existing PublicDashboard styles... */
        .public-hero {
          padding: 2rem 1.5rem;
          background: #01080fff;
          text-align: center;
          border-radius: 8px;
          margin: 1rem;
        }
        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .hero-title {
          font-size: 2.2rem;
          margin-bottom: 0.8rem;
          font-weight: 700;
        }
        .hero-highlight {
          color: #f0ebebff;
        }
        .hero-subtitle {
          font-size: 1rem;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.5;
          opacity: 0.9;
        }
        .features-section {
          padding: 2rem 1.5rem;
          background: #010a13ff;
        }
        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .section-header h2 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        .section-header p {
          font-size: 0.9rem;
          opacity: 0.9;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem;
        }
        .feature-card {
          background: #f1f5f5ff;
          padding: 1.2rem;
          border-radius: 6px; 
          text-align: center;
          transition: transform 0.3s ease;
          border: 1px solid rgba(12, 12, 12, 0.1);
          color: #010a13ff;
        }
        .feature-card:hover {
          transform: translateY(-2px);
        }
        .feature-icon {
          font-size: 1.8rem;
          margin-bottom: 0.6rem;
        }
        .feature-card h3 {
          font-size: 1.1rem;
          margin-bottom: 0.6rem;
        }
        .feature-card p {
          line-height: 1.4;
          opacity: 0.9;
          font-size: 0.85rem;
        }
        .modules-section {
          padding: 2rem 1.5rem;
          background: #111111ff;
        }
        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem;
        }
        .module-card {
          background: #f4f5f7ff;
          padding: 1.2rem;
          border-radius: 6px;
          text-align: center;
          border: 1px solid rgba(14, 13, 13, 0.1);
          color: #010a13ff;
        }
        .module-icon {
          font-size: 1.8rem;
          margin-bottom: 0.6rem;
          color: #010a13ff;
        }
        .module-content h3 {
          font-size: 1.1rem;
          margin-bottom: 0.8rem;
          color: #010a13ff;
        }
        .module-features {
          list-style: none;
          padding: 0;
          text-align: left;
        }
        .module-features li {
          padding: 0.2rem 0;
          opacity: 0.9;
          font-size: 0.85rem;
        }
        .feature-check {
          color: #28a745;
          margin-right: 0.4rem;
          font-weight: bold;
        }
        .public-footer {
          background: #707477ff;
          padding: 1rem 0;
          margin-top: auto;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          text-align: center;
        }
        .footer-content p {
          opacity: 0.9;
          font-size: 0.85rem;
          color: #01080eff;
          margin: 0;
        }

        @media (max-width: 768px) {
          .public-header .header-content {
            flex-direction: column;
            gap: 0.8rem;
          }
          .buttons-right {
            flex-direction: column;
            width: 100%;
            max-width: 220px;
          }
          .buttons-right .btn {
            width: 100%;
          }
          .hero-title {
            font-size: 1.8rem;
          }
          .hero-subtitle {
            font-size: 0.9rem;
          }
          .features-grid,
          .modules-grid {
            grid-template-columns: 1fr;
            gap: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PublicDashboard;