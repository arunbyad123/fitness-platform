import express from 'express';
import Trainer from '../models/Trainer.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all trainers
router.get('/', authenticate, async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trainers', error: error.message });
  }
});

// Contact trainer (in production, send email)
router.post('/:id/contact', authenticate, async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    console.log(`📧 Contact request from ${req.user.email} to trainer ${trainer.email}`);
    
    // In production, you would send an actual email here using nodemailer
    // For now, we just log it and return success
    
    res.json({ 
      message: 'Contact request sent successfully!', 
      trainerEmail: trainer.email,
      trainerPhone: trainer.phone 
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ message: 'Failed to contact trainer', error: error.message });
  }
});

export default router;