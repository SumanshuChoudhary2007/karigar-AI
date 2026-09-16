import React, { useState } from 'react';
import { Search, PlusCircle, ShoppingBag, CheckCircle, Sparkles, Send, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { apiService } from '../services/api';

export default function BuyerHome({ user, onLogout }) {
  const [view, setView] = useState('HOME'); // HOME, CREATE_REQ, MATCHES
  const [productName, setProductName] = useState('Handmade Bags');
  const [quantity, setQuantity] = useState(500);
  const [budgetPerUnit, setBudgetPerUnit] = useState(1500);
  const [deliveryDays, setDeliveryDays] = useState(30);
  const [location, setLocation] = useState('Punjab');
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState([]);
  const [enquirySentId, setEnquirySentId] = useState(null);

  const handleFindArtisans = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await apiService.createBuyerRequirement({
      productName,
      quantity,
      budgetPerUnit,
      deliveryDays,
      location
    });
    setLoading(false);
    if (res && res.matches) {
      setMatches(res.matches);
      setView('MATCHES');
    }
  };

  const handleSendEnquiry = (id) => {
    setEnquirySentId(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-md mx-auto px-4 py-5 space-y-5">
        {view === 'HOME' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-gray-900">Find Artisan Products</h1>
              <p className="text-sm font-medium text-gray-500 mt-0.5">
                Connect directly with marginalized rural artisans
              </p>
            </div>

            {/* Buyer Home Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setView('CREATE_REQ')}
                className="w-full py-4 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-lg shadow-md active-press flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <PlusCircle className="w-7 h-7" />
                  <span>Create Requirement</span>
                </div>
                <span className="text-xs font-semibold bg-blue-500/80 px-2.5 py-1 rounded-full text-white">
                  AI Match
                </span>
              </button>

              <button
                onClick={() => alert("Viewing Buyer B2B Purchase Orders")}
                className="w-full py-4 px-5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold rounded-2xl text-lg shadow-sm active-press flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="w-6 h-6 text-gray-700" />
                  <span>My Orders</span>
                </div>
                <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                  1 Order
                </span>
              </button>
            </div>

            {/* Featured Artisan Cluster Preview */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Featured Artisan Cooperative
              </span>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-amber-500 text-white font-black text-xl rounded-2xl flex items-center justify-center shadow-sm">
                  G
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900">Gurpreet Handicrafts</h3>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    Phulkari Silk Embroidery
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CREATE REQUIREMENT FORM */}
        {view === 'CREATE_REQ' && (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-black text-gray-900">Create Requirement</h1>
                <p className="text-xs font-medium text-gray-500">Post your bulk craft buying needs</p>
              </div>
              <button onClick={() => setView('HOME')} className="text-xs font-bold text-gray-500">
                Cancel
              </button>
            </div>

            <form onSubmit={handleFindArtisans} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Product</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Budget / unit</label>
                  <input
                    type="text"
                    value={`₹${budgetPerUnit}`}
                    onChange={(e) => setBudgetPerUnit(Number(e.target.value.replace(/[^0-9]/g, '')))}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Delivery Time</label>
                  <input
                    type="text"
                    value={`${deliveryDays} days`}
                    onChange={(e) => setDeliveryDays(Number(e.target.value.replace(/[^0-9]/g, '')))}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-lg shadow-md active-press flex items-center justify-center space-x-2 mt-2"
              >
                <Search className="w-5 h-5" />
                <span>{loading ? 'AI Matching...' : 'Find Artisans'}</span>
              </button>
            </form>
          </div>
        )}

        {/* AI FOUND MATCHES VIEW */}
        {view === 'MATCHES' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 font-extrabold text-xs rounded-full">
                  AI Matching Engine
                </span>
                <h1 className="text-2xl font-black text-gray-900 mt-1">
                  AI Found {matches.length} Matches
                </h1>
              </div>
              <button onClick={() => setView('CREATE_REQ')} className="text-xs font-bold text-blue-600">
                New Search
              </button>
            </div>

            <div className="space-y-3">
              {matches.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-black text-gray-900">{item.artisanName}</h2>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                        {item.craft}
                      </span>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-2xl text-center">
                      <span className="text-lg font-black text-blue-900">{item.matchScore}% Match</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-100 text-xs">
                    <div>
                      <span className="text-gray-400 font-semibold block">Capacity</span>
                      <strong className="text-gray-900 block">{item.capacity}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold block">Price / Unit</span>
                      <strong className="text-gray-900 block">{item.pricePerUnit}</strong>
                    </div>
                  </div>

                  {enquirySentId === item.id ? (
                    <div className="bg-green-50 border border-green-200 p-3 rounded-2xl text-center">
                      <span className="text-sm font-black text-green-800">
                        ✓ Enquiry Sent to Artisan
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSendEnquiry(item.id)}
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-base shadow-sm active-press flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <BottomNav role="BUYER" />
    </div>
  );
}
