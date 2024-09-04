import { connectToDatabase } from '../../../lib/mongodb';
import Message from '../../../models/Message';
import { analyzeTone } from '../../../utils/toneAnalysis';
import { getTimingScore } from '../../../utils/timing';

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const messages = await Message.find({}).sort({ timestamp: 1 });
        console.log('Retrieved messages:', messages);
        res.status(200).json({ success: true, data: messages });
      } catch (error) {
        console.error('Error getting messages:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        console.log('Received message data:', req.body);
        const { content, isAIGenerated, userId } = req.body;
        const tone = analyzeTone(content);
        const timingScore = await getTimingScore();

        const messageData = {
          userId: isAIGenerated ? undefined : userId, // Ensure userId is undefined for AI messages
          content,
          isAIGenerated,
          tone,
          timingScore,
        };

        const message = await Message.create(messageData);
        console.log('Created message:', message);
        res.status(201).json({ success: true, data: message });
      } catch (error) {
        console.error('Error creating message:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Invalid method' });
      break;
  }
}
