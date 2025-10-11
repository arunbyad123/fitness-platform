import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">FitPro</Link>
        <div className="navbar-links">
          {isAdmin ? (
            <>
              <Link to="/admin" className="nav-link">Admin Panel</Link>
              <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/diet-plans" className="nav-link">Diet Plans</Link>
              <Link to="/trainers" className="nav-link">Trainers</Link>
              <Link to="/workout-analyzer" className="nav-link">AI Analyzer</Link>
              <span className="nav-link" style={{ color: 'var(--primary)' }}>
                {user?.name}
              </span>
              <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;