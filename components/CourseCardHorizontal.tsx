
import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface CourseCardHorizontalProps {
  course: Course;
}

const CourseCardHorizontal: React.FC<CourseCardHorizontalProps> = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`} className="flex-shrink-0 w-48 bg-white rounded-2xl shadow-md p-3 space-y-2 mr-4 text-left transition-transform transform hover:-translate-y-1">
      <div className="relative">
        <img src={course.author?.avatarUrl} alt={course.author?.name} className="w-full h-32 object-cover rounded-xl" />
         <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-md">{course.category}</div>
      </div>
      <h3 className="font-semibold text-gray-800 truncate">{course.author?.name}</h3>
      <p className="text-sm text-gray-500">{course.title}</p>
    </Link>
  );
};

export default CourseCardHorizontal;
