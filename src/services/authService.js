import axios from 'axios';

const API_URL = '/api/auth';

export const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  console.log('Login response:', response.data);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify({
      token: response.data.token,
      userId: response.data.userId,
      username: response.data.username
    }));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
