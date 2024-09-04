import { connectToDatabase } from '../../../lib/mongodb';
import Tips from '../../../models/Tips';

export default async function handler(req, res) {
  const { method } = req;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const dosAndDonts = await Tips.find({ category: 'dos-and-donts' });
        res.status(200).json({ success: true, data: dosAndDonts });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const tip = await Tips.create({ ...req.body, category: 'dos-and-donts' });
        res.status(201).json({ success: true, data: tip });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Invalid method' });
      break;
  }
}
