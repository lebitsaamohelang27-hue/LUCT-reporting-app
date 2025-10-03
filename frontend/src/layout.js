// src/layout.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './components/logo.png';

const Layout = ({ children }) => {
  const location = useLocation();

  // Check if current page is public dashboard to adjust styling
  const isPublicDashboard = location.pathname === '/';

  return (
    <div className="app-layout">
      {/* Navigation Bar */}
      <nav className="navigation">
        <div className="nav-content">
          <div className="nav-logo">
            <img 
              src={logo} 
              alt="Limkokwing University of Creative Technology Lesotho"
              className="nav-logo-img"
            />
          </div>
          <div className="nav-buttons">
            {isPublicDashboard ? (
              <>
                <Link to="/register" className="btn btn-primary">
                  Register Now
                </Link>
                <Link to="/login" className="btn btn-outline">
                  Login to Your Account
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="btn btn-outline">
                  Home
                </Link>
                <Link to="/dashboard" className="btn btn-primary">
                  My Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="public-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">🎓</div>
              <div className="footer-info">
                Limkokwing University of Creative Technology Lesotho
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2024 Limkokwing University of Creative Technology Lesotho. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .app-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #000000;
        }

        .main-content {
          flex: 1;
          background: #000000;
        }

        /* Navigation Styles */
        .navigation {
          background: #000000;
          padding: 0.8rem 0;
          border-bottom: 1px solid #333333;
        }

        .nav-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo-img {
          height: 35px;
          width: auto;
        }

        .nav-buttons {
          display: flex;
          gap: 0.8rem;
        }

        /* Button Styles */
        .btn {
          padding: 0.5rem 1.2rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-block;
          border: 2px solid transparent;
          text-align: center;
          font-size: 0.8rem;
          cursor: pointer;
        }

        .btn-primary {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
        }

        .btn-primary:hover {
          background: #cccccc;
          border-color: #cccccc;
          transform: translateY(-1px);
        }

        .btn-outline {
          background: transparent;
          color: #ffffff;
          border: 2px solid #ffffff;
        }

        .btn-outline:hover {
          background: #ffffff;
          color: #000000;
          transform: translateY(-1px);
        }

        /* Footer Styles */
        .public-footer {
          background-color: #000000;
          color: #cccccc;
          padding: 1.5rem 0;
          text-align: center;
          width: 100%;
          border-top: 1px solid #333333;
          margin-top: auto;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .footer-logo {
          font-size: 1.5rem;
          margin-right: 1rem;
          color: #ffffff;
        }

        .footer-info {
          color: #ffffff;
          font-weight: 500;
        }

        .footer-bottom {
          font-size: 0.8rem;
          width: 100%;
          border-top: 1px solid #333333;
          padding-top: 1rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-content {
            flex-direction: column;
            gap: 1rem;
          }
          
          .nav-buttons {
            flex-direction: column;
            width: 100%;
            max-width: 220px;
          }
          
          .nav-buttons .btn {
            width: 100%;
          }
          
          .footer-brand {
            flex-direction: column;
            text-align: center;
          }
          
          .footer-logo {
            margin-right: 0;
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;