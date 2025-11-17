
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PrimaryButton from '../components/PrimaryButton';
import { EyeIcon, EyeOffIcon } from '../components/icons/IconComponents';

const SignInIllustration: React.FC = () => (
    <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto">
        <g transform="translate(100 100)">
            <rect x="-60" y="-40" width="120" height="80" rx="10" fill="#EAE8FD"/>
            <circle cx="0" cy="-50" r="20" fill="#6A5AE0"/>
            <circle cx="0" cy="-50" r="15" fill="#FFFFFF"/>
            <path d="M -5 -50 L 5 -50 L 5 -40 L -5 -40 Z" fill="#6A5AE0"/>
            <path d="M -5 -35 L 5 -35" stroke="#6A5AE0" strokeWidth="2"/>
            <path d="M 0 -20 L 20 20 L -20 20 Z" fill="#D6D1FA"/>
        </g>
    </svg>
);


const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/home');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center p-8 bg-white">
        <SignInIllustration />
      <form onSubmit={handleSubmit} className="w-full space-y-6 mt-8">
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
          <label htmlFor="password" className="text-sm font-medium text-gray-500">Password</label>
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
        <PrimaryButton type="submit" isLoading={loading}>Sign In</PrimaryButton>
      </form>
      <p className="mt-8 text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link to="/signup" className="font-semibold text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
