
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PrimaryButton from '../components/PrimaryButton';
import { EyeIcon, EyeOffIcon } from '../components/icons/IconComponents';

const SignUpIllustration: React.FC = () => (
    <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
        <g transform="translate(100 100)">
            <rect x="-60" y="-40" width="120" height="80" rx="10" fill="#EAE8FD"/>
            <rect x="-55" y="-35" width="110" height="60" rx="5" fill="#FFFFFF"/>
            <rect x="-60" y="35" width="120" height="10" rx="5" fill="#D6D1FA"/>
            <circle cx="-30" cy="0" r="15" fill="#6A5AE0"/>
            <path d="M -30 -15 A 15 15 0 0 1 -30 15" fill="#8A7AF3" />
            <path d="M 0 -15 L 40 -15 L 40 15 L 0 15 Z" fill="#F0F0F0"/>
            <circle cx="10" cy="0" r="2" fill="#A0AEC0"/>
            <circle cx="20" cy="0" r="2" fill="#A0AEC0"/>
            <circle cx="30" cy="0" r="2" fill="#A0AEC0"/>
        </g>
    </svg>
);


const SignUpPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { signUp, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        try {
            await signUp(name, email, password);
            navigate('/home');
        } catch (err) {
            setError('Failed to sign up. Please try again.');
        }
    };
    
  return (
    <div className="min-h-screen flex flex-col justify-center p-8 bg-white">
      <SignUpIllustration />
      <form onSubmit={handleSubmit} className="w-full space-y-6 mt-8">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-500">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:ring-primary focus:border-primary focus:bg-white"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-500">Email address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:ring-primary focus:border-primary focus:bg-white"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="relative">
          <label htmlFor="password"className="text-sm font-medium text-gray-500">Password</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:ring-primary focus:border-primary focus:bg-white"
            placeholder="••••••••"
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-400">
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <PrimaryButton type="submit" isLoading={loading}>Sign Up</PrimaryButton>
      </form>
      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link to="/signin" className="font-semibold text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
