import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import DietCard from '../components/DietCard';

const DietPlans = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDietPlans();
  }, []);

  const fetchDietPlans = async () => {
    
    try {
      const res = await axios.get('http://localhost:5000/api/diet');
      setDietPlans(res.data);
    } catch (error) {
      console.error('Failed to fetch diet plans');
      // Create sample data if none exists
      setDietPlans([
        {
          _id: '1',
          name: 'Muscle Gain Pro',
          type: 'bulk',
          calories: 3200,
          protein: 180,
          carbs: 400,
          fats: 90,
          description: 'High-calorie plan designed for maximum muscle growth',
          duration: '12 weeks',
          meals: [
            { name: 'Breakfast', time: '8:00 AM', items: ['Oats', 'Eggs', 'Banana'], calories: 650 },
            { name: 'Lunch', time: '1:00 PM', items: ['Chicken', 'Rice', 'Vegetables'], calories: 850 },
            { name: 'Dinner', time: '7:00 PM', items: ['Salmon', 'Sweet Potato', 'Broccoli'], calories: 750 }
          ]
        },
        {
          _id: '2',
          name: 'Lean & Shredded',
          type: 'cut',
          calories: 2000,
          protein: 160,
          carbs: 150,
          fats: 60,
          description: 'Low-calorie plan for cutting fat while preserving muscle',
          duration: '8 weeks',
          meals: [
            { name: 'Breakfast', time: '8:00 AM', items: ['Greek Yogurt', 'Berries'], calories: 350 },
            { name: 'Lunch', time: '1:00 PM', items: ['Turkey', 'Quinoa', 'Salad'], calories: 550 },
            { name: 'Dinner', time: '7:00 PM', items: ['Tilapia', 'Asparagus'], calories: 450 }
          ]
        },
        {
          _id: '3',
          name: 'Balanced Maintenance',
          type: 'maintain',
          calories: 2500,
          protein: 150,
          carbs: 280,
          fats: 75,
          description: 'Well-rounded plan to maintain current physique',
          duration: 'Ongoing',
          meals: [
            { name: 'Breakfast', time: '8:00 AM', items: ['Smoothie Bowl', 'Nuts'], calories: 500 },
            { name: 'Lunch', time: '1:00 PM', items: ['Pasta', 'Chicken', 'Veggies'], calories: 700 },
            { name: 'Dinner', time: '7:00 PM', items: ['Steak', 'Rice', 'Salad'], calories: 650 }
          ]
        },
        {
          _id: '4',
          name: 'Mass Gainer Extreme',
          type: 'bulk',
          calories: 3800,
          protein: 200,
          carbs: 480,
          fats: 100,
          description: 'Extreme calorie surplus for hardgainers',
          duration: '16 weeks',
          meals: [
            { name: 'Breakfast', time: '7:00 AM', items: ['Pancakes', 'Protein Shake'], calories: 800 },
            { name: 'Lunch', time: '12:00 PM', items: ['Beef', 'Pasta', 'Bread'], calories: 1000 },
            { name: 'Dinner', time: '6:00 PM', items: ['Chicken', 'Rice', 'Avocado'], calories: 900 }
          ]
        },
        {
          _id: '5',
          name: 'Rapid Fat Loss',
          type: 'cut',
          calories: 1600,
          protein: 140,
          carbs: 100,
          fats: 50,
          description: 'Aggressive cutting plan for fast results',
          duration: '6 weeks',
          meals: [
            { name: 'Breakfast', time: '8:00 AM', items: ['Egg Whites', 'Spinach'], calories: 250 },
            { name: 'Lunch', time: '1:00 PM', items: ['Chicken Breast', 'Greens'], calories: 450 },
            { name: 'Dinner', time: '6:00 PM', items: ['Fish', 'Cauliflower Rice'], calories: 400 }
          ]
        },
        {
          _id: '6',
          name: 'Performance Fuel',
          type: 'maintain',
          calories: 2800,
          protein: 170,
          carbs: 320,
          fats: 80,
          description: 'Optimized for athletic performance and recovery',
          duration: 'Ongoing',
          meals: [
            { name: 'Breakfast', time: '7:30 AM', items: ['Oatmeal', 'Protein', 'Fruit'], calories: 600 },
            { name: 'Lunch', time: '12:30 PM', items: ['Turkey', 'Brown Rice', 'Veggies'], calories: 750 },
            { name: 'Dinner', time: '7:00 PM', items: ['Lean Beef', 'Potato', 'Salad'], calories: 700 }
          ]
        }
      ]);
    }
    setLoading(false);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const filteredPlans = filter === 'all' 
    ? dietPlans 
    : dietPlans.filter(plan => plan.type === filter);

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
            Nutrition Plans 🍎
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--gray)' }}>
            Choose the perfect diet plan to match your fitness goals
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setFilter('all')}
            className={`btn ${filter === 'all' ? 'btn-primary' : ''}`}
            style={{ background: filter === 'all' ? undefined : 'rgba(255, 255, 255, 0.1)' }}
          >
            All Plans
          </button>
          <button 
            onClick={() => setFilter('bulk')}
            className={`btn ${filter === 'bulk' ? 'btn-secondary' : ''}`}
            style={{ background: filter === 'bulk' ? undefined : 'rgba(255, 255, 255, 0.1)' }}
          >
            💪 Bulk
          </button>
          <button 
            onClick={() => setFilter('cut')}
            className={`btn ${filter === 'cut' ? 'btn-accent' : ''}`}
            style={{ background: filter === 'cut' ? undefined : 'rgba(255, 255, 255, 0.1)' }}
          >
            🔥 Cut
          </button>
          <button 
            onClick={() => setFilter('maintain')}
            className={`btn ${filter === 'maintain' ? 'btn-primary' : ''}`}
            style={{ background: filter === 'maintain' ? undefined : 'rgba(255, 255, 255, 0.1)' }}
          >
            ⚖️ Maintain
          </button>
        </div>

        {/* Diet Plans Grid */}
        {loading ? (
          <div className="spinner" />
        ) : (
          <div className="grid-3">
            {filteredPlans.map((plan, idx) => (
              <DietCard key={plan._id} plan={plan} onSelect={handleSelectPlan} />
            ))}
          </div>
        )}

        {filteredPlans.length === 0 && !loading && (
          <div className="glass-card" style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>No plans found</h3>
            <p style={{ color: 'var(--gray)' }}>Try a different filter</p>
          </div>
        )}
      </div>

      {/* Plan Details Modal */}
      {selectedPlan && (
        <div className="modal-overlay" onClick={() => setSelectedPlan(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '20px' }}>
              {selectedPlan.name}
            </h2>
            
            <div style={{ marginBottom: '25px' }}>
              <span className={`badge badge-${selectedPlan.type}`}>{selectedPlan.type}</span>
              <span style={{ marginLeft: '10px', color: 'var(--gray)' }}>Duration: {selectedPlan.duration}</span>
            </div>

            <p style={{ color: 'var(--gray)', marginBottom: '25px', lineHeight: '1.6' }}>
              {selectedPlan.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
              <div style={{ padding: '15px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--primary)' }}>
                  {selectedPlan.calories}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Total Calories</div>
              </div>
              <div style={{ padding: '15px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--secondary)' }}>
                  {selectedPlan.protein}g
                </div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Protein</div>
              </div>
              <div style={{ padding: '15px', background: 'rgba(20, 184, 166, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--accent)' }}>
                  {selectedPlan.carbs}g
                </div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Carbs</div>
              </div>
              <div style={{ padding: '15px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--warning)' }}>
                  {selectedPlan.fats}g
                </div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Fats</div>
              </div>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Daily Meals</h3>
            {selectedPlan.meals && selectedPlan.meals.map((meal, idx) => (
              <div key={idx} style={{
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong style={{ fontSize: '18px' }}>{meal.name}</strong>
                  <span style={{ color: 'var(--primary)' }}>{meal.time}</span>
                </div>
                <div style={{ color: 'var(--gray)', marginBottom: '8px' }}>
                  {meal.items.join(' • ')}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--accent)' }}>
                  {meal.calories} calories
                </div>
              </div>
            ))}

            <button 
              onClick={() => setSelectedPlan(null)} 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '20px' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlans;