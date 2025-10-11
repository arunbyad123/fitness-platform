import express from 'express';
import DietPlan from '../models/DietPlan.js';
import Trainer from '../models/Trainer.js';

const router = express.Router();

// Seed data arrays
const seedDietPlans = [
  {
    name: 'Muscle Gain Pro',
    type: 'bulk',
    calories: 3200,
    protein: 180,
    carbs: 400,
    fats: 90,
    description: 'High-calorie plan designed for maximum muscle growth',
    duration: '12 weeks',
    meals: [
      { name: 'Breakfast', time: '8:00 AM', items: ['Oats', 'Eggs', 'Banana', 'Protein Shake'], calories: 650 },
      { name: 'Mid-Morning Snack', time: '10:30 AM', items: ['Greek Yogurt', 'Almonds', 'Honey'], calories: 350 },
      { name: 'Lunch', time: '1:00 PM', items: ['Chicken Breast', 'Brown Rice', 'Vegetables', 'Olive Oil'], calories: 850 },
      { name: 'Pre-Workout', time: '4:00 PM', items: ['Banana', 'Peanut Butter', 'Coffee'], calories: 300 },
      { name: 'Post-Workout', time: '6:00 PM', items: ['Protein Shake', 'Sweet Potato'], calories: 400 },
      { name: 'Dinner', time: '8:00 PM', items: ['Salmon', 'Quinoa', 'Broccoli', 'Avocado'], calories: 750 }
    ]
  },
  {
    name: 'Lean & Shredded',
    type: 'cut',
    calories: 2000,
    protein: 160,
    carbs: 150,
    fats: 60,
    description: 'Low-calorie plan for cutting fat while preserving muscle',
    duration: '8 weeks',
    meals: [
      { name: 'Breakfast', time: '8:00 AM', items: ['Greek Yogurt', 'Berries', 'Chia Seeds'], calories: 350 },
      { name: 'Lunch', time: '1:00 PM', items: ['Turkey Breast', 'Quinoa', 'Mixed Salad'], calories: 550 },
      { name: 'Snack', time: '4:00 PM', items: ['Apple', 'Almond Butter'], calories: 200 },
      { name: 'Dinner', time: '7:00 PM', items: ['Grilled Tilapia', 'Asparagus', 'Cauliflower Rice'], calories: 450 },
      { name: 'Evening Snack', time: '9:00 PM', items: ['Casein Protein Shake'], calories: 150 }
    ]
  },
  {
    name: 'Balanced Maintenance',
    type: 'maintain',
    calories: 2500,
    protein: 150,
    carbs: 280,
    fats: 75,
    description: 'Well-rounded plan to maintain current physique',
    duration: 'Ongoing',
    meals: [
      { name: 'Breakfast', time: '8:00 AM', items: ['Smoothie Bowl', 'Nuts', 'Granola'], calories: 500 },
      { name: 'Lunch', time: '1:00 PM', items: ['Chicken Pasta', 'Vegetables', 'Parmesan'], calories: 700 },
      { name: 'Snack', time: '4:00 PM', items: ['Protein Bar', 'Orange'], calories: 300 },
      { name: 'Dinner', time: '7:00 PM', items: ['Lean Steak', 'Brown Rice', 'Garden Salad'], calories: 650 },
      { name: 'Evening', time: '9:00 PM', items: ['Cottage Cheese', 'Berries'], calories: 200 }
    ]
  },
  {
    name: 'Mass Gainer Extreme',
    type: 'bulk',
    calories: 3800,
    protein: 200,
    carbs: 480,
    fats: 100,
    description: 'Extreme calorie surplus for hardgainers',
    duration: '16 weeks',
    meals: [
      { name: 'Breakfast', time: '7:00 AM', items: ['Pancakes', 'Eggs', 'Protein Shake'], calories: 800 },
      { name: 'Mid-Morning', time: '10:00 AM', items: ['Mass Gainer Shake', 'Banana'], calories: 600 },
      { name: 'Lunch', time: '12:00 PM', items: ['Ground Beef', 'Pasta', 'Bread'], calories: 1000 },
      { name: 'Snack', time: '3:00 PM', items: ['Peanut Butter Sandwich', 'Milk'], calories: 500 },
      { name: 'Dinner', time: '6:00 PM', items: ['Chicken Thighs', 'Rice', 'Avocado'], calories: 900 },
      { name: 'Before Bed', time: '10:00 PM', items: ['Casein Shake', 'Almonds'], calories: 400 }
    ]
  },
  {
    name: 'Rapid Fat Loss',
    type: 'cut',
    calories: 1600,
    protein: 140,
    carbs: 100,
    fats: 50,
    description: 'Aggressive cutting plan for fast results',
    duration: '6 weeks',
    meals: [
      { name: 'Breakfast', time: '8:00 AM', items: ['Egg Whites', 'Spinach', 'Tomatoes'], calories: 250 },
      { name: 'Lunch', time: '1:00 PM', items: ['Grilled Chicken', 'Mixed Greens', 'Lemon'], calories: 450 },
      { name: 'Snack', time: '4:00 PM', items: ['Protein Shake', 'Cucumber'], calories: 200 },
      { name: 'Dinner', time: '6:00 PM', items: ['Baked Fish', 'Steamed Broccoli'], calories: 400 },
      { name: 'Evening', time: '9:00 PM', items: ['Herbal Tea', 'Small Apple'], calories: 80 }
    ]
  },
  {
    name: 'Performance Fuel',
    type: 'maintain',
    calories: 2800,
    protein: 170,
    carbs: 320,
    fats: 80,
    description: 'Optimized for athletic performance and recovery',
    duration: 'Ongoing',
    meals: [
      { name: 'Breakfast', time: '7:30 AM', items: ['Oatmeal', 'Protein Powder', 'Blueberries'], calories: 600 },
      { name: 'Pre-Workout', time: '11:00 AM', items: ['Rice Cakes', 'Honey', 'Banana'], calories: 350 },
      { name: 'Lunch', time: '12:30 PM', items: ['Turkey', 'Sweet Potato', 'Vegetables'], calories: 750 },
      { name: 'Post-Workout', time: '3:00 PM', items: ['Whey Shake', 'Dextrose', 'Creatine'], calories: 400 },
      { name: 'Dinner', time: '7:00 PM', items: ['Grass-Fed Beef', 'Jasmine Rice', 'Salad'], calories: 700 }
    ]
  }
];

const seedTrainers = [
  {
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
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400'
  },
  {
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
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400'
  },
  {
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
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400'
  },
  {
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
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400'
  },
  {
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
    image: 'https://images.unsplash.com/photo-1567598508481-65985588e295?w=400'
  },
  {
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
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  },
  {
    name: 'Ryan Thompson',
    specialty: 'Olympic Weightlifting',
    experience: 12,
    rating: 4.9,
    bio: 'National champion weightlifter coaching athletes in snatch, clean & jerk, and explosive power development.',
    email: 'ryan@fitpro.com',
    phone: '+1 234-567-8907',
    availability: 'Tue-Sat 6AM-9PM',
    price: 170,
    certifications: ['USAW Level 3', 'NSCA', 'Sports Science'],
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400'
  },
  {
    name: 'Lisa Anderson',
    specialty: 'Nutrition & Meal Planning',
    experience: 9,
    rating: 4.8,
    bio: 'Registered dietitian specializing in sports nutrition, meal prep strategies, and supplement protocols.',
    email: 'lisa@fitpro.com',
    phone: '+1 234-567-8908',
    availability: 'Mon-Fri 9AM-6PM',
    price: 130,
    certifications: ['RD', 'CSSD', 'Precision Nutrition L2'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400'
  }
];

// GET /api/seed/initialize - Seed the database (one-time)
router.get('/initialize', async (req, res) => {
  try {
    const dietPlanCount = await DietPlan.countDocuments();
    const trainerCount = await Trainer.countDocuments();

    if (dietPlanCount > 0 && trainerCount > 0) {
      return res.json({ 
        success: true,
        message: '✅ Database already seeded!',
        data: {
          dietPlans: dietPlanCount,
          trainers: trainerCount
        }
      });
    }

    // Clear and seed
    await DietPlan.deleteMany({});
    await Trainer.deleteMany({});

    await DietPlan.insertMany(seedDietPlans);
    await Trainer.insertMany(seedTrainers);

    res.json({ 
      success: true,
      message: '🎉 Database seeded successfully!',
      data: {
        dietPlans: seedDietPlans.length,
        trainers: seedTrainers.length
      }
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ 
      success: false,
      message: '❌ Seed failed',
      error: error.message 
    });
  }
});

// GET /api/seed/status - Check seed status
router.get('/status', async (req, res) => {
  try {
    const dietPlanCount = await DietPlan.countDocuments();
    const trainerCount = await Trainer.countDocuments();

    res.json({
      success: true,
      seeded: dietPlanCount > 0 && trainerCount > 0,
      data: {
        dietPlans: dietPlanCount,
        trainers: trainerCount
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to check status',
      error: error.message 
    });
  }
});

export default router;