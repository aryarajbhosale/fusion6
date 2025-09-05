import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const salesData = [
  { day: "Mon", sales: 200 },
  { day: "Tue", sales: 400 },
  { day: "Wed", sales: 300 },
  { day: "Thu", sales: 500 },
  { day: "Fri", sales: 700 },
  { day: "Sat", sales: 1000 },
  { day: "Sun", sales: 800 },
];

const dishData = [
  { dish: "Fusion Biryani", orders: 120 },
  { dish: "Spicy Ramen", orders: 90 },
  { dish: "Paneer Tikka Pizza", orders: 70 },
  { dish: "Veggie Bowl", orders: 50 },
];

const AdminInsights: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 lg:px-20">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 text-center">
        Admin Insights Dashboard
      </h1>

      {/* Sales Trend */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          Weekly Sales Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Dishes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
          Top Ordered Dishes
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dishData}>
            <XAxis dataKey="dish" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminInsights;
