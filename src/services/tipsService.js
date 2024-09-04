import axios from 'axios';

export const getTips = async () => {
  const response = await axios.get('/api/tips/templates');
  return response.data.data;
};

export const getDosAndDonts = async () => {
  const response = await axios.get('/api/tips/dos-and-donts');
  return response.data.data;
};
