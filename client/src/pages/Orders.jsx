import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle2, ChevronRight, X, Calendar, Hash } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { apiService } from '../services/api';

export default function Orders({ user, onLogout }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      const data = await apiService.getOrders();
      setOrders(data || []);
    }
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header user={user} onLogout={onLogout} />

      <main className="max-w-md mx-auto px-4 py-5 space-y-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900">My Orders</h1>
          <p className="text-xs font-medium text-gray-500">Track active dispatch & buyer orders</p>
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm active-press cursor-pointer space-y-3"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div>
                  <span className="text-xs font-black text-amber-700 tracking-wider">
                    {order.orderNumber}
                  </span>
                  <h2 className="text-base font-extrabold text-gray-900">
                    {order.buyerName}
                  </h2>
                </div>
                <span className="px-3 py-1 bg-amber-50 text-amber-800 font-bold text-xs rounded-full border border-amber-200">
                  {order.status}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="text-gray-500 font-medium block text-xs">{order.productTitle}</span>
                  <span className="text-lg font-black text-gray-900 mt-0.5 block">
                    ₹{order.totalAmount?.toLocaleString()}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Order Details Delivery Tracking Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm flex items-end justify-center p-0 sm:p-4">
            <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order Details</span>
                  <h2 className="text-xl font-black text-gray-900">{selectedOrder.orderNumber}</h2>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Summary details */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2 text-sm">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Buyer:</span>
                  <strong className="text-gray-900">{selectedOrder.buyerName}</strong>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Items:</span>
                  <strong className="text-gray-900">{selectedOrder.productTitle}</strong>
                </div>
                <div className="flex justify-between text-xs text-gray-500 pt-1 border-t border-gray-200">
                  <span>Total Amount:</span>
                  <strong className="text-base font-black text-amber-700">₹{selectedOrder.totalAmount?.toLocaleString()}</strong>
                </div>
              </div>

              {/* Delivery Timeline Tracker */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                  Delivery Tracking
                </span>

                <div className="space-y-3 pl-2">
                  {selectedOrder.timeline?.map((item) => {
                    const isDone = item.completed;
                    const isCurrent = item.current;

                    return (
                      <div key={item.step} className="flex items-start space-x-3 relative">
                        <div className="mt-0.5">
                          {isDone ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600 fill-green-100" />
                          ) : isCurrent ? (
                            <div className="w-5 h-5 rounded-full border-4 border-amber-600 bg-white" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <span className={`text-sm font-bold block ${isCurrent ? 'text-amber-800' : isDone ? 'text-gray-900' : 'text-gray-400'}`}>
                            {item.label}
                          </span>
                          {item.date && (
                            <span className="text-xs font-medium text-gray-400 block">{item.date}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tracking ID & Carrier */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2 text-xs">
                <div className="flex items-center justify-between text-amber-900">
                  <span className="flex items-center space-x-1 font-bold">
                    <Hash className="w-4 h-4 text-amber-600" />
                    <span>Tracking ID:</span>
                  </span>
                  <span className="font-extrabold">{selectedOrder.trackingId || 'TRK-PK-984210'}</span>
                </div>
                <div className="flex items-center justify-between text-amber-900">
                  <span className="flex items-center space-x-1 font-bold">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>Expected Delivery:</span>
                  </span>
                  <span className="font-extrabold">{selectedOrder.expectedDelivery || '19 Sep 2026'}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-full text-base"
              >
                Close Tracking
              </button>
            </div>
          </div>
        )}
      </main>

      <BottomNav role="ARTISAN" />
    </div>
  );
}
