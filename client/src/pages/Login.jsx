import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, UserCheck, ShoppingCart, Lock, Phone, User, X, Check, AlertCircle } from 'lucide-react';
import { apiService } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const [role, setRole] = useState('ARTISAN'); // ARTISAN or BUYER
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Google Account Chooser Modal state
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  const navigate = useNavigate();

  // Initialize real Google Identity SDK if real client ID present
  useEffect(() => {
    const realClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (realClientId && window.google && window.google.accounts) {
      try {
        window.google.accounts.id.initialize({
          client_id: realClientId,
          callback: handleGoogleCredentialResponse,
          auto_select: false
        });

        const targetDiv = document.getElementById("googleSignInBtnContainer");
        if (targetDiv) {
          targetDiv.innerHTML = "";
          window.google.accounts.id.renderButton(targetDiv, {
            theme: "outline",
            size: "large",
            width: 320,
            text: "continue_with",
            shape: "pill"
          });
        }
      } catch (err) {
        console.warn('Google SDK setup:', err);
      }
    }
  }, [role]);

  const handleGoogleCredentialResponse = async (response) => {
    setLoading(true);
    setErrorMsg('');
    const res = await apiService.googleLogin(role, response.credential);
    setLoading(false);
    if (res && res.success) {
      onLoginSuccess(res.user);
      navigate(role === 'BUYER' ? '/buyer' : '/artisan');
    } else if (res && res.error) {
      setErrorMsg(res.error);
    }
  };

  // Manual Typing Login / Register submit handler
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!phoneOrEmail || !password) return;
    setLoading(true);
    setErrorMsg('');

    const res = await apiService.login(phoneOrEmail, password, role, fullName, isRegisterMode);
    setLoading(false);

    if (res && res.success) {
      onLoginSuccess(res.user);
      navigate(res.user.role === 'BUYER' ? '/buyer' : '/artisan');
    } else if (res && res.error) {
      setErrorMsg(res.error);
      if (res.notFound) {
        setIsRegisterMode(true);
      }
    }
  };

  // Trigger Google Modal
  const handleGoogleClick = () => {
    const realClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (realClientId && window.google && window.google.accounts) {
      try {
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {
            setShowGoogleModal(true);
          }
        });
      } catch (e) {
        setShowGoogleModal(true);
      }
    } else {
      setShowGoogleModal(true);
    }
  };

  // Perform login with selected Google account
  const handleSelectGoogleAccount = async (email, name) => {
    setShowGoogleModal(false);
    setLoading(true);
    setErrorMsg('');
    const res = await apiService.googleLogin(role, null, email, name);
    setLoading(false);
    if (res && res.success) {
      onLoginSuccess(res.user);
      navigate(role === 'BUYER' ? '/buyer' : '/artisan');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-10 w-full relative">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100 text-center">
        {/* Brand Logo & Tagline */}
        <div className="w-16 h-16 bg-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-3 text-white shadow-md">
          <Sparkles className="w-9 h-9 fill-current" />
        </div>

        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Karigar <span className="text-amber-600">AI</span>
        </h1>
        <p className="text-gray-600 font-medium mt-1 text-sm md:text-base">
          Your craft. Your business.
        </p>

        {/* Role Toggle Header */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl mt-6 mb-2">
          <button
            type="button"
            onClick={() => setRole('ARTISAN')}
            className={`flex-1 py-2 text-xs md:text-sm font-bold rounded-xl transition flex items-center justify-center space-x-1.5 ${
              role === 'ARTISAN' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Artisan Account</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('BUYER')}
            className={`flex-1 py-2 text-xs md:text-sm font-bold rounded-xl transition flex items-center justify-center space-x-1.5 ${
              role === 'BUYER' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Buyer Account</span>
          </button>
        </div>

        {/* Error Alert Display */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl text-xs font-bold flex items-center space-x-2 text-left mt-3">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 1. GOOGLE SIGN IN BUTTON */}
        <div className="mt-4">
          <div id="googleSignInBtnContainer" className="hidden"></div>

          <button
            type="button"
            onClick={handleGoogleClick}
            disabled={loading}
            className="w-full py-3.5 px-4 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-bold rounded-2xl text-sm md:text-base shadow-sm active-press flex items-center justify-center space-x-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Divider OR */}
        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-3 text-xs font-bold text-gray-400 uppercase">
            {isRegisterMode ? 'or create account' : 'or login with credentials'}
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* 2. REAL MANUAL TYPING LOGIN & SIGNUP FORM */}
        <form onSubmit={handleManualSubmit} className="space-y-3.5 text-left">
          {isRegisterMode && (
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Phone Number or Email
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                placeholder="Enter 10-digit phone or email"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 font-bold rounded-full text-base shadow-sm active-press flex items-center justify-center space-x-2 text-white transition ${
              role === 'BUYER' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            <span>{loading ? 'Processing...' : isRegisterMode ? 'Create Real Account' : `Login to ${role === 'BUYER' ? 'Buyer' : 'Artisan'} Account`}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setErrorMsg('');
            }}
            className="text-xs font-bold text-amber-700 hover:underline"
          >
            {isRegisterMode ? 'Already have an account? Sign in' : "Don't have an account? Sign up now"}
          </button>
        </div>
      </div>

      {/* GOOGLE ACCOUNT CHOOSER MODAL */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 text-left">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="font-extrabold text-sm text-gray-800">Sign in with Google</span>
              </div>
              <button onClick={() => setShowGoogleModal(false)} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs font-semibold text-gray-500">
              Enter your Google account details to log in to <strong className="text-gray-900">Karigar AI</strong>:
            </p>

            {/* Real Google Account Input */}
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Gmail Address</label>
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customGoogleName}
                  onChange={(e) => setCustomGoogleName(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900"
                />
              </div>

              <button
                onClick={() => handleSelectGoogleAccount(customGoogleEmail || 'user@gmail.com', customGoogleName || 'User')}
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-sm"
              >
                Sign In & Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
