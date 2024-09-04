import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { messages } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant that provides advice on dating and attraction. Respond as if you're having a conversation with someone seeking dating advice." },
        ...messages
      ],
    });

    const aiMessage = completion.choices[0].message;

    res.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ message: 'Error in chat' });
  }
}