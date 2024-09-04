import mongoose from 'mongoose';

const TrackingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: mongoose.Schema.Types.Mixed },
});

export default mongoose.models.Tracking || mongoose.model('Tracking', TrackingSchema);
