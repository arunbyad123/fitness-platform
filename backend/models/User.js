import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiry: { type: Date },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  activeDietPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan' }
});

export default mongoose.model('User', userSchema);