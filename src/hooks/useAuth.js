import { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    console.log('Current user:', user); // Add this line
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  return { user, loading };
}
