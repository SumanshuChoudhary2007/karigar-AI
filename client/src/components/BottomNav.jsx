import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Package, ShoppingBag, User } from 'lucide-react';

export default function BottomNav({ role = 'ARTISAN' }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = role === 'BUYER' ? [
    { label: 'Home', path: '/buyer', icon: Home },
    { label: 'Artisans', path: '/buyers', icon: Package },
    { label: 'Orders', path: '/orders', icon: ShoppingBag },
    { label: 'Profile', path: '/profile', icon: User },
  ] : [
    { label: 'Home', path: '/artisan', icon: Home },
    { label: 'Products', path: '/products', icon: Package },
    { label: 'Orders', path: '/orders', icon: ShoppingBag },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 py-2.5 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-around md:justify-center md:space-x-12 items-center px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-colors active-press ${
                isActive ? 'text-amber-600 font-bold' : 'text-gray-500 font-medium hover:text-gray-800'
              }`}
            >
              <Icon className={`w-6 h-6 mb-0.5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
