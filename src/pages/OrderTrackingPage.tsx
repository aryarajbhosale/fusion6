import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- High-Quality Inline SVG Icons ---
const ReceiptIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const ChefHatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ScooterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16l-2-4h3l2 4" /></svg>;
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;

const orderStatuses = [
  { name: 'Order Placed', icon: <ReceiptIcon /> },
  { name: 'Preparing', icon: <ChefHatIcon /> },
  { name: 'Out for Delivery', icon: <ScooterIcon /> },
  { name: 'Delivered', icon: <HomeIcon /> },
];

interface OrderItem { id: number; name: string; quantity: number; price: number; }
interface OrderDetails { orderId: string; timestamp: string; items: OrderItem[]; total: number; }

const OrderTrackingPage = () => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const orderDataString = localStorage.getItem('latestOrder');
      if (orderDataString) {
        const data: OrderDetails = JSON.parse(orderDataString);
        setOrderDetails(data);
        const orderTime = new Date(data.timestamp);
        orderTime.setMinutes(orderTime.getMinutes() + 25); // Set ETA 25 mins from order time
        setEstimatedTime(orderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } else {
        setError('No recent order found.');
      }
    } catch (e) {
      console.error("Failed to parse order data", e);
      setError('Could not retrieve order details.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!orderDetails || currentStatusIndex >= orderStatuses.length - 1) return;
    const timer = setTimeout(() => setCurrentStatusIndex(prev => prev + 1), 6000); // Slower, more realistic 6s interval
    return () => clearTimeout(timer);
  }, [currentStatusIndex, orderDetails]);

  // --- UI Render Logic ---
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-slate-50"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div></div>;
  }

  if (error) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h2>
                <p className="text-slate-600 mb-6">{error}</p>
                <Link to="/menu" className="bg-orange-500 text-white font-bold py-2 px-6 rounded-md hover:bg-orange-600 transition duration-300 shadow-lg hover:shadow-orange-400/50">
                    Back to Menu
                </Link>
            </motion.div>
        </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-8 font-sans">
      <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } }}} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Status & Timeline */}
        <motion.div variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 }}} className="lg:col-span-2 bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <div className="border-b border-slate-200 pb-6 mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">Your order is confirmed!</h1>
            <p className="mt-2 text-slate-500">We've accepted your order and are getting it ready.</p>
          </div>

          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-xl font-bold text-slate-800">Live Tracking</h2>
            <div className="text-right">
                <p className="text-sm font-medium text-slate-500">Estimated Delivery</p>
                <p className="text-2xl font-bold text-orange-500">{estimatedTime}</p>
            </div>
          </div>

          <div className="relative">
            {/* Connecting Lines */}
            <div className="absolute left-6 top-6 h-full w-0.5 bg-slate-200" />
            
            {/* Timeline Items */}
            {orderStatuses.map((status, index) => (
                <div key={status.name} className="relative flex items-center mb-10">
                    <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full z-10 ring-8 ring-white transition-colors duration-500 ${index <= currentStatusIndex ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                        {status.icon}
                    </div>
                    <div className="ml-6">
                        <h4 className={`font-bold text-lg transition-colors duration-500 ${index <= currentStatusIndex ? 'text-slate-800' : 'text-slate-400'}`}>
                            {status.name}
                        </h4>
                    </div>
                </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Driver & Order Summary */}
        <motion.div variants={{ hidden: { x: 20, opacity: 0 }, visible: { x: 0, opacity: 1 }}} className="space-y-8">
            <div className="bg-white rounded-2xl shadow-2xl p-6">
                <h3 className="font-bold text-lg text-slate-800 mb-4">Your Rider</h3>
                <div className="flex items-center space-x-4">
                    <img src={`https://placehold.co/64x64/F97316/FFFFFF?text=R`} alt="Rider Rohan" className="h-16 w-16 rounded-full"/>
                    <div>
                        <p className="font-bold text-slate-700">Rohan</p>
                        <div className="flex items-center">
                            <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                            <span className="text-xs text-slate-500 ml-2">(4.9)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Order Summary</h3>
                <p className="text-sm text-slate-500 font-mono mb-4">{orderDetails?.orderId}</p>
                <ul className="divide-y divide-slate-200">
                    {orderDetails?.items.map(item => (
                        <li key={item.id} className="py-3 flex justify-between items-center text-sm">
                            <div>
                                <p className="font-semibold text-slate-700">{item.name}</p>
                                <p className="text-slate-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium text-slate-800">${(item.price * item.quantity).toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
                <div className="pt-4 mt-4 border-t-2 border-dashed flex justify-between items-center">
                    <p className="text-base font-bold text-slate-900">Total Paid</p>
                    <p className="text-lg font-bold text-orange-500">${orderDetails?.total.toFixed(2)}</p>
                </div>
            </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default OrderTrackingPage;

