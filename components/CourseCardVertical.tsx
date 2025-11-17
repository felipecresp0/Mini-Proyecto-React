
import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import RatingStars from './RatingStars';

interface CourseCardVerticalProps {
  course: Course;
}

const CourseCardVertical: React.FC<CourseCardVerticalProps> = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`} className="flex items-center bg-white rounded-2xl shadow-md p-4 space-x-4 transition-transform transform hover:-translate-y-1">
      <img src={course.imageUrl} alt={course.title} className="w-24 h-24 object-cover rounded-xl flex-shrink-0" />
      <div className="flex-grow overflow-hidden">
        <h3 className="font-bold text-gray-800 truncate">{course.title}</h3>
        <p className="text-sm text-primary font-medium my-1">{course.category}</p>
        <p className="text-xs text-gray-500 leading-relaxed overflow-hidden text-ellipsis h-8">{course.description}</p>
        <div className="flex items-center mt-2">
            <RatingStars rating={course.rating} />
            <span className="text-xs text-gray-500 ml-2">({course.reviews})</span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCardVertical;
