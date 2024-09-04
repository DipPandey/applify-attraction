import axios from 'axios';

export const getAIResponse = async (messages) => {
  const response = await axios.post('/api/chat', { messages });
  return response.data.message.content;
};
