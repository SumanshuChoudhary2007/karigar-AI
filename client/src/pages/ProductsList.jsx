import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Tag, Layers } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function ProductsList({ user, onLogout, products, setDraftProduct }) {
  const navigate = useNavigate();

  const handleSelectProduct = (prod) => {
    setDraftProduct(prod);
    navigate('/product-result');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-md mx-auto px-4 py-5 space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-gray-900">My Products</h1>
            <p className="text-xs font-medium text-gray-500">{products.length} Items published</p>
          </div>

          <button
            onClick={() => navigate('/add-product')}
            className="px-4 py-2 bg-amber-600 text-white font-bold rounded-full text-xs shadow-sm active-press flex items-center space-x-1"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 gap-4">
          {products.map((prod) => (
            <div
              key={prod.id}
              onClick={() => handleSelectProduct(prod)}
              className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm active-press cursor-pointer flex space-x-4 items-center"
            >
              <img
                src={prod.cleanedImage || prod.image}
                alt={prod.title}
                className="w-24 h-24 object-cover rounded-2xl shadow-inner bg-gray-100 flex-shrink-0"
              />

              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block">
                  {prod.craft}
                </span>

                <h2 className="text-base font-black text-gray-900 leading-snug truncate">
                  {prod.title}
                </h2>

                <p className="text-xs text-gray-500 truncate">{prod.category}</p>

                <div className="flex justify-between items-center pt-1 border-t border-gray-50 text-xs font-extrabold">
                  <span className="text-gray-900">
                    ₹{prod.recommendation?.suggestedMin ? `${prod.recommendation.suggestedMin} - ₹${prod.recommendation.suggestedMax}` : '1,250'}
                  </span>
                  <span className="text-green-700 font-bold">Published</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav role="ARTISAN" />
    </div>
  );
}
