import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Sparkles, User, LogOut } from 'lucide-react';

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/artisan' || location.pathname === '/buyer';

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 md:px-8 py-3.5 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {!isHome && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 active:scale-95 transition"
              aria-label="Go Back"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <div
            className="flex items-center space-x-2.5 cursor-pointer"
            onClick={() => navigate(user?.role === 'BUYER' ? '/buyer' : '/artisan')}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-extrabold shadow-sm">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-gray-900 block leading-tight">
                Karigar <span className="text-amber-600">AI</span>
              </span>
              <span className="text-xs text-gray-500 block -mt-0.5 font-medium">
                {user?.role === 'BUYER' ? 'Buyer Portal' : 'Artisan Edition'}
              </span>
            </div>
          </div>
        </div>

        {user && (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 text-xs md:text-sm font-bold border border-amber-200 hover:bg-amber-100 transition"
            >
              <User className="w-4 h-4 text-amber-600" />
              <span>{user.name ? user.name : 'Gurpreet Kaur'}</span>
            </button>
            <button
              onClick={onLogout}
              className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
