
import React from 'react';
import { StarIcon } from './icons/IconComponents';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, maxStars = 5 }) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: maxStars }, (_, i) => (
        <StarIcon
          key={i}
          className={`w-4 h-4 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          filled={i < Math.round(rating)}
        />
      ))}
    </div>
  );
};

export default RatingStars;
