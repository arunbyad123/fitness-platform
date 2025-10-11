import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      setUserId(res.data.userId);
      setMessage(`✅ OTP sent! (Check console: ${res.data.otp})`);
      setStep(2);
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Signup failed'));
    }
    setLoading(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/verify-otp', { userId, otp });
      setMessage('✅ Email verified! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Verification failed'));
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="animated-bg" />
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '500px', width: '100%' }}>
          <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '10px', textAlign: 'center' }}>
            Join FitPro
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--gray)', marginBottom: '30px' }}>
            Start your fitness journey today
          </p>

          {step === 1 ? (
            <form onSubmit={handleSignup}>
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

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
                  background: message.includes('❌') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  fontSize: '14px'
                }}>
                  {message}
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify}>
              <div className="input-group">
                <label>Enter OTP</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength="6"
                />
              </div>

              {message && (
                <div style={{ 
                  padding: '12px', 
                  background: message.includes('❌') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  fontSize: '14px'
                }}>
                  {message}
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>
            </form>
          )}

          <p style={{ textAlign: 'center', marginTop: '25px', color: 'var(--gray)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;