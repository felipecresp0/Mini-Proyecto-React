
import React from 'react';
import { useAuth } from '../context/AuthContext';
import PrimaryButton from '../components/PrimaryButton';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/signin');
  };

  return (
    <div className="p-6">
      <header className="flex flex-col items-center pt-8 pb-6 text-center">
        <img src={user?.avatarUrl} alt="User avatar" className="w-24 h-24 rounded-full mb-4 ring-4 ring-primary-light ring-opacity-50" />
        <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
        <p className="text-gray-500">{user?.email}</p>
      </header>

      <div className="space-y-4 mt-8">
        <Link to="/create-course">
          <button className="w-full text-left p-4 bg-gray-100 rounded-lg font-medium text-gray-700 hover:bg-gray-200">
            Create a New Course
          </button>
        </Link>
        <button className="w-full text-left p-4 bg-gray-100 rounded-lg font-medium text-gray-700 hover:bg-gray-200">
          Settings
        </button>
        <button className="w-full text-left p-4 bg-gray-100 rounded-lg font-medium text-gray-700 hover:bg-gray-200">
          Help Center
        </button>
      </div>

      <div className="mt-12">
        <PrimaryButton onClick={handleSignOut} className="bg-red-500 hover:bg-red-600">
          Sign Out
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ProfilePage;
