import { connectToDatabase } from '../../../lib/mongodb';
import Tracking from '../../../models/Tracking';

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const trackingData = await Tracking.find({});
        res.status(200).json({ success: true, data: trackingData });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const tracking = await Tracking.create(req.body);
        res.status(201).json({ success: true, data: tracking });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Invalid method' });
      break;
  }
}
