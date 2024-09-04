import { useState } from 'react';
import axios from 'axios';

export default function MessagingInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('/api/chat', { messages: [...messages, userMessage] });
      setMessages([...messages, userMessage, response.data.message]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Messaging Practice</h2>
      <div className="h-64 overflow-y-auto mb-4 p-4 border rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <div className="text-center">AI is typing...</div>}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow px-3 py-2 border rounded-l"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">Send</button>
      </form>
    </div>
  );
}