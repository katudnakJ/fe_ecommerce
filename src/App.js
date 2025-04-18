import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';  // ตรวจสอบการ import ตรงนี้
import ProductDetail from './pages/ProductDetail'; // เพิ่มการนำเข้า ProductDetail
import { GoogleOAuthProvider } from '@react-oauth/google'; // เพิ่ม GoogleOAuthProvider
import Allproduct from './pages/Allproduct';
import Auth from './pages/Auth';
import Store from './pages/Store';
import Cart from './pages/Cart';

// Protected Route component
// const ProtectedRoute = ({ children }) => {
//   const user = localStorage.getItem('user');
//   if (!user) {
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

function App() {
  return (
    <GoogleOAuthProvider clientId="618419592763-j24l6q083madahfa8rfg2orkv705fr0c.apps.googleusercontent.com">
      <Router>
        <Routes>
          {/* กิต */}
          <Route path="/" element={<Auth />} />
          <Route
            path="/store/:store_id"
            element={<Store />
              // <ProtectedRoute>
              //   <Store />
              // </ProtectedRoute>
            }
          />

          {/* แบม */}
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />

          {/* Man */}
          <Route path='/products/GetAllProducts' element={<Allproduct />} />

          {/* Mook */}
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Q */}
          <Route path="/cart/:cust_id" element={<Cart />} />

        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;