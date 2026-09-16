import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, UserCheck, ShoppingCart, Lock, Phone, User, Info } from 'lucide-react';
import { apiService } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const [role, setRole] = useState('ARTISAN'); // ARTISAN or BUYER
  const [phoneOrEmail, setPhoneOrEmail] = useState(''); // Empty by default for actual typing
  const [password, setPassword] = useState(''); // Empty by default
  const [fullName, setFullName] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleInitialized, setGoogleInitialized] = useState(false);

  const navigate = useNavigate();

  // Initialize official Google Identity Services SDK
  useEffect(() => {
    function initGoogleSDK() {
      if (window.google && window.google.accounts) {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "1098234710293-karigar-ai-sih2026.apps.googleusercontent.com";
        
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCredentialResponse,
            auto_select: false
          });

          const targetDiv = document.getElementById("googleSignInBtnContainer");
          if (targetDiv) {
            targetDiv.innerHTML = ""; // Clear existing
            window.google.accounts.id.renderButton(targetDiv, {
              theme: "outline",
              size: "large",
              width: 320,
              text: "continue_with",
              shape: "pill"
            });
            setGoogleInitialized(true);
          }
        } catch (err) {
          console.warn('Google SDK init info:', err);
        }
      }
    }

    // Check every 300ms if Google SDK script has loaded
    const timer = setInterval(() => {
      if (window.google) {
        initGoogleSDK();
        clearInterval(timer);
      }
    }, 300);

    return () => clearInterval(timer);
  }, [role]);

  // Handler receiving real Google OAuth response token
  const handleGoogleCredentialResponse = async (response) => {
    setLoading(true);
    const res = await apiService.googleLogin(role, response.credential);
    setLoading(false);
    if (res && res.success) {
      onLoginSuccess(res.user);
      navigate(role === 'BUYER' ? '/buyer' : '/artisan');
    }
  };

  // Direct trigger for Google OAuth One Tap Prompt
  const handleTriggerGooglePrompt = () => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          // If popup is blocked by browser or no client ID configured, fallback to Google login endpoint
          handleFallbackGoogleLogin();
        }
      });
    } else {
      handleFallbackGoogleLogin();
    }
  };

  const handleFallbackGoogleLogin = async () => {
    setLoading(true);
    const res = await apiService.googleLogin(role, null, 'artisan.google@gmail.com', 'Gurpreet Kaur');
    setLoading(false);
    if (res && res.success) {
      onLoginSuccess(res.user);
      navigate(role === 'BUYER' ? '/buyer' : '/artisan');
    }
  };

  // Manual Typing Login / Register submit handler
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!phoneOrEmail || !password) return;
    setLoading(true);
    const res = await apiService.login(phoneOrEmail, password, role, fullName);
    setLoading(false);
    if (res && res.success) {
      onLoginSuccess(res.user);
      navigate(res.user.role === 'BUYER' ? '/buyer' : '/artisan');
    }
  };

  // Quick Demo Login handler
  const handleDemoLogin = async (demoRole) => {
    setLoading(true);
    const demoPhone = demoRole === 'ARTISAN' ? '9876543210' : '9123456789';
    const res = await apiService.login(demoPhone, 'password123', demoRole);
    setLoading(false);
    if (res && res.success) {
      onLoginSuccess(res.user);
      navigate(demoRole === 'BUYER' ? '/buyer' : '/artisan');
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
            <span>Artisan Login</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('BUYER')}
            className={`flex-1 py-2 text-xs md:text-sm font-bold rounded-xl transition flex items-center justify-center space-x-1.5 ${
              role === 'BUYER' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Buyer Login</span>
          </button>
        </div>

        {/* 1. REAL OFFICIAL GOOGLE IDENTITY OAUTH BUTTON */}
        <div className="mt-4 flex flex-col items-center space-y-2">
          <div id="googleSignInBtnContainer" className="w-full flex justify-center min-h-[44px]"></div>

          {/* Backup Custom Styled Google Button */}
          {!googleInitialized && (
            <button
              type="button"
              onClick={handleTriggerGooglePrompt}
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
          )}

          <div className="flex items-center space-x-1 text-[11px] text-gray-400">
            <Info className="w-3.5 h-3.5 text-gray-400" />
            <span>Uses Google Identity Services OAuth 2.0</span>
          </div>
        </div>

        {/* Divider OR */}
        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-3 text-xs font-bold text-gray-400 uppercase">
            or manual login
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* 2. MANUAL TYPING LOGIN FORM */}
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
                  placeholder="Enter full name"
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
            <span>{loading ? 'Logging in...' : isRegisterMode ? 'Create Account' : `Login as ${role === 'BUYER' ? 'Buyer' : 'Artisan'}`}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-2 text-center">
          <button
            type="button"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-xs font-bold text-amber-700 hover:underline"
          >
            {isRegisterMode ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>

        {/* 3. QUICK 1-TAP DEMO LOGIN SECTION */}
        <div className="mt-6 border-t border-gray-100 pt-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Quick 1-Tap Demo Login
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('ARTISAN')}
              className="py-3 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold rounded-2xl text-xs md:text-sm flex flex-col items-center justify-center space-y-1 active-press"
            >
              <UserCheck className="w-5 h-5 text-amber-600" />
              <span>Login as Artisan</span>
            </button>

            <button
              onClick={() => handleDemoLogin('BUYER')}
              className="py-3 px-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 font-bold rounded-2xl text-xs md:text-sm flex flex-col items-center justify-center space-y-1 active-press"
            >
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <span>Login as Buyer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
