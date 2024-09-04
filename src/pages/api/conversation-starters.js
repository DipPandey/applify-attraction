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
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a professional dating coach specializing in helping men build attraction, fun, and intimacy with women. Your job is to provide the best possible conversation starters that are engaging, respectful, confident, and fun. Use teasing, push and pull techniques, and an unapologetic flirting style inspired by Craig Ferguson. Focus on building a man-to-woman connection rather than platonic conversations. Provide 5 unique and engaging conversation starters, each no longer than one sentence. some can be more serious, but most should be funny and engaging. add a little bit of mystery to each one. add 2  pick up lines that are funny and engaging. but not too cheesy. " }
      ],
    });

    const starters = completion.choices[0].message.content.split('\n').filter(starter => starter.trim() !== '');

    res.status(200).json({ starters });
  } catch (error) {
    console.error('Error generating conversation starters:', error);
    res.status(500).json({ message: 'Error generating conversation starters' });
  }
}