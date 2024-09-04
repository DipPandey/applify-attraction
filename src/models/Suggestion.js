import mongoose from 'mongoose';

const SuggestionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  context: { type: String, required: true },
  suggestedMessage: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  used: { type: Boolean, default: false },
});

export default mongoose.models.Suggestion || mongoose.model('Suggestion', SuggestionSchema);
