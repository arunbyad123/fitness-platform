import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TaskItem from '../components/TaskItem';
import { AuthContext } from '../context/AuthContext';
import API_URL from '../config/api';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', category: 'diet', targetCalories: '' });
  const [stats, setStats] = useState({ totalTasks: 0, completed: 0, pending: 0 });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/diet/tasks`);
      setTasks(res.data);
      calculateStats(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks');
    }
  };

  const calculateStats = (taskList) => {
    setStats({
      totalTasks: taskList.length,
      completed: taskList.filter(t => t.completed).length,
      pending: taskList.filter(t => !t.completed).length
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/diet/task`, newTask);
      setShowTaskModal(false);
      setNewTask({ title: '', description: '', category: 'diet', targetCalories: '' });
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task');
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await axios.patch(`${API_URL}/api/diet/task/${taskId}/complete`, { actualCalories: 0 });
      fetchTasks();
    } catch (error) {
      console.error('Failed to complete task');
    }
  };

  return (
    <div>
      <div className="animated-bg" />
      <Navbar />
      
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: '56px', 
            fontWeight: '900', 
            marginBottom: '20px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome Back, {user?.name}! 💪
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--gray)', maxWidth: '600px', margin: '0 auto' }}>
            Track your fitness journey, crush your goals, and become the best version of yourself.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalTasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ background: 'linear-gradient(135deg, var(--success), #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {stats.completed}
            </div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ background: 'linear-gradient(135deg, var(--warning), #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {stats.pending}
            </div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.totalTasks > 0 ? Math.round((stats.completed / stats.totalTasks) * 100) : 0}%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '25px' }}>Quick Actions</h2>
          <div className="grid-3">
            <Link to="/diet-plans" style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🍎</div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Diet Plans</h3>
                <p style={{ color: 'var(--gray)', fontSize: '14px' }}>Explore nutrition plans for your goals</p>
              </div>
            </Link>

            <Link to="/trainers" style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🏋️</div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Find Trainers</h3>
                <p style={{ color: 'var(--gray)', fontSize: '14px' }}>Connect with expert fitness coaches</p>
              </div>
            </Link>

            <Link to="/workout-analyzer" style={{ textDecoration: 'none' }}>
              <div className="glass-card" style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🤖</div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>AI Analyzer</h3>
                <p style={{ color: 'var(--gray)', fontSize: '14px' }}>Get AI-powered workout insights</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Today's Tasks */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '700' }}>Today's Tasks</h2>
            <button onClick={() => setShowTaskModal(true)} className="btn btn-primary">
              + Add Task
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '60px' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📋</div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>No tasks yet</h3>
              <p style={{ color: 'var(--gray)' }}>Create your first task to start tracking your progress</p>
            </div>
          ) : (
            <div>
              {tasks.map(task => (
                <TaskItem key={task._id} task={task} onComplete={handleCompleteTask} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Task Creation Modal */}
      {showTaskModal && (
        <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '25px' }}>Create New Task</h2>
            <form onSubmit={handleCreateTask}>
              <div className="input-group">
                <label>Task Title</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g., Drink 3L water"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label>Description</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Optional details"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label>Category</label>
                <select
                  className="input-field"
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                >
                  <option value="diet">Diet</option>
                  <option value="workout">Workout</option>
                  <option value="hydration">Hydration</option>
                  <option value="sleep">Sleep</option>
                </select>
              </div>

              <div className="input-group">
                <label>Target Calories (optional)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="e.g., 2500"
                  value={newTask.targetCalories}
                  onChange={(e) => setNewTask({ ...newTask, targetCalories: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Create Task
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowTaskModal(false)} 
                  className="btn" 
                  style={{ flex: 1, background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;