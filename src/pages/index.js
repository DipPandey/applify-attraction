import { useState } from 'react';
import { register, login, logout } from '../services/authService'; // Add logout here
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';


export default function Home() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, email, password);
      setMessage(response.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      setMessage('Login successful');
      router.push('/dashboard');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleLogout = () => {
    logout();
    setMessage('Logged out successfully');
    router.reload(); // This will refresh the page, showing the login/register forms
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.userId}</h1>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Applify Attraction</h1>
        <form onSubmit={handleRegister} className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
        <form onSubmit={handleLogin}>
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
          >
            Login
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
