import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const WorkoutAnalyzer = () => {
  const [workoutData, setWorkoutData] = useState({
    exercise: '',
    sets: '',
    reps: '',
    weight: '',
    duration: ''
  });
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeWorkout = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate AI analysis
    setTimeout(() => {
      const volume = parseInt(workoutData.sets) * parseInt(workoutData.reps) * parseFloat(workoutData.weight);
      const intensity = (parseFloat(workoutData.weight) / (parseInt(workoutData.reps) * 2.5)) * 100;
      
      setAnalysis({
        totalVolume: volume,
        intensity: Math.min(intensity, 100).toFixed(1),
        recommendations: [
          volume > 5000 ? 'High volume detected - ensure adequate recovery' : 'Consider increasing volume for better gains',
          intensity > 80 ? 'Great intensity! This promotes strength gains' : 'Try increasing weight for better intensity',
          parseInt(workoutData.sets) < 3 ? 'Add more sets for optimal muscle growth' : 'Good set range for hypertrophy',
          'Progressive overload: aim to add 2.5-5lbs next session'
        ],
        caloriesBurned: Math.round((volume / 100) + (parseInt(workoutData.duration) || 0) * 5),
        muscleGroups: getTargetedMuscles(workoutData.exercise),
        nextSession: generateNextSession(workoutData)
      });
      setLoading(false);
    }, 1500);
  };

  const getTargetedMuscles = (exercise) => {
    const muscles = {
      'bench press': ['Chest', 'Triceps', 'Shoulders'],
      'squat': ['Quads', 'Glutes', 'Hamstrings'],
      'deadlift': ['Back', 'Glutes', 'Hamstrings'],
      'pull up': ['Back', 'Biceps', 'Forearms'],
      'overhead press': ['Shoulders', 'Triceps', 'Core']
    };
    
    const key = Object.keys(muscles).find(k => exercise.toLowerCase().includes(k));
    return muscles[key] || ['Full Body'];
  };

  const generateNextSession = (data) => {
    return {
      sets: parseInt(data.sets),
      reps: parseInt(data.reps),
      weight: (parseFloat(data.weight) + 2.5).toFixed(1)
    };
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
            AI Workout Analyzer 🤖
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--gray)' }}>
            Get intelligent insights and recommendations for your workouts
          </p>
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="grid-2" style={{ gap: '40px' }}>
            {/* Input Form */}
            <div className="glass-card">
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '25px' }}>
                Enter Workout Details
              </h2>
              
              <form onSubmit={analyzeWorkout}>
                <div className="input-group">
                  <label>Exercise Name</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., Bench Press"
                    value={workoutData.exercise}
                    onChange={(e) => setWorkoutData({ ...workoutData, exercise: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Number of Sets</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="e.g., 4"
                    value={workoutData.sets}
                    onChange={(e) => setWorkoutData({ ...workoutData, sets: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Reps per Set</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="e.g., 10"
                    value={workoutData.reps}
                    onChange={(e) => setWorkoutData({ ...workoutData, reps: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Weight (lbs)</label>
                  <input
                    type="number"
                    step="0.5"
                    className="input-field"
                    placeholder="e.g., 185"
                    value={workoutData.weight}
                    onChange={(e) => setWorkoutData({ ...workoutData, weight: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Duration (minutes)</label>
                  <input
                    type="number"
                    className="input-field"
                    placeholder="e.g., 30"
                    value={workoutData.duration}
                    onChange={(e) => setWorkoutData({ ...workoutData, duration: e.target.value })}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%' }}
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : 'Analyze Workout'}
                </button>
              </form>
            </div>

            {/* Analysis Results */}
            <div>
              {!analysis && !loading && (
                <div className="glass-card" style={{ textAlign: 'center', padding: '60px' }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>📊</div>
                  <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Ready to Analyze</h3>
                  <p style={{ color: 'var(--gray)' }}>Enter your workout details to get AI-powered insights</p>
                </div>
              )}

              {loading && (
                <div className="glass-card" style={{ textAlign: 'center', padding: '60px' }}>
                  <div className="spinner" />
                  <p style={{ marginTop: '20px', color: 'var(--gray)' }}>Analyzing your workout...</p>
                </div>
              )}

              {analysis && !loading && (
                <div className="glass-card card-animated">
                  <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '25px' }}>
                    Analysis Results
                  </h2>

                  {/* Stats Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
                    <div style={{ padding: '20px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--primary)' }}>
                        {analysis.totalVolume}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--gray)', marginTop: '5px' }}>Total Volume (lbs)</div>
                    </div>
                    <div style={{ padding: '20px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--secondary)' }}>
                        {analysis.intensity}%
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--gray)', marginTop: '5px' }}>Intensity</div>
                    </div>
                    <div style={{ padding: '20px', background: 'rgba(20, 184, 166, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--accent)' }}>
                        {analysis.caloriesBurned}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--gray)', marginTop: '5px' }}>Calories Burned</div>
                    </div>
                    <div style={{ padding: '20px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--warning)' }}>
                        {analysis.muscleGroups.length}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--gray)', marginTop: '5px' }}>Muscle Groups</div>
                    </div>
                  </div>

                  {/* Targeted Muscles */}
                  <div style={{ marginBottom: '25px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                      Targeted Muscles
                    </h3>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {analysis.muscleGroups.map((muscle, idx) => (
                        <span key={idx} className="badge" style={{ background: 'rgba(99, 102, 241, 0.2)' }}>
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div style={{ marginBottom: '25px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                      AI Recommendations
                    </h3>
                    {analysis.recommendations.map((rec, idx) => (
                      <div key={idx} style={{
                        padding: '12px 15px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderLeft: '3px solid var(--primary)',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        fontSize: '14px'
                      }}>
                        💡 {rec}
                      </div>
                    ))}
                  </div>

                  {/* Next Session */}
                  <div style={{
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
                    borderRadius: '12px',
                    border: '1px solid rgba(99, 102, 241, 0.3)'
                  }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>
                      🎯 Next Session Target
                    </h3>
                    <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
                      <div>
                        <span style={{ color: 'var(--gray)' }}>Sets: </span>
                        <strong>{analysis.nextSession.sets}</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--gray)' }}>Reps: </span>
                        <strong>{analysis.nextSession.reps}</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--gray)' }}>Weight: </span>
                        <strong style={{ color: 'var(--success)' }}>{analysis.nextSession.weight} lbs</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Feature Highlights */}
          <div style={{ marginTop: '60px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center', marginBottom: '40px' }}>
              Why Use AI Analysis?
            </h2>
            <div className="grid-3">
              <div className="glass-card card-animated" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>📈</div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Track Progress</h3>
                <p style={{ color: 'var(--gray)', fontSize: '14px' }}>
                  Monitor volume, intensity, and improvements over time
                </p>
              </div>
              <div className="glass-card card-animated" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎯</div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Smart Recommendations</h3>
                <p style={{ color: 'var(--gray)', fontSize: '14px' }}>
                  Get personalized advice based on your workout data
                </p>
              </div>
              <div className="glass-card card-animated" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>⚡</div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Optimize Performance</h3>
                <p style={{ color: 'var(--gray)', fontSize: '14px' }}>
                  Progressive overload suggestions for continuous gains
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutAnalyzer;