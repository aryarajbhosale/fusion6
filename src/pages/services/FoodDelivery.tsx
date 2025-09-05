import React from "react";

const FoodDelivery: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-8">
      <h1 className="text-3xl font-bold mb-4 text-orange-500">Food Delivery</h1>
      <p className="mb-6">
        Enjoy quick and reliable food delivery from Fusion6 straight to your doorstep.
        Fresh, hot, and made with love.
      </p>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Wide Range of Cuisines</h2>
          <p>Order from a variety of dishes across different cuisines.</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Fast Delivery</h2>
          <p>Delivered hot and fresh within 30–45 minutes.</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Live Order Tracking</h2>
          <p>Track your order in real time with our smart tracking system.</p>
        </div>
      </section>
    </div>
  );
};

export default FoodDelivery;
