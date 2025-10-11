import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
  rating: { type: Number, default: 4.5 },
  bio: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  availability: { type: String },
  price: { type: Number },
  certifications: [String],
  image: { type: String, default: 'https://via.placeholder.com/300' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Trainer', trainerSchema);