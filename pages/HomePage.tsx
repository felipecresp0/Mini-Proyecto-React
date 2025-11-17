
import React, { useEffect, useState } from 'react';
import { Course } from '../types';
import { api } from '../services/apiMock';
import { useAuth } from '../context/AuthContext';
import CourseCardHorizontal from '../components/CourseCardHorizontal';
import CourseCardVertical from '../components/CourseCardVertical';
import { HorizontalCardSkeleton, VerticalCardSkeleton } from '../components/LoadingSkeleton';
import { SearchIcon, FilterIcon, ChevronDownIcon } from '../components/icons/IconComponents';

const HomePage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const data = await api.getCourses();
      setCourses(data);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const popularCourses = courses.slice(0, 5);
  const recommendedCourses = courses.slice(5, 15);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Good afternoon!</h1>
          <p className="text-gray-500">{user?.name}</p>
        </div>
        <img src={user?.avatarUrl} alt="User avatar" className="w-12 h-12 rounded-full" />
      </header>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-4 pr-20 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button className="p-2 bg-primary rounded-lg text-white">
            <SearchIcon className="h-5 w-5" />
          </button>
          <button className="p-2 ml-2 text-gray-500">
            <FilterIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Popular Courses</h2>
          <button className="text-gray-500">
            <ChevronDownIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex overflow-x-auto pb-4 -mx-6 px-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <HorizontalCardSkeleton key={i} />)
          ) : (
            popularCourses.map(course => <CourseCardHorizontal key={course.id} course={course} />)
          )}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recommended Courses</h2>
           <button className="text-gray-500">
            <ChevronDownIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <VerticalCardSkeleton key={i} />)
          ) : (
            recommendedCourses.map(course => <CourseCardVertical key={course.id} course={course} />)
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
