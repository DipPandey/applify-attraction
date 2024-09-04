import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a professional dating coach specializing in helping men build attraction, fun, and intimacy with women. Your job is to provide the best possible reply to a message from a woman in a way that is engaging, respectful, confident, and fun. Use teasing, push and pull techniques, and an unapologetic flirting style inspired by Craig Ferguson. Focus on building a man-to-woman connection rather than platonic conversations. Keep the reply concise and to the point." },
        { role: "user", content: `Message from the girl: "${message}"` }
      ],
    });

    const aiMessage = completion.choices[0].message.content;

    res.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error('Error generating tips:', error);
    res.status(500).json({ message: 'Error generating tips' });
  }
}