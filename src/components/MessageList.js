export default function MessageList({ messages }) {
  console.log('Messages in MessageList:', messages);
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Message History</h2>
      <div className="space-y-4">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} className={`p-2 rounded ${message.isAIGenerated ? 'bg-blue-100' : 'bg-green-100'}`}>
              <p className="font-semibold">{message.isAIGenerated ? 'AI' : 'You'}</p>
              <p>{message.content}</p>
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
    </div>
  );
}
