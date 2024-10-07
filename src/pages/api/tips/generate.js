import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message, replyStyle } = req.body;

  const replyStylePrompts = {
    confident: "You are a confident man who knows what he wants and isn't afraid to go after it. Keep it playful and suggest meeting up.",
    humorous: "You are a witty man who uses humor to keep the conversation light and engaging. Make a playful hint about future plans.",
    empathetic: "You are a caring man who listens and responds with empathy. Playfully suggest a face-to-face meeting.",
    direct: "You are a straightforward man who communicates clearly. Charmingly suggest a date.",
    playful: "You are a playful man who enjoys teasing and light-hearted banter. Suggest a fun activity you could do together."
  };

  const prompt = `${replyStylePrompts[replyStyle]} Your job is to provide a short and playful reply to a message from a woman, with the aim of moving the conversation towards a date.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: `Message from the woman: "${message}"` }
      ],
    });

    const aiMessage = completion.choices[0].message.content;

    res.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error('Error generating tips:', error);
    res.status(500).json({ message: 'Error generating tips' });
  }
}