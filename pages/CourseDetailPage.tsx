
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Course } from '../types';
import { api } from '../services/apiMock';
import RatingStars from '../components/RatingStars';
import PrimaryButton from '../components/PrimaryButton';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { HeartIcon, ArrowLeftIcon } from '../components/icons/IconComponents';

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { isInCart, addToCart } = useCart();

  const isFavorited = id ? isFavorite(id) : false;
  const inCart = id ? isInCart(id) : false;

  useEffect(() => {
    if (id) {
      const fetchCourse = async () => {
        setLoading(true);
        const data = await api.getCourseById(id);
        setCourse(data);
        setLoading(false);
      };
      fetchCourse();
    }
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!id) return;
    if (isFavorited) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const handleAddToCart = () => {
    if (!id || inCart) return;
    addToCart(id);
  };

  if (loading) {
    return (
        <div className="p-4 space-y-4">
            <div className="bg-gray-200 rounded-lg animate-pulse h-56 w-full"></div>
            <div className="bg-gray-200 rounded-md animate-pulse h-6 w-1/4"></div>
            <div className="bg-gray-200 rounded-md animate-pulse h-8 w-3/4"></div>
            <div className="bg-gray-200 rounded-md animate-pulse h-20 w-full"></div>
            <div className="bg-gray-200 rounded-md animate-pulse h-12 w-full mt-4"></div>
        </div>
    );
  }

  if (!course) {
    return <div className="p-6 text-center">Course not found.</div>;
  }

  return (
    <div>
      <div className="relative">
        <img src={course.imageUrl} alt={course.title} className="w-full h-56 object-cover" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md">
          <ArrowLeftIcon className="h-6 w-6 text-gray-800" />
        </button>
        <button onClick={handleFavoriteToggle} className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
          <HeartIcon className={`h-6 w-6 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-500'}`} />
        </button>
      </div>

      <div className="p-6">
        <p className="font-semibold text-primary">{course.category}</p>
        <h1 className="text-2xl font-bold text-gray-800 mt-1">{course.title}</h1>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <RatingStars rating={course.rating} />
          <span className="ml-2">{course.rating} ({course.reviews} reviews)</span>
        </div>
        <p className="text-gray-600 mt-4">{course.description}</p>
        
        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">Lessons</h2>
        <div className="space-y-3">
          {course.lessons.map(lesson => (
            <div key={lesson.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-700">{lesson.title}</p>
              <span className="text-sm text-gray-500">{lesson.duration}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t">
        <PrimaryButton onClick={handleAddToCart} disabled={inCart}>
          {inCart ? 'Added to Cart' : `Buy Course - $${course.price}`}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default CourseDetailPage;
