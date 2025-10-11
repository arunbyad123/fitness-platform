import React from 'react';

const DietCard = ({ plan, onSelect }) => {
  const getBadgeClass = (type) => {
    switch(type) {
      case 'bulk': return 'badge-bulk';
      case 'cut': return 'badge-cut';
      default: return 'badge-maintain';
    }
  };

  return (
    <div className="glass-card card-animated">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '700' }}>{plan.name}</h3>
        <span className={`badge ${getBadgeClass(plan.type)}`}>{plan.type}</span>
      </div>
      
      <p style={{ color: 'var(--gray)', marginBottom: '20px' }}>{plan.description}</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>
            {plan.calories}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--gray)' }}>Calories</div>
        </div>
        <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '10px' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--secondary)' }}>
            {plan.protein}g
          </div>
          <div style={{ fontSize: '12px', color: 'var(--gray)' }}>Protein</div>
        </div>
        <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(20, 184, 166, 0.1)', borderRadius: '10px' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent)' }}>
            {plan.carbs}g
          </div>
          <div style={{ fontSize: '12px', color: 'var(--gray)' }}>Carbs</div>
        </div>
        <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px' }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--warning)' }}>
            {plan.fats}g
          </div>
          <div style={{ fontSize: '12px', color: 'var(--gray)' }}>Fats</div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '16px', marginBottom: '10px' }}>Meals:</h4>
        {plan.meals && plan.meals.slice(0, 3).map((meal, idx) => (
          <div key={idx} style={{ 
            padding: '10px', 
            background: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: '8px', 
            marginBottom: '8px',
            fontSize: '14px'
          }}>
            <strong>{meal.name}</strong> - {meal.time}
          </div>
        ))}
      </div>

      <button 
        onClick={() => onSelect(plan)} 
        className="btn btn-primary" 
        style={{ width: '100%' }}
      >
        Select Plan
      </button>
    </div>
  );
};

export default DietCard;