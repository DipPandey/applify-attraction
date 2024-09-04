import axios from 'axios';

export const getConversations = async (userId) => {
  try {
    const response = await axios.get(`/api/conversations?userId=${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

export const getMessages = async () => {
  try {
    const response = await axios.get('/api/messages');
    console.log('Fetched messages response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

export const sendMessage = async (userId, content, isAIGenerated = false) => {
  try {
    const response = await axios.post('/api/messages', { 
      userId: isAIGenerated ? undefined : userId, // Ensure userId is undefined for AI messages
      content, 
      isAIGenerated 
    });
    console.log('Sent message response:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const createConversation = async (userId, title) => {
  try {
    const response = await axios.post('/api/conversations', { userId, title });
    return response.data.data;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};
