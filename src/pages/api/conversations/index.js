import { connectToDatabase } from '../../../lib/mongodb';
import Conversation from '../../../models/Conversation';

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const { userId } = req.query;
        const conversations = await Conversation.find({ userId }).sort({ updatedAt: -1 });
        res.status(200).json({ success: true, data: conversations });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const conversation = await Conversation.create(req.body);
        res.status(201).json({ success: true, data: conversation });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Invalid method' });
      break;
  }
}