import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Package } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function ProductsList({ user, onLogout, products = [], setDraftProduct }) {
  const navigate = useNavigate();

  const handleSelectProduct = (prod) => {
    setDraftProduct(prod);
    navigate('/product-result');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 w-full">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-gray-900">My Products</h1>
            <p className="text-sm font-medium text-gray-500">{products.length} Items published</p>
          </div>

          <button
            onClick={() => navigate('/add-product')}
            className="px-5 py-2.5 bg-amber-600 text-white font-bold rounded-full text-sm shadow-sm active-press flex items-center space-x-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add New</span>
          </button>
        </div>

        {/* Product Cards Grid or Genuine Empty State */}
        {products.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-4">
            <Package className="w-14 h-14 text-gray-300 mx-auto" />
            <h2 className="text-xl font-bold text-gray-800">No products published yet</h2>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Create your first product catalog using voice speech or manual typing!
            </p>
            <button
              onClick={() => navigate('/add-product')}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full text-sm shadow-sm active-press inline-flex items-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Add Your First Product</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                onClick={() => handleSelectProduct(prod)}
                className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm active-press cursor-pointer space-y-4 hover:shadow-md transition"
              >
                <img
                  src={prod.cleanedImage || prod.image}
                  alt={prod.title}
                  className="w-full h-48 object-cover rounded-2xl shadow-inner bg-gray-100"
                />

                <div className="space-y-2">
                  <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full inline-block">
                    {prod.craft || 'Handicraft'}
                  </span>

                  <h2 className="text-lg font-black text-gray-900 leading-snug truncate">
                    {prod.title}
                  </h2>

                  <p className="text-xs text-gray-500 truncate">{prod.category}</p>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100 text-sm font-extrabold">
                    <span className="text-gray-900">
                      ₹{prod.recommendation?.suggestedMin ? `${prod.recommendation.suggestedMin} - ₹${prod.recommendation.suggestedMax}` : '1,250'}
                    </span>
                    <span className="text-green-700 font-bold text-xs bg-green-50 px-2 py-0.5 rounded-full">Published</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav role="ARTISAN" />
    </div>
  );
}
