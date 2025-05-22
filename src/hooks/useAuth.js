import { useState, useEffect } from 'react';
import api from '../config/axios';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);

  const verifyAuth = async () => {
    try {
      const { data } = await api.get('/auth/verify');
      setIsAuthenticated(data.auth);
      setUser(data.usuario);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return { isAuthenticated, authLoading, user, verifyAuth };
};