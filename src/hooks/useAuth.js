import { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    console.log('Current user:', currentUser);
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  return { user, loading };
}
