import { useState } from 'react';

export default function Profile({ user }) {
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleSave = async () => {
    // TODO: Implement API call to update user profile
    setEditing(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      {editing ? (
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </form>
      ) : (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setEditing(true)} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Edit Profile</button>
        </div>
      )}
    </div>
  );
}