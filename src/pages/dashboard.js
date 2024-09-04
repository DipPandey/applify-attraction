import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../services/authService';
import Profile from '../components/Profile';
import ConversationStarters from '../components/ConversationStarters';
import MessagingInterface from '../components/MessagingInterface';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Applify Attraction</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-grow container mx-auto mt-8 p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex mb-6">
            <button
              className={`mr-4 ${activeTab === 'profile' ? 'text-blue-500 font-bold' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`mr-4 ${activeTab === 'conversation' ? 'text-blue-500 font-bold' : ''}`}
              onClick={() => setActiveTab('conversation')}
            >
              Conversation Starters
            </button>
            <button
              className={`${activeTab === 'messaging' ? 'text-blue-500 font-bold' : ''}`}
              onClick={() => setActiveTab('messaging')}
            >
              Messaging Practice
            </button>
          </div>
          {activeTab === 'profile' && <Profile user={user} />}
          {activeTab === 'conversation' && <ConversationStarters />}
          {activeTab === 'messaging' && <MessagingInterface />}
        </div>
      </main>
    </div>
  );
}
