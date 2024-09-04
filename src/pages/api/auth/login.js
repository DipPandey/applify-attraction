import { connectToDatabase } from '../../../lib/mongodb';
import { verifyPassword, generateToken } from '../../../utils/auth';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    console.log('User data:', user); // Add this line

    res.status(200).json({ 
      message: 'Login successful', 
      token, 
      userId: user._id,
      username: user.username
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
}
