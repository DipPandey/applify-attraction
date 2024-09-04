import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, default: null },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isAIGenerated: { type: Boolean, default: false },
  tone: { type: String },
  timingScore: { type: Number },
});

export default mongoose.models.Message || mongoose.model('Message', MessageSchema);
