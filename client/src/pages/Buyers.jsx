import React, { useState, useEffect } from 'react';
import { PhoneCall, Check, MapPin, Package, DollarSign, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { apiService } from '../services/api';

export default function Buyers({ user, onLogout }) {
  const [buyers, setBuyers] = useState([]);
  const [contactedId, setContactedId] = useState(null);

  useEffect(() => {
    async function loadBuyers() {
      const data = await apiService.getBuyers();
      setBuyers(data || []);
    }
    loadBuyers();
  }, []);

  const handleContactBuyer = (id) => {
    setContactedId(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-md mx-auto px-4 py-5 space-y-5">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-black text-gray-900">Find Buyers</h1>
            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 font-extrabold text-xs rounded-full">
              B2B Linkage
            </span>
          </div>
          <p className="text-xs font-medium text-gray-500 mt-0.5">
            AI-matched verified wholesale requirements
          </p>
        </div>

        {/* Buyers List Cards */}
        <div className="space-y-4">
          {buyers.map((buyer) => (
            <div
              key={buyer.id}
              className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4 relative overflow-hidden"
            >
              {/* Header Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-black text-gray-900 leading-snug">
                    {buyer.companyName}
                  </h2>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 font-semibold mt-0.5">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{buyer.location}</span>
                    </span>
                    <span>•</span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full text-gray-700">
                      {buyer.businessType || 'Retailer'}
                    </span>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-2xl text-center">
                  <span className="text-xs font-bold text-amber-700 block uppercase tracking-wider text-[10px]">Match</span>
                  <span className="text-lg font-black text-amber-900 leading-tight">
                    {buyer.matchScore}%
                  </span>
                </div>
              </div>

              {/* Requirement details */}
              <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-100 text-xs">
                <div className="space-y-0.5">
                  <span className="text-gray-400 font-semibold flex items-center space-x-1">
                    <Package className="w-3.5 h-3.5 text-gray-500" />
                    <span>Needs</span>
                  </span>
                  <span className="font-extrabold text-gray-900 block">{buyer.needs}</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-gray-400 font-semibold flex items-center space-x-1">
                    <DollarSign className="w-3.5 h-3.5 text-gray-500" />
                    <span>Budget</span>
                  </span>
                  <span className="font-extrabold text-gray-900 block">{buyer.budget}</span>
                </div>
              </div>

              {/* AI Match Reasons Checklist */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Match Reasons:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {buyer.reasons?.map((reason, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 text-xs font-bold text-green-700">
                      <Check className="w-4 h-4 text-green-600 stroke-[3px]" />
                      <span className="truncate">{reason.replace('Product type match', 'Product').replace('Budget alignment', 'Budget').replace('Quantity capacity', 'Quantity').replace('Same regional location', 'Location')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Button */}
              {contactedId === buyer.id ? (
                <div className="bg-green-50 border border-green-200 p-3 rounded-2xl text-center space-y-1">
                  <span className="text-sm font-black text-green-800 block">
                    ✓ Connected with Buyer
                  </span>
                  <p className="text-xs font-semibold text-green-700">
                    Call: {buyer.contactPhone || '+91 91234 56789'}
                  </p>
                </div>
              ) : (
                <button
                  onClick={() => handleContactBuyer(buyer.id)}
                  className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full text-base shadow-sm active-press flex items-center justify-center space-x-2"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>Contact Buyer</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      <BottomNav role="ARTISAN" />
    </div>
  );
}
