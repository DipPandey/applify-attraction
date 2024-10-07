import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../services/authService';
import Profile from '../components/Profile';
import ChatInterface from '../components/ChatInterface';
import { FaSignOutAlt } from 'react-icons/fa'; // Importing an icon from react-icons
import { FaUserCircle } from 'react-icons/fa'; // Additional icon for user profile

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [personality, setPersonality] = useState('friendly'); // Default personality

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <header className="bg-gray-900 shadow-lg p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <FaUserCircle className="text-4xl text-pink-500 mr-2" />
            <h1 className="text-3xl font-extrabold mr-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
              Applify Attraction
            </h1>
            <Profile user={user} />
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition duration-300 transform hover:scale-105"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      </header>
      <main className="flex-grow container mx-auto mt-10 p-6">
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 transition duration-300 transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Texting Practice for Men
          </h2>
          <div className="mb-6">
            <label className="text-white mr-2">Choose your AI Personality:</label>
            <select
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              className="bg-gray-700 text-white px-3 py-2 rounded focus:outline-none"
            >
              <option value="hot">Hot</option>
              <option value="caring">Caring</option>
              <option value="nice">Nice</option>
              <option value="friendly">Friendly</option>
              <option value="feisty">Feisty</option>
            </select>
          </div>
          <ChatInterface personality={personality} />
        </div>
      </main>
    </div>
  );
}
