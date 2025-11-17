
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Course } from '../types';
import { api } from '../services/apiMock';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: Course[];
  loading: boolean;
  addFavorite: (courseId: string) => Promise<void>;
  removeFavorite: (courseId: string) => Promise<void>;
  isFavorite: (courseId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  const fetchFavorites = useCallback(async () => {
    if (user) {
      setLoading(true);
      const favItems = await api.getFavorites();
      setFavorites(favItems);
      setLoading(false);
    } else {
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = async (courseId: string) => {
    await api.addToFavorites(courseId);
    fetchFavorites();
  };

  const removeFavorite = async (courseId: string) => {
    await api.removeFromFavorites(courseId);
    fetchFavorites();
  };

  const isFavorite = (courseId: string) => favorites.some(item => item.id === courseId);

  return (
    <FavoritesContext.Provider value={{ favorites, loading, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
