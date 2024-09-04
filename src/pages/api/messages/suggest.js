import { connectToDatabase } from '../../../lib/mongodb';
import Suggestion from '../../../models/Suggestion';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { context } = req.body;

  try {
    await connectToDatabase();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that suggests messages for dating conversations." },
        { role: "user", content: `Suggest a message for this context: ${context}` }
      ],
    });

    const suggestedMessage = completion.choices[0].message.content;

    const suggestion = await Suggestion.create({
      context,
      suggestedMessage,
    });

    res.status(200).json({ success: true, data: suggestion });
  } catch (error) {
    console.error('Error suggesting message:', error);
    res.status(500).json({ success: false, message: 'Error suggesting message' });
  }
}
