import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">LUCT Reporting</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {role === "student" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/student">Dashboard</Link>
                </li>
              </>
            )}
            {role === "lecturer" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/lecturer">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/report-form">Report Form</Link>
                </li>
              </>
            )}
            {role === "prl" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/prl">Dashboard</Link>
                </li>
              </>
            )}
            {role === "pl" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/pl">Dashboard</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={() => localStorage.clear()}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
