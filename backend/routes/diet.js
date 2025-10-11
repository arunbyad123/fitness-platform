import express from 'express';
import DietPlan from '../models/DietPlan.js';
import Task from '../models/Task.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all diet plans
router.get('/', authenticate, async (req, res) => {
  try {
    const dietPlans = await DietPlan.find();
    res.json(dietPlans);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch diet plans', error: error.message });
  }
});

// Create diet task
router.post('/task', authenticate, async (req, res) => {
  try {
    const { title, description, category, targetCalories } = req.body;
    
    const task = new Task({
      userId: req.user._id,
      title,
      description,
      category,
      targetCalories
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
});

// Get user tasks
router.get('/tasks', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
});

// Mark task complete
router.patch('/task/:id/complete', authenticate, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { completed: true, actualCalories: req.body.actualCalories },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
});

export default router;