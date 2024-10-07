import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    tone = 'fun',
    numberOfStarters = 5,
    includePickUpLines = true,
    maxLength = 100, // Maximum length of each starter
    language = 'en', // Language option
    theme = 'general', // Theme or category
    includeEmojis = false // Option to include emojis
  } = req.body;

  try {
    const prompt = `
      Provide ${numberOfStarters} unique and engaging conversation starters for a man to use with a woman. Each starter should be no longer than ${maxLength} characters and should be engaging, respectful, confident, and fun. Some can be more serious, but most should be funny and engaging. Add a little bit of mystery to each one.
      ${includePickUpLines ? 'Include 2 pick-up lines that are funny and engaging, but not too cheesy.' : ''}
      ${includeEmojis ? 'Include emojis to make the starters more lively.' : ''}
      Ensure the output is formatted as natural, conversational text without bullet points or quotes.
      Tone: ${tone}
      Theme: ${theme}
      Language: ${language}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: prompt }
      ],
    });

    const starters = completion.choices[0].message.content
      .split('\n')
      .map(starter => starter.replace(/^\d+\.\s*/, '').replace(/^"|"$/g, '').trim()) // Remove bullet points, numbering, and quotes
      .filter(starter => starter !== '');

    res.status(200).json({ starters });
  } catch (error) {
    console.error('Error generating conversation starters:', error);
    res.status(500).json({ message: 'Error generating conversation starters' });
  }
}