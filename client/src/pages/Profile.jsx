import React, { useState } from 'react';
import { User, MapPin, Award, BookOpen, Edit3, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

export default function Profile({ user, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [story, setStory] = useState(
    "Master craftswoman Gurpreet carries forward a 12-year generational legacy of traditional Punjabi Phulkari silk hand embroidery. Each piece reflects centuries-old heritage patterns passed down through women artisans in Patiala."
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-md mx-auto px-4 py-5 space-y-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Artisan Profile</h1>
          <p className="text-xs font-medium text-gray-500">Your craft identity & heritage story</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5 text-center">
          <div className="w-20 h-20 bg-amber-500 text-white font-black text-3xl rounded-3xl flex items-center justify-center mx-auto shadow-md">
            G
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900">Gurpreet Handicrafts</h2>
            <div className="flex justify-center items-center space-x-2 text-xs font-bold text-gray-500 mt-1">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Punjab, India</span>
              </span>
              <span>•</span>
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                Phulkari Craft
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-left">
            <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center space-x-3">
              <Award className="w-6 h-6 text-amber-600" />
              <div>
                <span className="text-xs text-gray-400 font-semibold block">Experience</span>
                <span className="text-sm font-black text-gray-900">12 Years</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center space-x-3">
              <User className="w-6 h-6 text-gray-700" />
              <div>
                <span className="text-xs text-gray-400 font-semibold block">Products</span>
                <span className="text-sm font-black text-gray-900">8 Items</span>
              </div>
            </div>
          </div>

          {/* My Craft Story Section */}
          <div className="text-left space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center space-x-1">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>My Craft Story</span>
              </span>
              <span className="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>AI Refined</span>
              </span>
            </div>

            {editing ? (
              <div className="space-y-2">
                <textarea
                  rows={4}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium text-gray-800"
                />
                <button
                  onClick={() => setEditing(false)}
                  className="w-full py-2.5 bg-gray-900 text-white font-bold rounded-xl text-xs"
                >
                  Save Story
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100 italic">
                "{story}"
              </p>
            )}
          </div>

          <button
            onClick={() => setEditing(!editing)}
            className="w-full py-3.5 bg-gray-900 hover:bg-black text-white font-bold rounded-full text-base shadow-sm active-press flex items-center justify-center space-x-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>{editing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>
      </main>

      <BottomNav role="ARTISAN" />
    </div>
  );
}
