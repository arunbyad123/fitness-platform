import mongoose from 'mongoose';

const dietPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['bulk', 'cut', 'maintain'], required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
  meals: [{
    name: String,
    time: String,
    items: [String],
    calories: Number
  }],
  description: { type: String },
  duration: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('DietPlan', dietPlanSchema);