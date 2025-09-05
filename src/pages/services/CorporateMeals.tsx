import React from "react";

const CorporateMeals: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-8">
      <h1 className="text-3xl font-bold mb-4 text-orange-500">Corporate Meals</h1>
      <p className="mb-6">
        Keep your team energized with Fusion6’s healthy and delicious corporate
        meal plans.
      </p>

      <section className="space-y-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Daily Office Lunch</h2>
          <p>Nutritious and tasty meals delivered every day.</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Custom Meal Plans</h2>
          <p>Flexible plans designed according to company needs.</p>
        </div>
      </section>
    </div>
  );
};

export default CorporateMeals;
