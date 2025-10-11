import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['diet', 'workout', 'hydration', 'sleep'], required: true },
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  targetCalories: { type: Number },
  actualCalories: { type: Number }
});

export default mongoose.model('Task', taskSchema);