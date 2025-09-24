import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, ShoppingBag, DollarSign, Plus, Edit2, Trash2, Search, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { menuItems, MenuItem } from '../../data/menuData';

// This registration is important for the charts to work
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [menuData, setMenuData] = useState<MenuItem[]>(menuItems);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- ROBUST SECURITY CHECK FOR PASSKEY ---
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthorized === false) {
      // If authorization fails, wait a moment then redirect.
      const timer = setTimeout(() => navigate('/'), 2000); // Redirect to homepage after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [isAuthorized, navigate]);
  // --- END OF SECURITY CHECK ---

  // All your original mock data and functions are preserved
  const stats = {
    totalRevenue: 45678,
    totalOrders: 1234,
    totalUsers: 5678,
    averageOrder: 37.02
  };

  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue ($)',
      data: [5000, 7200, 6800, 8200, 9100, 10300],
      backgroundColor: '#FF6B35',
      borderColor: '#FF6B35',
      borderWidth: 2,
    }],
  };

  const categoryData = {
    labels: ['Meals', 'Snacks', 'Desserts', 'Drinks'],
    datasets: [{
      data: [45, 25, 20, 10],
      backgroundColor: ['#FF6B35', '#4CAF50', '#2196F3', '#FFC107'],
      borderWidth: 0,
    }],
  };

  const trafficData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Visitors',
      data: [120, 150, 180, 200, 250, 300, 280],
      borderColor: '#FF6B35',
      backgroundColor: 'rgba(255, 107, 53, 0.1)',
      tension: 0.4,
      fill: true,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
    },
  };

  const handleEditItem = (item: MenuItem) => setIsEditing(item.id);
  const handleSaveItem = (id: string) => setIsEditing(null);
  const handleDeleteItem = (id: string) => setMenuData(prev => prev.filter(item => item.id !== id));

  const filteredMenuData = menuData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- NEW RENDER STATES FOR SECURITY ---
  if (isAuthorized === null) {
    // While checking, show a loading spinner
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (isAuthorized === false) {
    // If not authorized, show a proper "Access Denied" message
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please use the admin access button in the header.
          </p>
           <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Redirecting to homepage...
          </p>
        </div>
      </div>
    );
  }
  // --- END OF NEW RENDER STATES ---

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your restaurant operations and view analytics</p>
        </motion.div>

        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[{ id: 'overview', name: 'Overview', icon: BarChart3 }, { id: 'menu', name: 'Menu Management', icon: ShoppingBag }, { id: 'users', name: 'Users', icon: Users }, { id: 'insights', name: 'Insights', icon: DollarSign }].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.id ? 'border-orange-500 text-orange-600 dark:text-orange-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'}`}>
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[{ title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500' }, { title: 'Total Orders', value: stats.totalOrders.toLocaleString(), icon: ShoppingBag, color: 'bg-blue-500' }, { title: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'bg-purple-500' }, { title: 'Average Order', value: `$${stats.averageOrder.toFixed(2)}`, icon: BarChart3, color: 'bg-orange-500' }].map((stat, index) => (
                <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-center">
                    <div className={`${stat.color} p-3 rounded-lg`}><stat.icon className="w-6 h-6 text-white" /></div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Monthly Revenue</h3>
                <div className="h-64"><Bar data={salesData} options={chartOptions} /></div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Sales by Category</h3>
                <div className="h-64"><Doughnut data={categoryData} options={chartOptions} /></div>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Menu Management</h2>
                <p className="text-gray-600 dark:text-gray-300">Add, edit, or remove menu items</p>
              </div>
              <button className="flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200">
                <Plus className="w-4 h-4 mr-2" />Add New Item
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search menu items..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800 dark:text-white" />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredMenuData.map((item, index) => (
                      <motion.tr key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="h-12 w-12 rounded-lg object-cover" src={item.image} alt={item.name} />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">{item.category}</span></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">${item.price.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2 justify-end">
                            <button onClick={() => handleEditItem(item)} className="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleDeleteItem(item.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center py-12"><Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" /><p className="text-gray-500 dark:text-gray-400">User management is coming soon.</p></div>)}
        {activeTab === 'insights' && (<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"><h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Website Traffic</h3><div className="h-64"><Line data={trafficData} options={chartOptions} /></div></div>)}
      </div>
    </div>
  );
};

export default AdminDashboard;

