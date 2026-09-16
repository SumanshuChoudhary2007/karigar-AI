import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit3, ArrowRight, Info, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function ProductResult({ user, onLogout, draftProduct, setDraftProduct }) {
  const navigate = useNavigate();

  const product = draftProduct || {
    id: 'prod-101',
    title: 'Handmade Phulkari Cotton Bag',
    category: 'Handicraft / Bags',
    material: 'Cotton',
    craft: 'Phulkari',
    description: 'Handcrafted cotton tote bag featuring traditional Punjabi Phulkari floral silk embroidery. Durable handles with inner zip pocket.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop',
    translations: {
      en: { title: 'Handmade Phulkari Cotton Bag', description: 'Handcrafted cotton tote bag featuring traditional Punjabi Phulkari floral embroidery in vibrant silk threads.' },
      hi: { title: 'हस्तनिर्मित फुलकारी कॉटन बैग', description: 'पारंपरिक पंजाबी फुलकारी रेशमी धागों की कढ़ाई वाला हाथ से बना कॉटन का थैला।' },
      pa: { title: 'ਹੱਥ ਨਾਲ ਬਣਿਆ ਫੁਲਕਾਰੀ ਕੱਪੜੇ ਦਾ ਬੈਗ', description: 'ਪਰੰਪਰਾਗਤ ਪੰਜਾਬੀ ਫੁਲਕਾਰੀ ਕਢਾਈ ਨਾਲ ਤਿਆਰ ਕੀਤਾ ਗਿਆ ਕਪਾਹ ਦਾ ਬੈਗ।' }
    }
  };

  const [activeLang, setActiveLang] = useState('en');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(product.title);
  const [editedDesc, setEditedDesc] = useState(product.description);

  const activeTranslation = product.translations?.[activeLang] || {
    title: editedTitle,
    description: editedDesc
  };

  const handleSaveEdit = () => {
    setDraftProduct({
      ...product,
      title: editedTitle,
      description: editedDesc
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 w-full">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-6">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-8 h-8 text-green-600 fill-green-100" />
          <div>
            <h1 className="text-3xl font-black text-gray-900">Your Product is Ready</h1>
            <p className="text-sm font-medium text-gray-500">AI generated multilingual catalog</p>
          </div>
        </div>

        {/* Main Product Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <img
              src={product.cleanedImage || product.image}
              alt={product.title}
              className="w-full h-80 object-cover rounded-3xl shadow-sm"
            />

            <div className="space-y-5">
              {/* Multilingual Tabs */}
              <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                {[
                  { id: 'en', label: 'English' },
                  { id: 'hi', label: 'Hindi (हिंदी)' },
                  { id: 'pa', label: 'Punjabi (ਪੰਜਾਬੀ)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveLang(tab.id)}
                    className={`flex-1 py-2.5 text-xs md:text-sm font-bold rounded-xl transition ${
                      activeLang === tab.id
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Catalog Details */}
              {isEditing ? (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Title</label>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description</label>
                    <textarea
                      rows={4}
                      value={editedDesc}
                      onChange={(e) => setEditedDesc(e.target.value)}
                      className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800"
                    />
                  </div>
                  <button
                    onClick={handleSaveEdit}
                    className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                    {activeTranslation.title}
                  </h2>

                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-gray-100 text-xs md:text-sm">
                    <div>
                      <span className="text-gray-400 font-semibold block uppercase tracking-wider text-[10px]">Category</span>
                      <span className="font-bold text-gray-800 block mt-0.5">{product.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold block uppercase tracking-wider text-[10px]">Material</span>
                      <span className="font-bold text-gray-800 block mt-0.5">{product.material}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-semibold block uppercase tracking-wider text-[10px]">Craft</span>
                      <span className="font-bold text-amber-700 block mt-0.5">{product.craft}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Description</span>
                    <p className="text-base text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      {activeTranslation.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="py-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold rounded-full text-base flex items-center justify-center space-x-2 active-press"
                >
                  <Edit3 className="w-5 h-5 text-gray-600" />
                  <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                </button>

                <button
                  onClick={() => navigate('/pricing')}
                  className="py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full text-base shadow-sm active-press flex items-center justify-center space-x-2"
                >
                  <span>Continue to Pricing</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Small Disclaimer */}
              <div className="flex items-center justify-center space-x-1.5 text-xs font-medium text-gray-400 text-center pt-1">
                <Info className="w-4 h-4 text-gray-400" />
                <span>AI-generated information. Please verify before publishing.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav role="ARTISAN" />
    </div>
  );
}
