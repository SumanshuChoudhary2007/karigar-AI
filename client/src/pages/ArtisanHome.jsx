import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, ShoppingBag, Lightbulb, PackageX } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import Header from '../components/Header';

export default function ArtisanHome({ user, onLogout, products = [], orders = [] }) {
  const navigate = useNavigate();

  // Extract first name dynamically from user account
  const firstName = user?.name ? user.name.split(' ')[0] : 'Artisan';

  // Genuine Dynamic Metrics from user's real DB records
  const salesTotal = user?.artisan?.salesTotal || 0;
  const ordersTotal = user?.artisan?.ordersTotal || orders.length || 0;
  const productsTotal = products.length || user?.artisan?.productCount || 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-24 w-full">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Header Greeting - Dynamic Name */}
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900">
            Hello, {firstName} 👋
          </h1>
          <p className="text-base font-medium text-gray-500 mt-1">
            Welcome back to your craft store
          </p>
        </div>

        {/* 3 Genuine Dynamic Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center md:text-left flex md:block justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Sales</span>
            <span className="text-2xl md:text-3xl font-black text-amber-600 block mt-1">
              ₹{salesTotal.toLocaleString()}
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center md:text-left flex md:block justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Orders</span>
            <span className="text-2xl md:text-3xl font-black text-gray-900 block mt-1">
              {ordersTotal}
            </span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center md:text-left flex md:block justify-between items-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Products</span>
            <span className="text-2xl md:text-3xl font-black text-gray-900 block mt-1">
              {productsTotal}
            </span>
          </div>
        </div>

        {/* 3 Large Primary Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/add-product')}
            className="w-full py-5 px-6 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-3xl text-xl shadow-md active-press flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <PlusCircle className="w-8 h-8" />
              <span>+ Add Product</span>
            </div>
            <span className="text-xs font-bold bg-amber-500/90 px-3 py-1.5 rounded-full text-white">
              AI Speech
            </span>
          </button>

          <button
            onClick={() => navigate('/buyers')}
            className="w-full py-5 px-6 bg-white hover:bg-amber-50 border-2 border-amber-500 text-amber-900 font-bold rounded-3xl text-xl shadow-sm active-press flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <Search className="w-7 h-7 text-amber-600" />
              <span>Find Buyers</span>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-full">
              B2B Match
            </span>
          </button>

          <button
            onClick={() => navigate('/orders')}
            className="w-full py-5 px-6 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold rounded-3xl text-xl shadow-sm active-press flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-7 h-7 text-gray-700" />
              <span>My Orders</span>
            </div>
            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
              {ordersTotal > 0 ? `${ordersTotal} Orders` : '0 Active'}
            </span>
          </button>
        </div>

        {/* Dynamic Business Insight Card */}
        {productsTotal === 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 shadow-sm flex items-start space-x-4">
            <Lightbulb className="w-7 h-7 text-amber-600 fill-amber-200 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-950 text-base">Get Started by Adding Your First Product</h3>
              <p className="text-sm font-medium text-amber-900 leading-relaxed mt-1">
                "Upload a photo or speak in your local language to create your catalog and get matched with B2B wholesale buyers!"
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-base mb-2">
              <Lightbulb className="w-6 h-6 text-amber-600 fill-amber-200" />
              <span>AI Business Insight</span>
            </div>
            <p className="text-base font-medium text-amber-900 leading-relaxed">
              "Your catalog is published. Keep pricing verified to attract wholesale buyer orders."
            </p>
          </div>
        )}
      </main>

      <BottomNav role="ARTISAN" />
    </div>
  );
}
