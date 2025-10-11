import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './components/logo.png';

const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <div className="logo-left">
            <img 
              src={logo} 
              alt="Limkokwing University of Creative Technology Lesotho"
              className="logo-img"
            />
          </div>
          <div className="back-button-right">
            <button 
              className="btn btn-back"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <div className="footer-content">
          <p>&copy; 2024 Limkokwing University of Creative Technology Lesotho. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #020b14ff;
          color: white;
          font-family: Arial, sans-serif;
        }
        .layout-header {
          background: #abadafff;
          padding: 0.8rem 0;
        }
        .header-content {
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
        .btn-back {
          background: #020c16ff;
          color: white;
          border: 2px solid #f6f6f7ff;
          padding: 0.5rem 1.2rem;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .btn-back:hover {
          background: #0a0e13ff;
          border-color: #f1f4f7ff;
          transform: translateY(-2px);
        }
        .layout-main {
          flex: 1;
          padding: 1rem 0;
        }
        .layout-footer {
          background: #9fa2a5ff;
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
          .header-content {
            flex-direction: column;
            gap: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;