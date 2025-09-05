import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";

// ✅ Import your new service pages
import FoodDelivery from "./pages/services/FoodDelivery";
import Catering from "./pages/services/Catering";
import PrivateChef from "./pages/services/PrivateChef";
import CorporateMeals from "./pages/services/CorporateMeals";
import Services from "./pages/services/services.tsx"; // Capitalize filename for convention
import Insights from "./pages/Insights";
import AdminInsights from "./pages/admin/AdminInsights";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Header />
              <main className="flex-1">
                <Routes>
                  {/* Core pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<AdminDashboard />} />

                  {/* Insights pages */}
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/admin/insights" element={<AdminInsights />} />

                  {/* Services pages */}
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/food-delivery" element={<FoodDelivery />} />
                  <Route path="/services/catering" element={<Catering />} />
                  <Route path="/services/private-chef" element={<PrivateChef />} />
                  <Route path="/services/corporate-meals" element={<CorporateMeals />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
