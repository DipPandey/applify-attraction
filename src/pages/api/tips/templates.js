import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(400).json({ success: false, error: 'GET method not supported without database' });
      break;

    case 'POST':
      try {
        const { prompt } = req.body;

        // Generate AI-based content
        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are an expert in creating engaging and helpful conversation templates for dating." },
            { role: "user", content: prompt }
          ],
        });

        const aiGeneratedContent = completion.choices[0].message.content;

        // Return the AI-generated template
        res.status(201).json({ success: true, data: aiGeneratedContent });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Invalid method' });
      break;
  }
}
