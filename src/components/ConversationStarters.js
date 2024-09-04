import { useState } from 'react';
import axios from 'axios';

export default function ConversationStarters() {
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
      <h2 className="text-xl font-bold mb-4">Conversation Starters</h2>
      <button
        onClick={generateStarters}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Starters'}
      </button>
      <ul className="list-disc pl-5">
        {starters.map((starter, index) => (
          <li key={index} className="mb-2">{starter}</li>
        ))}
      </ul>
    </div>
  );
}
