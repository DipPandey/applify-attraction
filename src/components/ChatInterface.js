import { useState } from 'react';
import { getAIResponse } from '../services/aiService';
import axios from 'axios';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loadingStarters, setLoadingStarters] = useState(false);
  const [loadingReply, setLoadingReply] = useState(false);
  const [starters, setStarters] = useState([]);
  const [reply, setReply] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoadingStarters(false);
    setLoadingReply(false);
    try {
      // Add user message to state
      const userMessage = { role: 'user', content: input };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      // Get AI response
      const aiResponse = await getAIResponse([...messages, userMessage]);
      const aiMessage = { role: 'assistant', content: aiResponse };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const generateStarters = async () => {
    setLoadingStarters(true);
    setLoadingReply(false);
    setReply(''); // Clear reply content
    try {
      const response = await axios.post('/api/conversation-starters');
      setStarters(response.data.starters);
      setGeneratedContent(response.data.starters.join('\n'));
    } catch (error) {
      console.error('Error generating conversation starters:', error);
    }
    setLoadingStarters(false);
  };

  const generateReply = async () => {
    setLoadingReply(true);
    setLoadingStarters(false);
    setStarters([]); // Clear starters content
    try {
      const lastMessage = messages[messages.length - 1];
      const shouldReplyShort = Math.random() < 0.5; // 50% chance to reply short
      const response = await axios.post('/api/tips/generate', { 
        message: lastMessage.content,
        shortReply: shouldReplyShort
      });
      setReply(response.data.message);
      setGeneratedContent(response.data.message);
    } catch (error) {
      console.error('Error generating reply:', error);
    }
    setLoadingReply(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-700 text-white p-2 rounded-t text-center font-semibold">
        You are chatting with an AI woman
      </div>
      <div className="flex-grow overflow-y-auto mb-4 p-4 border rounded bg-gray-600">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.role === 'assistant' ? 'text-left' : 'text-right'}`}>
            <span className={`inline-block p-2 rounded ${message.role === 'assistant' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
              {message.content}
            </span>
          </div>
        ))}
        {(loadingStarters || loadingReply) && <div className="text-center text-white">AI is typing...</div>}
      </div>
      <form onSubmit={handleSendMessage} className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow px-3 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-200">Send</button>
        <button
          type="button"
          onClick={generateStarters}
          className="bg-orange-500 text-white px-4 py-2 rounded ml-2 hover:bg-orange-600 transition duration-200"
          disabled={loadingStarters || loadingReply}
        >
          {loadingStarters ? 'Generating...' : 'Generate Starters'}
        </button>
        <button
          type="button"
          onClick={generateReply}
          className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600 transition duration-200"
          disabled={loadingStarters || loadingReply}
        >
          {loadingReply ? 'Generating...' : 'Generate Reply'}
        </button>
      </form>
      {starters.length > 0 && (
        <div className="mt-4 p-4 bg-gray-700 rounded">
          <h3 className="font-semibold mb-2 text-white">Conversation Starters:</h3>
          <ul className="list-decimal pl-5 text-white">
            {starters.map((starter, index) => (
              <li key={index} className="mb-2 flex justify-between items-center">
                <span>{starter}</span>
                <button
                  onClick={() => handleCopy(starter)}
                  className="ml-2 bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition duration-200"
                >
                  Copy
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {reply && (
        <div className="mt-4 p-4 bg-gray-700 rounded flex justify-between items-center">
          <p className="text-white">{reply}</p>
          <button
            onClick={() => handleCopy(reply)}
            className="ml-2 bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition duration-200"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}