import { connectToDatabase } from '../../../lib/mongodb';
import Tips from '../../../models/Tips';

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const templates = await Tips.find({ category: 'templates' });
        res.status(200).json({ success: true, data: templates });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const template = await Tips.create({ ...req.body, category: 'templates' });
        res.status(201).json({ success: true, data: template });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Invalid method' });
      break;
  }
}
