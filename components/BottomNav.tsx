
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, HeartIcon, CartIcon, UserIcon } from './icons/IconComponents';

const BottomNav: React.FC = () => {
  const navItems = [
    { path: '/home', icon: HomeIcon, label: 'Home' },
    { path: '/favorites', icon: HeartIcon, label: 'Favorites' },
    { path: '/cart', icon: CartIcon, label: 'Cart' },
    { path: '/profile', icon: UserIcon, label: 'Profile' },
  ];

  const activeLinkClass = 'text-primary';
  const inactiveLinkClass = 'text-gray-400';

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-t-lg">
      <div className="flex justify-around items-center h-20">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center space-y-1 transition-colors duration-200 ${isActive ? activeLinkClass : inactiveLinkClass}`
            }
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
