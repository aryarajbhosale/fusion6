import React from "react";

const PrivateChef: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-8">
      <h1 className="text-3xl font-bold mb-4 text-orange-500">Private Chef</h1>
      <p className="mb-6">
        Experience gourmet dining in the comfort of your home with our professional
        private chefs.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Custom Menus</h2>
          <p>Our chefs curate a menu tailored to your taste and preferences.</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Fine Dining Experience</h2>
          <p>Enjoy a restaurant-quality meal right at your dining table.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivateChef;
