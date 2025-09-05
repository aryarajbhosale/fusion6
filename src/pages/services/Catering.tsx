import React from "react";

const Catering: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-8">
      <h1 className="text-3xl font-bold mb-4 text-orange-500">Catering</h1>
      <p className="mb-6">
        From birthdays to corporate events, Fusion6 offers customized catering packages
        to make your occasion unforgettable.
      </p>

      <section className="space-y-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Event Catering</h2>
          <p>Perfect menus for weddings, birthdays, and private gatherings.</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Corporate Packages</h2>
          <p>Custom menus for conferences, meetings, and company events.</p>
        </div>
      </section>
    </div>
  );
};

export default Catering;
