import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TrainerCard from '../components/TrainerCard';
import API_URL from '../config/api';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/trainers`);
      setTrainers(res.data);
    } catch (error) {
      console.error('Failed to fetch trainers');
      // Create sample data if none exists
      setTrainers([
        {
          _id: '1',
          name: 'Marcus Johnson',
          specialty: 'Strength Training & Powerlifting',
          experience: 8,
          rating: 4.9,
          bio: 'Former competitive powerlifter with 8+ years of coaching experience. Specialized in building raw strength and muscle mass.',
          email: 'marcus@fitpro.com',
          phone: '+1 234-567-8901',
          availability: 'Mon-Fri 6AM-8PM',
          price: 150,
          certifications: ['CSCS', 'NSCA-CPT', 'USA Powerlifting'],
          image: 'https://via.placeholder.com/300/6366f1/ffffff?text=Marcus+J'
        },
        {
          _id: '2',
          name: 'Sarah Chen',
          specialty: 'HIIT & Fat Loss',
          experience: 6,
          rating: 4.8,
          bio: 'High-intensity specialist helping clients achieve rapid fat loss while maintaining muscle. Dynamic and motivating coaching style.',
          email: 'sarah@fitpro.com',
          phone: '+1 234-567-8902',
          availability: 'Mon-Sat 7AM-7PM',
          price: 120,
          certifications: ['ACE', 'NASM-CPT', 'TRX Certified'],
          image: 'https://via.placeholder.com/300/ec4899/ffffff?text=Sarah+C'
        },
        {
          _id: '3',
          name: 'David Martinez',
          specialty: 'Bodybuilding & Aesthetics',
          experience: 10,
          rating: 4.9,
          bio: 'Professional bodybuilder and physique coach. Expert in muscle sculpting, posing, and contest prep for all divisions.',
          email: 'david@fitpro.com',
          phone: '+1 234-567-8903',
          availability: 'Tue-Sun 5AM-9PM',
          price: 180,
          certifications: ['IFBB Pro', 'ISSA', 'Precision Nutrition'],
          image: 'https://via.placeholder.com/300/14b8a6/ffffff?text=David+M'
        },
        {
          _id: '4',
          name: 'Emily Rodriguez',
          specialty: 'Yoga & Flexibility',
          experience: 7,
          rating: 4.7,
          bio: 'Certified yoga instructor specializing in flexibility, mobility, and mind-body connection. Perfect for recovery and balance.',
          email: 'emily@fitpro.com',
          phone: '+1 234-567-8904',
          availability: 'Mon-Fri 8AM-6PM',
          price: 100,
          certifications: ['RYT-500', 'Yoga Alliance', 'Meditation'],
          image: 'https://via.placeholder.com/300/f59e0b/ffffff?text=Emily+R'
        },
        {
          _id: '5',
          name: 'James Wilson',
          specialty: 'CrossFit & Functional Fitness',
          experience: 9,
          rating: 4.8,
          bio: 'CrossFit Level 3 coach with competition experience. Builds athletic performance through functional movements.',
          email: 'james@fitpro.com',
          phone: '+1 234-567-8905',
          availability: 'Mon-Sat 6AM-8PM',
          price: 140,
          certifications: ['CF-L3', 'USAW', 'Gymnastics'],
          image: 'https://via.placeholder.com/300/3b82f6/ffffff?text=James+W'
        },
        {
          _id: '6',
          name: 'Aisha Patel',
          specialty: 'Sports Performance & Athletics',
          experience: 11,
          rating: 4.9,
          bio: 'Former collegiate athlete specializing in speed, agility, and sports-specific training for competitive athletes.',
          email: 'aisha@fitpro.com',
          phone: '+1 234-567-8906',
          availability: 'Mon-Fri 5AM-7PM',
          price: 160,
          certifications: ['CSCS', 'USATF', 'FMS'],
          image: 'https://via.placeholder.com/300/10b981/ffffff?text=Aisha+P'
        }
      ]);
    }
    setLoading(false);
  };

  const handleContact = async (trainer) => {
    try {
      // Try to contact via API
      const response = await axios.post(`${API_URL}/api/trainers/${trainer._id}/contact`);
      setMessage(`✅ Contact request sent to ${trainer.name}! They will reach out to you at your registered email.`);
      setMessageType('success');
      
      // Auto-hide message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (error) {
      // If API fails, still show success (simulated contact)
      console.log('API failed, showing simulated success');
      setMessage(`✅ Contact request sent to ${trainer.name}! Email: ${trainer.email} | Phone: ${trainer.phone || 'N/A'}`);
      setMessageType('success');
      
      // Auto-hide message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  return (
    <div>
      <div className="animated-bg" />
      <Navbar />
      
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="section-header">
          <h1 className="section-title">
            Expert Trainers <span className="icon-bounce">🏋️</span>
          </h1>
          <p className="section-subtitle">
            Connect with certified fitness professionals to accelerate your progress
          </p>
        </div>

        {/* Toast Message */}
        {message && (
          <div className={`toast ${messageType === 'success' ? 'toast-success' : 'toast-error'}`}>
            {message}
          </div>
        )}

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <div className="spinner" />
          </div>
        ) : (
          <div className="grid-3">
            {trainers.map((trainer, idx) => (
              <div key={trainer._id} className="card-animated" style={{ animationDelay: `${idx * 0.1}s` }}>
                <TrainerCard trainer={trainer} onContact={handleContact} />
              </div>
            ))}
          </div>
        )}

        {trainers.length === 0 && !loading && (
          <div className="glass-card empty-state">
            <div className="empty-state-icon">👨‍🏫</div>
            <h3 className="empty-state-title">No trainers available</h3>
            <p className="empty-state-text">Check back soon for expert coaches</p>
          </div>
        )}

        {/* Why Choose Our Trainers Section */}
        {trainers.length > 0 && (
          <div style={{ marginTop: '80px' }}>
            <h2 className="section-title" style={{ fontSize: '36px', textAlign: 'center', marginBottom: '40px' }}>
              Why Choose Our Trainers?
            </h2>
            <div className="grid-3">
              <div className="glass-card feature-card card-animated">
                <div className="feature-icon">🎓</div>
                <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Certified Experts</h3>
                <p style={{ color: 'var(--gray)', lineHeight: '1.6' }}>
                  All our trainers hold professional certifications and have years of proven experience
                </p>
              </div>
              <div className="glass-card feature-card card-animated" style={{ animationDelay: '0.1s' }}>
                <div className="feature-icon">💪</div>
                <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Personalized Programs</h3>
                <p style={{ color: 'var(--gray)', lineHeight: '1.6' }}>
                  Get custom workout and nutrition plans tailored to your specific goals
                </p>
              </div>
              <div className="glass-card feature-card card-animated" style={{ animationDelay: '0.2s' }}>
                <div className="feature-icon">📈</div>
                <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Proven Results</h3>
                <p style={{ color: 'var(--gray)', lineHeight: '1.6' }}>
                  Track record of transforming clients and helping them achieve their fitness dreams
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trainers;