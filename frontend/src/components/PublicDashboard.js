import React from 'react';

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
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              LUCT Academic Platform
            </h1>
            <p className="hero-subtitle">
              Comprehensive academic management system for Limkokwing University of Creative Technology Lesotho
            </p>
          </div>
        </div>
      </header>

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
                <div className="module-icon">
                  {module.icon}
                </div>
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

      <style jsx>{`
        .public-dashboard {
          background: #000000;
          color: #ffffff;
          min-height: 100vh;
        }

        /* Hero Section */
        .hero-section {
          padding: 3rem 1rem;
          background: #000000;
          color: #ffffff;
          text-align: center;
          border-bottom: 1px solid #333333;
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          color: #cccccc;
        }

        /* Features Section */
        .features-section {
          padding: 4rem 1rem;
          background: #000000;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: 2.2rem;
          margin-bottom: 0.8rem;
          color: #ffffff;
          font-weight: 600;
        }

        .section-header p {
          font-size: 1rem;
          color: #cccccc;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        /* Feature Cards */
        .feature-card {
          background: #1a1a1a;
          padding: 2rem;
          border-radius: 10px;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid #333333;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          border-color: #666666;
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .feature-card h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #ffffff;
          font-weight: 600;
        }

        .feature-card p {
          line-height: 1.6;
          color: #cccccc;
          font-size: 0.95rem;
        }

        /* Modules Section */
        .modules-section {
          padding: 4rem 1rem;
          background: #000000;
          border-top: 1px solid #333333;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        /* Module Cards */
        .module-card {
          background: #1a1a1a;
          padding: 2rem;
          border-radius: 10px;
          text-align: center;
          border: 1px solid #333333;
          transition: all 0.3s ease;
        }

        .module-card:hover {
          transform: translateY(-5px);
          border-color: #666666;
        }

        .module-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .module-content h3 {
          font-size: 1.3rem;
          margin-bottom: 1.2rem;
          color: #ffffff;
          font-weight: 600;
        }

        .module-features {
          list-style: none;
          padding: 0;
          text-align: left;
        }

        .module-features li {
          padding: 0.5rem 0;
          color: #cccccc;
          font-size: 0.95rem;
          border-bottom: 1px solid #333333;
        }

        .module-features li:last-child {
          border-bottom: none;
        }

        .feature-check {
          color: #ffffff;
          margin-right: 0.5rem;
          font-weight: bold;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .features-grid,
          .modules-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .features-section,
          .modules-section {
            padding: 2.5rem 1rem;
          }
          
          .section-header h2 {
            font-size: 1.8rem;
          }
          
          .feature-card,
          .module-card {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.8rem;
          }
          
          .hero-section {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PublicDashboard;