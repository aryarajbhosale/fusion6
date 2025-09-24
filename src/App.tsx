import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Menu from './pages/Menu';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Insights from './pages/Insights';
import Payment from './pages/Payment';
import OrderTrackingPage from './pages/OrderTrackingPage'; // <-- IMPORT THE NEW PAGE HERE

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminInsights from './pages/admin/AdminInsights';

// Service Pages
import Catering from './pages/services/Catering';
import CorporateMeals from './pages/services/CorporateMeals';
import FoodDelivery from './pages/services/FoodDelivery';
import PrivateChef from './pages/services/PrivateChef';
import Services from './pages/services/services';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow px-4 py-6">
                <Routes>
                  {/* General Pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/track-order" element={<OrderTrackingPage />} /> {/* <-- ADD THE NEW ROUTE HERE */}

                  {/* Auth */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={<Profile />} />

                  {/* Insights */}
                  <Route path="/insights" element={<Insights />} />

                  {/* Admin */}
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/insights" element={<AdminInsights />} />

                  {/* Services */}
                  <Route path="/services/catering" element={<Catering />} />
                  <Route path="/services/corporate-meals" element={<CorporateMeals />} />
                  <Route path="/services/food-delivery" element={<FoodDelivery />} />
                  <Route path="/services/private-chef" element={<PrivateChef />} />
                  <Route path="/services" element={<Services />} />

                  {/* Redirect unknown routes to home */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

