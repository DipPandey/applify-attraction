export default function Profile({ user }) {
  return (
    <div className="flex items-center">
      <div className="mr-4">
        <img
          src="/default-avatar.png"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div>
        <p className="font-semibold">{user.username}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </div>
  );
}