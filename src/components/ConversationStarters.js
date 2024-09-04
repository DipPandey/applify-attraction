import { useState } from 'react';
import axios from 'axios';

export default function ConversationStarters({ onCopy }) {
  const [starters, setStarters] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateStarters = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/conversation-starters');
      setStarters(response.data.starters);
    } catch (error) {
      console.error('Error generating conversation starters:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={generateStarters}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition duration-200 w-full"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Starters'}
      </button>
      <ul className="list-disc pl-5">
        {starters.map((starter, index) => (
          <li key={index} className="mb-2 flex justify-between items-center">
            <span>{starter}</span>
            <button
              onClick={() => onCopy(starter)}
              className="ml-2 bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition duration-200"
            >
              Copy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
