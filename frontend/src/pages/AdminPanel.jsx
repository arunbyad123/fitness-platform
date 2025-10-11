import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [dietPlans, setDietPlans] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [stats, setStats] = useState({ users: 0, dietPlans: 0, trainers: 0 });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchDietPlans();
    fetchTrainers();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/stats');
      setStats(res.data);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users');
    }
  };

  const fetchDietPlans = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/diet');
      setDietPlans(res.data);
    } catch (error) {
      console.error('Failed to fetch diet plans');
    }
  };

  const fetchTrainers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/trainers');
      setTrainers(res.data);
    } catch (error) {
      console.error('Failed to fetch trainers');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
        fetchUsers();
        fetchStats();
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  const handleDeleteDietPlan = async (id) => {
    if (window.confirm('Are you sure you want to delete this diet plan?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/diet-plans/${id}`);
        fetchDietPlans();
        fetchStats();
      } catch (error) {
        alert('Failed to delete diet plan');
      }
    }
  };

  const handleDeleteTrainer = async (id) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/trainers/${id}`);
        fetchTrainers();
        fetchStats();
      } catch (error) {
        alert('Failed to delete trainer');
      }
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setFormData({});
    setShowModal(true);
  };

  const handleAddDietPlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/admin/diet-plans', {
        ...formData,
        meals: formData.meals ? JSON.parse(formData.meals) : []
      });
      setShowModal(false);
      fetchDietPlans();
      fetchStats();
    } catch (error) {
      alert('Failed to add diet plan');
    }
    setLoading(false);
  };

  const handleAddTrainer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/admin/trainers', {
        ...formData,
        certifications: formData.certifications ? formData.certifications.split(',').map(c => c.trim()) : []
      });
      setShowModal(false);
      fetchTrainers();
      fetchStats();
    } catch (error) {
      alert('Failed to add trainer');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="animated-bg" />
      <Navbar />
      
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '900', 
            marginBottom: '15px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Admin Dashboard 👑
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--gray)' }}>
            Manage users, content, and platform settings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.users}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ background: 'linear-gradient(135deg, var(--accent), #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {stats.dietPlans}
            </div>
            <div className="stat-label">Diet Plans</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ background: 'linear-gradient(135deg, var(--warning), #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {stats.trainers}
            </div>
            <div className="stat-label">Trainers</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', borderBottom: '2px solid rgba(255, 255, 255, 0.1)', paddingBottom: '15px' }}>
          <button
            onClick={() => setActiveTab('users')}
            className={`btn ${activeTab === 'users' ? 'btn-primary' : ''}`}
            style={{ background: activeTab === 'users' ? undefined : 'transparent', border: 'none' }}
          >
            👥 Users
          </button>
          <button
            onClick={() => setActiveTab('diet')}
            className={`btn ${activeTab === 'diet' ? 'btn-primary' : ''}`}
            style={{ background: activeTab === 'diet' ? undefined : 'transparent', border: 'none' }}
          >
            🍎 Diet Plans
          </button>
          <button
            onClick={() => setActiveTab('trainers')}
            className={`btn ${activeTab === 'trainers' ? 'btn-primary' : ''}`}
            style={{ background: activeTab === 'trainers' ? undefined : 'transparent', border: 'none' }}
          >
            🏋️ Trainers
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="glass-card">
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '25px' }}>User Management</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                    <th style={{ padding: '15px', textAlign: 'left' }}>Joined</th>
                    <th style={{ padding: '15px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '15px' }}>{user.name}</td>
                      <td style={{ padding: '15px', color: 'var(--gray)' }}>{user.email}</td>
                      <td style={{ padding: '15px' }}>
                        <span className="badge" style={{ background: user.isVerified ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)' }}>
                          {user.isVerified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td style={{ padding: '15px', color: 'var(--gray)' }}>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '15px', textAlign: 'right' }}>
                        <button 
                          onClick={() => handleDeleteUser(user._id)}
                          className="btn btn-danger"
                          style={{ padding: '8px 16px', fontSize: '14px' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>
                  No users found
                </div>
              )}
            </div>
          </div>
        )}

        {/* Diet Plans Tab */}
        {activeTab === 'diet' && (
          <div>
            <div style={{ marginBottom: '25px', textAlign: 'right' }}>
              <button onClick={() => openModal('diet')} className="btn btn-primary">
                + Add Diet Plan
              </button>
            </div>
            <div className="grid-3">
              {dietPlans.map(plan => (
                <div key={plan._id} className="glass-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700' }}>{plan.name}</h3>
                    <span className={`badge badge-${plan.type}`}>{plan.type}</span>
                  </div>
                  <p style={{ color: 'var(--gray)', fontSize: '14px', marginBottom: '15px' }}>
                    {plan.description}
                  </p>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '13px', marginBottom: '15px' }}>
                    <span>{plan.calories} cal</span>
                    <span>•</span>
                    <span>{plan.protein}g protein</span>
                  </div>
                  <button 
                    onClick={() => handleDeleteDietPlan(plan._id)}
                    className="btn btn-danger"
                    style={{ width: '100%', padding: '10px' }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            {dietPlans.length === 0 && (
              <div className="glass-card" style={{ textAlign: 'center', padding: '60px' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🍎</div>
                <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>No diet plans yet</h3>
                <p style={{ color: 'var(--gray)' }}>Add your first diet plan</p>
              </div>
            )}
          </div>
        )}

        {/* Trainers Tab */}
        {activeTab === 'trainers' && (
          <div>
            <div style={{ marginBottom: '25px', textAlign: 'right' }}>
              <button onClick={() => openModal('trainer')} className="btn btn-primary">
                + Add Trainer
              </button>
            </div>
            <div className="grid-3">
              {trainers.map(trainer => (
                <div key={trainer._id} className="glass-card">
                  <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                    {trainer.name}
                  </h3>
                  <p style={{ color: 'var(--primary)', fontSize: '14px', marginBottom: '12px' }}>
                    {trainer.specialty}
                  </p>
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', fontSize: '14px' }}>
                    <div>
                      <span style={{ color: 'var(--gray)' }}>Exp: </span>
                      <strong>{trainer.experience}y</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--gray)' }}>Rating: </span>
                      <strong style={{ color: 'var(--warning)' }}>⭐ {trainer.rating}</strong>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteTrainer(trainer._id)}
                    className="btn btn-danger"
                    style={{ width: '100%', padding: '10px' }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            {trainers.length === 0 && (
              <div className="glass-card" style={{ textAlign: 'center', padding: '60px' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🏋️</div>
                <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>No trainers yet</h3>
                <p style={{ color: 'var(--gray)' }}>Add your first trainer</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '25px' }}>
              {modalType === 'diet' ? 'Add Diet Plan' : 'Add Trainer'}
            </h2>

            {modalType === 'diet' ? (
              <form onSubmit={handleAddDietPlan}>
                <div className="input-group">
                  <label>Plan Name</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.name || ''}onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Type</label>
                  <select
                    className="input-field"
                    value={formData.type || 'bulk'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="bulk">Bulk</option>
                    <option value="cut">Cut</option>
                    <option value="maintain">Maintain</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Calories</label>
                  <input
                    type="number"
                    className="input-field"
                    value={formData.calories || ''}
                    onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Protein (g)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={formData.protein || ''}
                    onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Carbs (g)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={formData.carbs || ''}
                    onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Fats (g)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={formData.fats || ''}
                    onChange={(e) => setFormData({ ...formData, fats: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Description</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., 12 weeks"
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Meals (JSON format)</label>
                  <textarea
                    className="input-field"
                    rows="4"
                    placeholder='[{"name":"Breakfast","time":"8:00 AM","items":["Oats","Eggs"],"calories":500}]'
                    value={formData.meals || ''}
                    onChange={(e) => setFormData({ ...formData, meals: e.target.value })}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Plan'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)} 
                    className="btn" 
                    style={{ flex: 1, background: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAddTrainer}>
                <div className="input-group">
                  <label>Trainer Name</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Specialty</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., Strength Training"
                    value={formData.specialty || ''}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Experience (years)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={formData.experience || ''}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Rating (0-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    className="input-field"
                    value={formData.rating || ''}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Bio</label>
                  <textarea
                    className="input-field"
                    rows="3"
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="input-field"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    className="input-field"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Availability</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., Mon-Fri 9AM-5PM"
                    value={formData.availability || ''}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Price ($/month)</label>
                  <input
                    type="number"
                    className="input-field"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Certifications (comma separated)</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., NASM-CPT, ACE, CSCS"
                    value={formData.certifications || ''}
                    onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  />
                </div>

                <div className="input-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Trainer'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)} 
                    className="btn" 
                    style={{ flex: 1, background: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;