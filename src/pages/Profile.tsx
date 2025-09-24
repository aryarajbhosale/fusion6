import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiMail, FiPackage } from "react-icons/fi";

const Profile: React.FC = () => {
  // FIX #1: Get the 'state' object from the context first. The user is inside it.
  const { state, logout } = useAuth();
  const user = state.user;
  const navigate = useNavigate();

  // FIX #2: Add a loading state to gracefully wait for the context to update.
  const [isLoading, setIsLoading] = useState(true);

  // FIX #3: This useEffect now handles the redirect logic safely.
  // It waits for the context to be ready before deciding what to do.
  useEffect(() => {
    // If the check is done and there's still no user, then redirect.
    if (!user) {
      const timer = setTimeout(() => navigate("/login"), 100);
      return () => clearTimeout(timer);
    } else {
      // If we have a user, we can show the page.
      setIsLoading(false);
    }
  }, [user, navigate]);


  // While we're checking for the user, show a loading screen.
  // This prevents the redirect from happening too early.
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Once loading is false, we are guaranteed to have a user object.
  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      {/* Header (Your UI) */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Profile
        </h1>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
        >
          <FiLogOut /> Logout
        </button>
      </div>

      {/* User Details (Your UI) */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <FiUser /> Account Details
        </h2>
        <div className="space-y-3">
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <FiUser className="text-gray-500" />
            <span className="font-medium text-gray-900 dark:text-white">
              {user?.name}
            </span>
          </p>
          <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <FiMail className="text-gray-500" />
            <span>{user?.email}</span>
          </p>
        </div>
      </div>

      {/* Orders Section (Your UI - NOTE: We'll need to get orders from localStorage, not user object) */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <FiPackage /> My Orders
        </h2>
        {/* Placeholder for order logic, since orders are in localStorage, not the user object */}
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            Order history will be shown here. Click below to see your full order list.
        </p>
         <button
            onClick={() => navigate('/orders')}
            className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
            View All Orders
        </button>
      </div>
    </div>
  );
};

export default Profile;