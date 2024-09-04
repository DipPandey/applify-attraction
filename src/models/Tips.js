import mongoose from 'mongoose';

const TipsSchema = new mongoose.Schema({
  category: { type: String, required: true, enum: ['dos-and-donts', 'templates'] },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

TipsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Tips || mongoose.model('Tips', TipsSchema);
