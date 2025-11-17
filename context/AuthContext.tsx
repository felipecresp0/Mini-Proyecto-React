import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/apiMock';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (name: string, email: string, pass: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
        const storedData = localStorage.getItem('user');
        return storedData ? JSON.parse(storedData).user : null;
    } catch {
        return null;
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This logic remains the same, just ensures hydration on start
    try {
        const storedData = localStorage.getItem('user');
        if (storedData) {
            setUser(JSON.parse(storedData).user);
        }
    } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        localStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, pass: string) => {
    setLoading(true);
    try {
        const response = await api.signIn(email, pass); // response includes { user, token }
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response)); // Store user and token
    } finally {
        setLoading(false);
    }
  };

  const signUp = async (name: string, email: string, pass: string) => {
    setLoading(true);
    try {
        const response = await api.signUp(name, email, pass);
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response));
    } finally {
        setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
