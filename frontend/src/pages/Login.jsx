import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(res.data.token, res.data.user, res.data.isAdmin);
      
      if (res.data.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Login failed'));
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="animated-bg" />
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '500px', width: '100%' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '10px', textAlign: 'center' }}>
            Welcome Back
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--gray)', marginBottom: '30px' }}>
            Login to continue your fitness journey
          </p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {message && (
              <div style={{ 
                padding: '12px', 
                background: 'rgba(239, 68, 68, 0.2)',
                borderRadius: '10px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                {message}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={{ 
            margin: '25px 0', 
            padding: '15px', 
            background: 'rgba(99, 102, 241, 0.1)', 
            borderRadius: '10px',
            fontSize: '13px'
          }}>
            <strong>Admin Login:</strong><br />
            Email: admin@fitpro.com<br />
            Password: Admin@123456
          </div>

          <p style={{ textAlign: 'center', color: 'var(--gray)' }}>
            Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '600' }}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;