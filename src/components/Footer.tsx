import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F6</span>
              </div>
              <span className="text-xl font-bold">Fusion6 Food</span>
            </div>
            <p className="text-gray-400 text-sm leading-6">
              Delicious fusion cuisine delivered fresh to your doorstep.
              Experience the perfect blend of flavors from around the world.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white-800 dark:text-white">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/services/food-delivery"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Food Delivery
                </a>
              </li>
              <li>
                <a
                  href="/services/catering"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Catering
                </a>
              </li>
              <li>
                <a
                  href="/services/private-chef"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Private Chef
                </a>
              </li>
              <li>
                <a
                  href="/services/corporate-meals"
                  className="text-gray-400 hover:text-orange-500 transition"
                >
                  Corporate Meals
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/services"
                  className="text-gray-400 hover:text-orange-500"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/insights"
                  className="text-gray-400 hover:text-orange-500"
                >
                  Insights
                </a>
              </li>
              
             
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="text-gray-400 text-sm">
                  info@fusion6food.com
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Fusion Street
                  <br />
                  Food District, FD 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Fusion6 Food. All rights reserved. | Made with ❤️ for food
            lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
