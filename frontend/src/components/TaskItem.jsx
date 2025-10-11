import React from 'react';

const TaskItem = ({ task, onComplete }) => {
  return (
    <div style={{
      padding: '20px',
      background: task.completed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
      border: `1px solid ${task.completed ? 'var(--success)' : 'rgba(255, 255, 255, 0.1)'}`,
      borderRadius: '12px',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      transition: 'all 0.3s ease'
    }}>
      <div 
        onClick={() => !task.completed && onComplete(task._id)}
        style={{ cursor: task.completed ? 'default' : 'pointer' }}
      >
        <div className={`checkbox-custom ${task.completed ? 'checked' : ''}`}>
          {task.completed && <span style={{ color: 'white', fontSize: '16px' }}>✓</span>}
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h4 style={{ 
          fontSize: '16px', 
          marginBottom: '5px',
          textDecoration: task.completed ? 'line-through' : 'none',
          opacity: task.completed ? 0.7 : 1
        }}>
          {task.title}
        </h4>
        <p style={{ fontSize: '14px', color: 'var(--gray)' }}>
          {task.description}
        </p>
        {task.targetCalories && (
          <div style={{ marginTop: '8px', fontSize: '12px' }}>
            <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.2)' }}>
              Target: {task.targetCalories} cal
            </span>
          </div>
        )}
      </div>

      <span className={`badge badge-${task.category}`} style={{
        background: task.category === 'diet' ? 'rgba(236, 72, 153, 0.2)' : 
                   task.category === 'workout' ? 'rgba(99, 102, 241, 0.2)' :
                   task.category === 'hydration' ? 'rgba(20, 184, 166, 0.2)' :
                   'rgba(245, 158, 11, 0.2)'
      }}>
        {task.category}
      </span>
    </div>
  );
};

export default TaskItem;