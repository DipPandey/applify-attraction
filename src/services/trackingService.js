import axios from 'axios';

export const trackAction = async (userId, action, details) => {
  const response = await axios.post('/api/tips/tracking', { userId, action, details });
  return response.data.data;
};
