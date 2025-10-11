import React from 'react';

const TrainerCard = ({ trainer, onContact }) => {
  return (
    <div className="glass-card card-animated">
      <div style={{ 
        width: '100%', 
        height: '200px', 
        background: `linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.3)), url(${trainer.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '12px',
        marginBottom: '20px'
      }} />
      
      <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>
        {trainer.name}
      </h3>
      
      <p style={{ color: 'var(--primary)', fontSize: '14px', marginBottom: '12px' }}>
        {trainer.specialty}
      </p>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', fontSize: '14px' }}>
        <div>
          <span style={{ color: 'var(--gray)' }}>Experience: </span>
          <strong>{trainer.experience} years</strong>
        </div>
        <div>
          <span style={{ color: 'var(--gray)' }}>Rating: </span>
          <strong style={{ color: 'var(--warning)' }}>⭐ {trainer.rating}</strong>
        </div>
      </div>

      <p style={{ color: 'var(--gray)', fontSize: '14px', marginBottom: '15px', lineHeight: '1.6' }}>
        {trainer.bio}
      </p>

      {trainer.certifications && trainer.certifications.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          {trainer.certifications.map((cert, idx) => (
            <span key={idx} style={{
              display: 'inline-block',
              padding: '4px 10px',
              background: 'rgba(99, 102, 241, 0.2)',
              borderRadius: '12px',
              fontSize: '12px',
              marginRight: '8px',
              marginBottom: '8px'
            }}>
              {cert}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => onContact(trainer)} 
          className="btn btn-primary" 
          style={{ flex: 1 }}
        >
          Contact
        </button>
        {trainer.price && (
          <div style={{
            padding: '12px 20px',
            background: 'rgba(16, 185, 129, 0.2)',
            borderRadius: '12px',
            fontWeight: '700',
            color: 'var(--success)'
          }}>
            ${trainer.price}/mo
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainerCard;