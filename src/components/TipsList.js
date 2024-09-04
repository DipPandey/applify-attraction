import { useState } from 'react';
import axios from 'axios';

export default function TipsList({ title, onCopy }) {
  const [message, setMessage] = useState('');
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateTip = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/tips/generate', { message });
      setTip(response.data.message);
    } catch (error) {
      console.error('Error generating tip:', error);
    }
    setLoading(false);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        placeholder="Type the message from the girl..."
      ></textarea>
      <button
        onClick={handleGenerateTip}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Reply'}
      </button>
      {tip && (
        <div className="mt-4 p-4 bg-green-100 rounded flex justify-between items-center">
          <p>{tip}</p>
          <button
            onClick={() => onCopy(tip)}
            className="ml-2 bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition duration-200"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}