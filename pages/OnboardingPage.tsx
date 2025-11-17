
import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';

const OnboardingIllustration: React.FC = () => (
    <svg viewBox="0 0 200 200" className="w-64 h-64 mx-auto">
        <g transform="translate(100 100)">
            <path d="M-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0" fill="#EAE8FD" />
            <text x="-15" y="10" fontFamily="Poppins, sans-serif" fontSize="40" fontWeight="bold" fill="#6A5AE0">A+</text>
            <path d="M 0,-60 L 50,0 L 20,60 L 0,50 Z" fill="#D6D1FA" />
            <path d="M 5, -50 L 15, -40 L -20, 70 L -30, 60 Z" fill="#6A5AE0" transform="rotate(-15)" />
            <circle cx="40" cy="-30" r="8" fill="#F0F0F0"/>
            <circle cx="45" cy="-35" r="3" fill="#A0AEC0"/>
        </g>
    </svg>
);

const OnboardingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-8 bg-white">
      <div className="flex-grow flex flex-col justify-center items-center">
        <OnboardingIllustration />
        <h1 className="text-3xl font-bold text-secondary mt-8">Let's find the "A" with us</h1>
        <p className="text-light-gray mt-4 max-w-xs">
          Please Sign in to view personalized recommendations
        </p>
      </div>
      <div className="w-full">
        <Link to="/signup">
            <PrimaryButton>Sign Up</PrimaryButton>
        </Link>
        <Link to="/signin" className="block mt-4 text-primary font-semibold">
          Skip
        </Link>
      </div>
    </div>
  );
};

export default OnboardingPage;
