import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Clock, MapPin, Sparkles } from 'lucide-react';

const FoodDelivery: React.FC = () => {

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* --- Hero Section --- */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579751626658-d548f38a56c2?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center text-white p-4"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              Restaurant Quality,
            </h1>
            <h2 className="text-5xl md:text-6xl font-extrabold text-orange-400">
              Delivered to Your Door
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
              Craving your favorite Fusion6 dish? Get it hot and fresh, right when you want it.
            </p>
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition-colors duration-300"
              >
                Browse Menu & Order Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* --- Why Choose Us Section --- */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">The Fusion6 Delivery Experience</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            We don't just deliver food; we deliver an experience. Enjoy the convenience of our service without compromising on quality or taste.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: 'Speedy & Reliable', description: 'Our dedicated delivery team ensures your order arrives hot and fresh, typically within 30-45 minutes.' },
              { icon: Sparkles, title: 'Chef-Prepared Quality', description: 'Every dish is prepared to order by our expert chefs, using only the freshest ingredients available.' },
              { icon: MapPin, title: 'Live Order Tracking', description: 'Follow your meal from our kitchen to your door with our real-time tracking system for complete peace of mind.' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg"
              >
                <div className="bg-orange-100 dark:bg-orange-900/50 p-4 rounded-full inline-block mb-4">
                  <feature.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* --- How It Works Section --- */}
        <section className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12">Order in 3 Easy Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                 {[{step: 1, title: "Browse the Menu", desc: "Explore our wide range of dishes and add your favorites to the cart."},
                 {step: 2, title: "Checkout Securely", desc: "Enter your delivery details and complete your payment through our secure gateway."},
                 {step: 3, title: "Track & Enjoy", desc: "Follow your order in real-time and get ready to enjoy a delicious meal at home."}].map((item, i) => (
                      <motion.div custom={i} variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} key={item.step} className="relative pl-12">
                         <div className="absolute left-0 top-1 flex items-center justify-center w-10 h-10 bg-orange-500 text-white font-bold rounded-full text-xl">{item.step}</div>
                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                         <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </motion.div>
                 ))}
            </div>
        </section>


        {/* --- Final CTA Section --- */}
        <section className="mt-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 shadow-lg text-center text-white">
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.2 }}
          >
            <UtensilsCrossed className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Hungry Now?</h2>
            <p className="text-lg text-orange-100 max-w-2xl mx-auto mb-8">
              Your next delicious meal is just a few clicks away. Browse our full menu and let us handle the cooking tonight.
            </p>
            <Link to="/menu">
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#f97316" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-3 bg-white text-orange-500 font-semibold rounded-lg shadow-md transition-colors duration-300"
                >
                    Start Your Order
                </motion.button>
            </Link>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default FoodDelivery;
