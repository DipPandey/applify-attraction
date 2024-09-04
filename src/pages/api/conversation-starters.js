import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: "You are a helpful assistant that generates conversation starters for dating and attraction. Provide 5 unique and engaging conversation starters." }],
    });

    const starters = completion.choices[0].message.content.split('\n').filter(starter => starter.trim() !== '');

    res.status(200).json({ starters });
  } catch (error) {
    console.error('Error generating conversation starters:', error);
    res.status(500).json({ message: 'Error generating conversation starters' });
  }
}