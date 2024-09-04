import { connectToDatabase } from '../../../lib/mongodb';
import Message from '../../../models/Message';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const message = await Message.findById(id);
        if (!message) {
          return res.status(404).json({ success: false, error: 'Message not found' });
        }
        res.status(200).json({ success: true, data: message });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        const message = await Message.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!message) {
          return res.status(404).json({ success: false, error: 'Message not found' });
        }
        res.status(200).json({ success: true, data: message });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedMessage = await Message.deleteOne({ _id: id });
        if (!deletedMessage) {
          return res.status(404).json({ success: false, error: 'Message not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Invalid method' });
      break;
  }
}
