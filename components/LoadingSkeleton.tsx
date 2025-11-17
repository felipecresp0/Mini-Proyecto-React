
import React from 'react';

const Skeleton: React.FC<{className?: string}> = ({ className }) => (
    <div className={`bg-gray-200 rounded-md animate-pulse ${className}`}></div>
);


export const HorizontalCardSkeleton: React.FC = () => (
    <div className="flex-shrink-0 w-48 bg-white rounded-2xl shadow-md p-3 space-y-2 mr-4">
        <Skeleton className="w-full h-32 rounded-xl" />
        <Skeleton className="w-3/4 h-5" />
        <Skeleton className="w-1/2 h-4" />
    </div>
);

export const VerticalCardSkeleton: React.FC = () => (
    <div className="flex items-center bg-white rounded-2xl shadow-md p-4 space-x-4">
        <Skeleton className="w-24 h-24 rounded-xl flex-shrink-0" />
        <div className="flex-grow space-y-2">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-1/4 h-4" />
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-1/2 h-4" />
        </div>
    </div>
);
