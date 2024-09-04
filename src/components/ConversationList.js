export default function ConversationList({ conversations, activeConversation, setActiveConversation, onNewConversation }) {
  return (
    <div className="w-1/4 mr-4">
      <button 
        onClick={onNewConversation}
        className="w-full bg-green-500 text-white py-2 rounded mb-4"
      >
        New Conversation
      </button>
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <div 
            key={conversation._id} 
            className={`p-2 rounded cursor-pointer ${activeConversation?._id === conversation._id ? 'bg-blue-100' : 'bg-gray-100'}`}
            onClick={() => setActiveConversation(conversation)}
          >
            {conversation.title}
          </div>
        ))}
      </div>
    </div>
  );
}