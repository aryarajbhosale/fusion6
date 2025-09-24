import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const {
    items,
    total,
    itemCount,
    lastAddedItem,
    clearLastAddedItem,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  // Toast auto-hide
  useEffect(() => {
    if (lastAddedItem) {
      const timer = setTimeout(() => clearLastAddedItem(), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedItem, clearLastAddedItem]);

  // Handle ordering and redirect to payment
  const handleOrder = () => {
    if (items.length === 0) return;

    // Save current order in localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: Date.now(),
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));

    // THE FIX: clearCart() is removed from here.

    // Redirect to payment with orderId
    navigate('/payment', { state: { orderId: newOrder.id } });
  };

  return (
    <div className="relative max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {items.map(item => (
              <li key={item.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-orange-500">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <span className="text-lg font-semibold">Total ({itemCount} items):</span>
            <span className="text-xl font-bold text-orange-600">${total.toFixed(2)}</span>
          </div>

          <div className="mt-4 flex space-x-4">
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
            >
              Clear Cart
            </button>
            <button
              onClick={handleOrder}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
            >
              Order Now
            </button>
          </div>
        </>
      )}

      {/* Toast for last added item */}
      <AnimatePresence>
        {lastAddedItem && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            ✅ {lastAddedItem.name} added to cart
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;