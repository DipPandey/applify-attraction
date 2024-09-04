import { useState } from 'react';
import { useTimingAdvice } from '../hooks/useTimingAdvice';
import { useToneAnalysis } from '../hooks/useToneAnalysis';

export default function MessagingInterface({ onSendMessage, messages }) {
  const [input, setInput] = useState('');
  const lastMessage = messages[messages.length - 1];
  const timingAdvice = useTimingAdvice(lastMessage?.timestamp);
  const toneAnalysis = useToneAnalysis(input);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Messaging Practice</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          rows="4"
          placeholder="Type your message..."
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
      {timingAdvice && (
        <div className="mb-4 p-2 bg-yellow-100 rounded">
          <p className="font-semibold">Timing Advice:</p>
          <p>{timingAdvice}</p>
        </div>
      )}
      {toneAnalysis && (
        <div className="mb-4 p-2 bg-green-100 rounded">
          <p className="font-semibold">Tone Analysis:</p>
          <p>{toneAnalysis}</p>
        </div>
      )}
    </div>
  );
}