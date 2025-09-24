import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface PaymentForm {
  fullName: string;
  email: string;
}

const Payment: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const cartContext = useCart();
  const authContext = useAuth();
  const navigate = useNavigate();

  if (!cartContext || !authContext) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const { items = [], total = 0, clearCart } = cartContext;
  const { state: authState } = authContext;

  const { register, handleSubmit } = useForm<PaymentForm>();

  // CORRECTED: This useEffect handles the redirection reliably after payment success.
  useEffect(() => {
    if (paymentSuccess) {
      const timer = setTimeout(() => {
        navigate('/track-order');
      }, 3000); // Wait 3 seconds after success

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [paymentSuccess, navigate]);


  useEffect(() => {
    // This effect redirects if the cart is empty. It's unchanged.
    if (items.length === 0 && !paymentSuccess) {
      navigate('/menu');
    }
  }, [items, navigate, paymentSuccess]);
  
  const onSubmit = async (data: PaymentForm) => {
    setIsProcessing(true);
    await new Promise(res => setTimeout(res, 2000));
    
    const orderId = `FUSION-${Date.now().toString().slice(-6)}`;
    const orderDetails = {
      orderId,
      timestamp: new Date().toISOString(),
      items: items, // <-- CORRECTED: Added items to save to local storage
      total: total,
    };
    localStorage.setItem('latestOrder', JSON.stringify(orderDetails));

    clearCart();
    setIsProcessing(false);
    setPaymentSuccess(true); // This will trigger the redirection useEffect
  };

  if (paymentSuccess) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-8 h-8 text-green-500" /></div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
                <p className="text-sm text-gray-500">Redirecting to track your order...</p>
            </motion.div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Checkout</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6 pb-4 border-b">
            <h2 className="text-xl font-semibold mb-2">Order Total</h2>
            <p className="text-3xl font-bold text-orange-500">${total.toFixed(2)}</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        {...register('fullName', { required: true })} 
                        defaultValue={authState.user?.name || ''} 
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" 
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        {...register('email', { required: true })} 
                        defaultValue={authState.user?.email || ''} 
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition" 
                      />
                  </div>
              </div>
              <button 
                type="submit" 
                disabled={isProcessing} 
                className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center disabled:bg-gray-400 transition-all duration-300 transform hover:scale-105"
              >
                  {isProcessing ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <Lock className="w-5 h-5 mr-2" />}
                  {isProcessing ? 'Processing...' : 'Complete Payment'}
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;

