
import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import CourseCardVertical from '../components/CourseCardVertical';
import { VerticalCardSkeleton } from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { ArrowLeftIcon } from '../components/icons/IconComponents';
import { useNavigate } from 'react-router-dom';

const FavoritesPage: React.FC = () => {
  const { favorites, loading } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="p-6">
       <header className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="p-2 mr-4">
          <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Favorites</h1>
      </header>
      
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => <VerticalCardSkeleton key={i} />)}
        </div>
      ) : favorites.length > 0 ? (
        <div className="space-y-4">
          {favorites.map(course => <CourseCardVertical key={course.id} course={course} />)}
        </div>
      ) : (
        <EmptyState 
          title="No Favorites Yet"
          message="Tap the heart on any course to save it here."
        />
      )}
    </div>
  );
};

export default FavoritesPage;
