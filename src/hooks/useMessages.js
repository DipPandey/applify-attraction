import { useState, useEffect } from 'react';
import { getMessages } from '../services/messageService';

export function useMessages(userId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const fetchedMessages = await getMessages(userId);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchMessages();
    }
  }, [userId]);

  return { messages, setMessages, loading };
}
