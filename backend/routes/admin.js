import express from 'express';
import User from '../models/User.js';
import DietPlan from '../models/DietPlan.js';
import Trainer from '../models/Trainer.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all users
router.get('/users', authenticate, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password -otp');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

// Delete user
router.delete('/users/:id', authenticate, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

// Add diet plan
router.post('/diet-plans', authenticate, isAdmin, async (req, res) => {
  try {
    const dietPlan = new DietPlan(req.body);
    await dietPlan.save();
    res.status(201).json(dietPlan);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create diet plan', error: error.message });
  }
});

// Delete diet plan
router.delete('/diet-plans/:id', authenticate, isAdmin, async (req, res) => {
  try {
    await DietPlan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Diet plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete diet plan', error: error.message });
  }
});

// Add trainer
router.post('/trainers', authenticate, isAdmin, async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    await trainer.save();
    res.status(201).json(trainer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add trainer', error: error.message });
  }
});

// Delete trainer
router.delete('/trainers/:id', authenticate, isAdmin, async (req, res) => {
  try {
    await Trainer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete trainer', error: error.message });
  }
});

// Get dashboard stats
router.get('/stats', authenticate, isAdmin, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const dietPlanCount = await DietPlan.countDocuments();
    const trainerCount = await Trainer.countDocuments();
    
    res.json({
      users: userCount,
      dietPlans: dietPlanCount,
      trainers: trainerCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats', error: error.message });
  }
});

export default router;