import React from "react";
import { TrendingUp, Star, Utensils } from "lucide-react";

const Insights: React.FC = () => {
  const posts = [
    {
      title: "Top 5 Most Ordered Dishes This Month",
      description:
        "Fusion Biryani and Spicy Ramen topped the charts this month. Customers loved the spicy and fusion flavors!",
      icon: <Star className="w-8 h-8 text-orange-500" />,
    },
    {
      title: "Healthy Eating Trends in 2025",
      description:
        "Plant-based meals and protein bowls are becoming increasingly popular among our customers.",
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
    },
    {
      title: "Chef’s Special of the Week",
      description:
        "Try out our new Paneer Tikka Pizza – a perfect fusion of Indian and Italian flavors.",
      icon: <Utensils className="w-8 h-8 text-red-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 lg:px-20">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 text-center">
        Food Insights
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <div className="mb-4">{post.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {post.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
