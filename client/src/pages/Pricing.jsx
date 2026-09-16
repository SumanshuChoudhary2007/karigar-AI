import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, Calculator, Info } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { apiService } from '../services/api';

export default function Pricing({ user, onLogout, draftProduct, addProductToList }) {
  const navigate = useNavigate();

  // Mathematical Cost State
  const [materialCost, setMaterialCost] = useState(450);
  const [labourCost, setLabourCost] = useState(300);
  const [packaging, setPackaging] = useState(50);
  const [shipping, setShipping] = useState(100);
  const [otherCost, setOtherCost] = useState(50);

  // Exact Mathematical Total
  const totalCost = Number(materialCost) + Number(labourCost) + Number(packaging) + Number(shipping) + Number(otherCost);

  // AI Recommendation State derived mathematically
  const [recommendation, setRecommendation] = useState({
    suggestedMin: 1250,
    suggestedMax: 1450,
    estimatedProfitMin: 300,
    estimatedProfitMax: 500,
    confidenceScore: 78,
    explanation: 'Suggested using your production cost and demo market data.'
  });

  const [saving, setSaving] = useState(false);

  // Recalculate AI Price Recommendation mathematically on cost change
  useEffect(() => {
    async function updatePricing() {
      const res = await apiService.calculatePricing({
        materialCost,
        labourCost,
        packaging,
        shipping,
        otherCost
      });
      if (res && res.recommendation) {
        setRecommendation(res.recommendation);
      }
    }
    updatePricing();
  }, [materialCost, labourCost, packaging, shipping, otherCost]);

  const handleSaveProduct = async () => {
    setSaving(true);
    const finalProduct = {
      ...draftProduct,
      cost: {
        materialCost,
        labourCost,
        packaging,
        shipping,
        otherCost,
        totalCost
      },
      recommendation
    };

    if (addProductToList) {
      addProductToList(finalProduct);
    }

    setSaving(false);
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-md mx-auto px-4 py-5 space-y-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Set Your Price</h1>
          <p className="text-xs font-medium text-gray-500">Calculate itemized costs & AI price recommendations</p>
        </div>

        {/* Cost Inputs Form */}
        <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-gray-900 font-bold border-b border-gray-100 pb-3">
            <Calculator className="w-5 h-5 text-amber-600" />
            <span>Production Cost Breakdown</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-700">Material Cost</label>
              <div className="flex items-center space-x-1 w-32">
                <span className="text-sm font-extrabold text-gray-500">₹</span>
                <input
                  type="number"
                  value={materialCost}
                  onChange={(e) => setMaterialCost(Number(e.target.value))}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 text-right focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-700">Labour Cost</label>
              <div className="flex items-center space-x-1 w-32">
                <span className="text-sm font-extrabold text-gray-500">₹</span>
                <input
                  type="number"
                  value={labourCost}
                  onChange={(e) => setLabourCost(Number(e.target.value))}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 text-right focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-700">Packaging</label>
              <div className="flex items-center space-x-1 w-32">
                <span className="text-sm font-extrabold text-gray-500">₹</span>
                <input
                  type="number"
                  value={packaging}
                  onChange={(e) => setPackaging(Number(e.target.value))}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 text-right focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-700">Shipping</label>
              <div className="flex items-center space-x-1 w-32">
                <span className="text-sm font-extrabold text-gray-500">₹</span>
                <input
                  type="number"
                  value={shipping}
                  onChange={(e) => setShipping(Number(e.target.value))}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 text-right focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-gray-700">Other</label>
              <div className="flex items-center space-x-1 w-32">
                <span className="text-sm font-extrabold text-gray-500">₹</span>
                <input
                  type="number"
                  value={otherCost}
                  onChange={(e) => setOtherCost(Number(e.target.value))}
                  className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900 text-right focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Mathematical Total Cost Output */}
          <div className="bg-gray-100 p-4 rounded-2xl flex justify-between items-center border border-gray-200 mt-2">
            <span className="text-base font-extrabold text-gray-800">Total Cost:</span>
            <span className="text-2xl font-black text-gray-900">
              ₹{totalCost.toLocaleString()}
            </span>
          </div>
        </div>

        {/* AI Price Suggestion Card */}
        <div className="bg-amber-50 border-2 border-amber-400 rounded-3xl p-5 shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-950 font-black text-lg">
              <Sparkles className="w-6 h-6 text-amber-600 fill-amber-300" />
              <span>AI Price Suggestion</span>
            </div>
            <span className="px-2.5 py-1 bg-amber-200 text-amber-900 text-xs font-black rounded-full">
              {recommendation.confidenceScore}% Confidence
            </span>
          </div>

          <div className="text-center py-2 bg-white/80 backdrop-blur rounded-2xl border border-amber-200">
            <span className="text-3xl font-black text-amber-900 block">
              ₹{recommendation.suggestedMin.toLocaleString()} – ₹{recommendation.suggestedMax.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-amber-700 block mt-1">
              Estimated Profit: ₹{recommendation.estimatedProfitMin.toLocaleString()} – ₹{recommendation.estimatedProfitMax.toLocaleString()}
            </span>
          </div>

          <p className="text-xs font-medium text-amber-900 leading-relaxed bg-amber-100/60 p-2.5 rounded-xl border border-amber-200/50">
            "{recommendation.explanation}"
          </p>

          <div className="flex items-center justify-between text-[11px] text-amber-800 font-bold pt-1">
            <span className="flex items-center space-x-1">
              <Info className="w-3.5 h-3.5 text-amber-600" />
              <span>Calculated using production cost & craft data</span>
            </span>
            <span className="bg-amber-200/80 px-2 py-0.5 rounded text-amber-950">Demo Data</span>
          </div>
        </div>

        {/* Save Product Button */}
        <button
          onClick={handleSaveProduct}
          disabled={saving}
          className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full text-lg shadow-md active-press flex items-center justify-center space-x-2"
        >
          <Check className="w-6 h-6" />
          <span>{saving ? 'Saving Product...' : 'Save Product'}</span>
        </button>
      </main>

      <BottomNav role="ARTISAN" />
    </div>
  );
}
