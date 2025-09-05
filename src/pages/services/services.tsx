import React from "react";
import { Link } from "react-router-dom";
import { Utensils, Truck, Users, Briefcase } from "lucide-react";

const Services: React.FC = () => {
  const services = [
    {
      title: "Food Delivery",
      description: "Delicious meals delivered to your doorstep, hot and fresh.",
      icon: <Truck className="w-10 h-10 text-orange-500" />,
      link: "/services/food-delivery",
    },
    {
      title: "Catering",
      description: "Professional catering services for events, parties, and gatherings.",
      icon: <Utensils className="w-10 h-10 text-orange-500" />,
      link: "/services/catering",
    },
    {
      title: "Private Chef",
      description: "Hire a private chef to create personalized dining experiences at home.",
      icon: <Users className="w-10 h-10 text-orange-500" />,
      link: "/services/private-chef",
    },
    {
      title: "Corporate Meals",
      description: "Healthy and tasty meal solutions for your office and employees.",
      icon: <Briefcase className="w-10 h-10 text-orange-500" />,
      link: "/services/corporate-meals",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 lg:px-20">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-10 text-center">
        Our Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <Link
            key={service.title}
            to={service.link}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transform transition duration-300 flex flex-col items-center text-center"
          >
            <div className="mb-4">{service.icon}</div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {service.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {service.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
