// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import ProductProvider from './context/ProductContext';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import CreateProduct from './components/CreateProduct';


function App() {
  return (
    <ProductProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Cart />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route 
              path="/admin-panel" 
              element={
                <PrivateRoute>
                  <AdminPanel />
                </PrivateRoute>
              } 
            />
            <Route path="/create-product" element={<CreateProduct />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ProductProvider>
  );
}

export default App;
