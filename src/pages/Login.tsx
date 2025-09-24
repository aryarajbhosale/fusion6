import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // --- SIGNUP LOGIC ---
      if (isSignup) {
        const result = await signup(name, email, password, true); // remember = true
        if (result.success) {
          setMessage("✅ Signup successful! Logging in...");
          // Auto-login after successful signup
          await login(email, password, true);
          setTimeout(() => navigate("/profile"), 800); // Redirect after a short delay
        } else {
          setMessage(`❌ ${result.error}`);
        }
      // --- LOGIN LOGIC ---
      } else {
        const result = await login(email, password, true);
        if (result.success) {
          setMessage("✅ Login successful! Redirecting...");
          setTimeout(() => navigate("/profile"), 800); // Redirect after a short delay
        } else {
          setMessage(`❌ ${result.error}`);
        }
      }
    } catch (err) {
      console.error("Login/Signup Error:", err);
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div
        key={isSignup ? 'signup' : 'login'} // Add key to re-trigger animation on toggle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">
            {isSignup ? "Create Your Account" : "Welcome Back"}
          </h2>
          <p className="text-red-100 text-sm">
            {isSignup ? "Join us to start your delicious journey!" : "Login to access your orders"}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {isSignup && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none dark:bg-gray-700 dark:text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </motion.div>
            )}
            <input
              type="email"
              placeholder="Email"
              className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none dark:bg-gray-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`text-white py-3 rounded-lg font-semibold transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            <span className="px-2 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          </div>

          <button
            disabled
            className="flex items-center justify-center w-full border rounded-lg py-3 font-medium text-gray-400 cursor-not-allowed dark:border-gray-600"
          >
            <FcGoogle className="mr-2 text-xl" />
            Continue with Google (Coming Soon)
          </button>

          {message && (
            <p className={`text-sm mt-4 text-center ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              className="text-orange-500 font-semibold hover:underline"
              onClick={() => {
                setIsSignup(!isSignup);
                setMessage("");
                setName("");
                setEmail("");
                setPassword("");
              }}
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;