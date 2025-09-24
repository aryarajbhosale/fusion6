import React from 'react';
import { Star, Plus, Leaf, Flame } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex space-x-1">
          {item.isVegetarian && (
            <div className="bg-green-500 p-1 rounded-full">
              <Leaf className="w-3 h-3 text-white" />
            </div>
          )}
          {item.isSpicy && (
            <div className="bg-red-500 p-1 rounded-full">
              <Flame className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors duration-200">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-orange-500">${item.price.toFixed(2)}</span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {item.rating} ({item.reviews})
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-1 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
