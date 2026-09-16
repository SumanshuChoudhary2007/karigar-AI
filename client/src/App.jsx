import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import ArtisanHome from './pages/ArtisanHome';
import AddProduct from './pages/AddProduct';
import ProductResult from './pages/ProductResult';
import Pricing from './pages/Pricing';
import ProductsList from './pages/ProductsList';
import Buyers from './pages/Buyers';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import BuyerHome from './pages/BuyerHome';
import { apiService } from './services/api';

export default function App() {
  const [user, setUser] = useState(null); // Real initial auth state (null requires login/signup)
  const [products, setProducts] = useState([]);
  const [draftProduct, setDraftProduct] = useState(null);

  useEffect(() => {
    async function loadData() {
      const serverProducts = await apiService.getProducts();
      if (serverProducts && serverProducts.length > 0) {
        setProducts(serverProducts);
      }
    }
    loadData();
  }, [user]);

  const handleLogout = () => {
    setUser(null);
  };

  const addProductToList = (newProd) => {
    setProducts([newProd, ...products]);
  };

  return (
    <BrowserRouter>
      {/* Full Screen Width Layout Container */}
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans antialiased text-gray-900 w-full">
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<Landing />} />

          {/* Login Page Route */}
          <Route path="/login" element={<Login onLoginSuccess={setUser} />} />

          <Route
            path="/artisan"
            element={
              user ? (
                <ArtisanHome user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/add-product"
            element={
              user ? (
                <AddProduct
                  user={user}
                  onLogout={handleLogout}
                  setDraftProduct={setDraftProduct}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/product-result"
            element={
              user ? (
                <ProductResult
                  user={user}
                  onLogout={handleLogout}
                  draftProduct={draftProduct}
                  setDraftProduct={setDraftProduct}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/pricing"
            element={
              user ? (
                <Pricing
                  user={user}
                  onLogout={handleLogout}
                  draftProduct={draftProduct}
                  addProductToList={addProductToList}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/products"
            element={
              user ? (
                <ProductsList
                  user={user}
                  onLogout={handleLogout}
                  products={products}
                  setDraftProduct={setDraftProduct}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/buyers"
            element={
              user ? (
                <Buyers user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/orders"
            element={
              user ? (
                <Orders user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/profile"
            element={
              user ? (
                <Profile user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/buyer"
            element={
              user ? (
                <BuyerHome user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
