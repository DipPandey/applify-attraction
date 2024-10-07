import { useState } from 'react';
import { getAIResponse } from '../services/aiService';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

export default function ChatInterface({ personality }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loadingStarters, setLoadingStarters] = useState(false);
  const [loadingReply, setLoadingReply] = useState(false);
  const [starters, setStarters] = useState([]);
  const [reply, setReply] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoadingStarters(false);
    setLoadingReply(false);
    try {
      const userMessage = { role: 'user', content: input, timestamp: new Date().toLocaleTimeString() };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      const aiResponse = await getAIResponse([...messages, userMessage]);
      const aiMessage = { role: 'assistant', content: aiResponse, timestamp: new Date().toLocaleTimeString() };
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
    setReply('');
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
    setStarters([]);
    try {
      const lastMessage = messages[messages.length - 1];
      const shouldReplyShort = Math.random() < 0.5;
      const response = await axios.post('/api/tips/generate', { 
        message: lastMessage.content,
        personality: personality,
        shortReply: shouldReplyShort
      });
      setReply(response.data.message);
      setGeneratedContent(response.data.message);
    } catch (error) {
      console.error('Error generating reply:', error);
    }
    setLoadingReply(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`flex flex-col h-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className={`bg-${darkMode ? 'gray-700' : 'gray-200'} p-2 rounded-t text-center font-semibold`}>
        You are chatting with an AI woman
      </div>
      <div className={`flex-grow overflow-y-auto mb-4 p-4 border rounded bg-${darkMode ? 'gray-600' : 'gray-100'}`}>
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.role === 'assistant' ? 'text-left' : 'text-right'}`}>
            <span className={`inline-block p-2 rounded ${message.role === 'assistant' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
              {message.content}
            </span>
            <span className="text-xs ml-2">{message.timestamp}</span>
          </div>
        ))}
        {(loadingStarters || loadingReply) && (
          <div className="text-center">
            <ClipLoader color={darkMode ? "#ffffff" : "#000000"} loading={true} size={15} />
          </div>
        )}
      </div>
      <form onSubmit={handleSendMessage} className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`flex-grow px-3 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 bg-${darkMode ? 'gray-700' : 'gray-200'} text-${darkMode ? 'white' : 'black'} placeholder-${darkMode ? 'gray-400' : 'gray-600'}`}
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
      <button
        onClick={toggleTheme}
        className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition duration-200"
      >
        Toggle Theme
      </button>
      {starters.length > 0 && (
        <div className={`mt-4 p-4 bg-${darkMode ? 'gray-700' : 'gray-200'} rounded`}>
          <h3 className="font-semibold mb-2">Conversation Starters:</h3>
          <ul className="list-decimal pl-5">
            {starters.map((starter, index) => (
              <li key={index} className="mb-2 flex justify-between items-center">
                <span>{starter}</span>
                <button
                  onClick={() => handleCopy(starter)}
                  className={`ml-2 bg-${darkMode ? 'gray-200' : 'gray-300'} text-${darkMode ? 'gray-700' : 'gray-800'} px-2 py-1 rounded hover:bg-${darkMode ? 'gray-300' : 'gray-400'} transition duration-200`}
                >
                  Copy
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {reply && (
        <div className={`mt-4 p-4 bg-${darkMode ? 'gray-700' : 'gray-200'} rounded flex justify-between items-center`}>
          <p>{reply}</p>
          <button
            onClick={() => handleCopy(reply)}
            className={`ml-2 bg-${darkMode ? 'gray-200' : 'gray-300'} text-${darkMode ? 'gray-700' : 'gray-800'} px-2 py-1 rounded hover:bg-${darkMode ? 'gray-300' : 'gray-400'} transition duration-200`}
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}