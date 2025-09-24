import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Moon, Sun, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const cartContext = useCart();
  const authContext = useAuth();
  const themeContext = useTheme();

  const user = authContext?.state?.user;
  const logout = authContext?.logout;
  
  const itemCount = cartContext?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const { state: themeState, dispatch: themeDispatch } = themeContext || {};
  const isDark = themeState?.isDark || false;

  const handleLogout = () => {
    if (logout) {
      logout();
    }
    setIsMenuOpen(false);
  };

  // --- ADMIN PASSKEY LOGIC ---
  const handleAdminAccess = () => {
    const passkey = prompt("Please enter the admin passkey:");
    const ADMIN_PASSKEY = "admin123"; // You can change this

    if (passkey === ADMIN_PASSKEY) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else if (passkey) {
      alert("Incorrect passkey.");
    }
  };
  // --- END OF NEW LOGIC ---

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Services', path: '/services' },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-10 h-10 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">F6</span>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">Fusion6</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors duration-200 hover:text-orange-500 ${
                  location.pathname === item.path
                    ? 'text-orange-500'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* --- ADMIN ACCESS BUTTON ADDED HERE --- */}
            <button onClick={handleAdminAccess} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Admin Access">
              <Shield className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            {/* --- END OF NEW BUTTON --- */}

            <button
              onClick={() => themeDispatch && themeDispatch({ type: 'TOGGLE_THEME' })}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>

            <Link
              to="/cart"
              className="relative p-2 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-200 dark:bg-gray-700 dark:text-orange-400 dark:hover:bg-gray-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <Link
                  to="/profile"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <span className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 font-semibold border-b dark:border-gray-700">
                    Hi, {user.name.split(' ')[0]}
                  </span>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">Login</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative p-2 mr-2"><ShoppingCart className="w-6 h-6 dark:text-white" />{itemCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{itemCount}</span>}</Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md dark:text-white"><AnimatePresence mode="wait">{isMenuOpen ? <motion.div key="close"><X className="w-6 h-6" /></motion.div> : <motion.div key="open"><Menu className="w-6 h-6" /></motion.div>}</AnimatePresence></button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <Link key={item.name} to={item.path} onClick={() => setIsMenuOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium dark:text-gray-300 ${location.pathname === item.path ? 'text-orange-500 bg-orange-50 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 flex items-center justify-between px-3">
                  {user ? (
                    <>
                      <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-base font-medium dark:text-gray-300">Profile</Link>
                      <button onClick={handleLogout} className="px-4 py-2 text-base font-medium text-red-500">Logout</button>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center px-4 py-2 bg-orange-500 text-white rounded-lg">Login</Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
