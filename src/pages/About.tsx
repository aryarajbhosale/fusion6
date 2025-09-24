import React from 'react';
import { Users, Award, UtensilsCrossed, Heart, Leaf, BrainCircuit } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Main About Component ---
const About: React.FC = () => {
  const team = [
    { name: 'Sarah Johnson', role: 'Executive Chef', image: 'https://images.unsplash.com/photo-1581382575275-97901c2635b7?q=80&w=1974&auto=format&fit=crop', bio: 'With 15 years of culinary experience, Sarah brings fusion flavors to life.' },
    { name: 'Michael Chen', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop', bio: 'Michael ensures every order is prepared and delivered with perfection.' },
    { name: 'Elena Rodriguez', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1974&auto=format&fit=crop', bio: 'Elena creates our signature desserts that blend international influences.' },
    { name: 'David Kim', role: 'Customer Experience', image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop', bio: 'David ensures every customer has an exceptional dining experience.' }
  ];

  const timelineEvents = [
    { year: 2017, title: 'The Spark', description: 'Fusion6 was born in a small kitchen from a single idea: to blend six global culinary traditions into something new and exciting.' },
    { year: 2019, title: 'First Milestone', description: 'We opened our first physical location, quickly becoming a local favorite for our innovative dishes and vibrant atmosphere.' },
    { year: 2022, title: 'Going Digital', description: 'Launched our state-of-the-art delivery platform, bringing the Fusion6 experience to thousands of homes.' },
    { year: 2025, title: 'Future of Food', description: 'Today, we continue to push boundaries, focusing on sustainability and culinary technology to shape the future of food.' }
  ];

  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Award, label: 'Awards Won', value: '25+' },
    { icon: UtensilsCrossed, label: 'Unique Dishes', value: '500+' },
    { icon: Heart, label: '5-Star Reviews', value: '1,200+' }
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* --- Hero Section --- */}
      <section className="relative h-[60vh] bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="text-center text-white p-8">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">More Than Just a Meal.</h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-200">
              We're a passionate team of chefs, innovators, and food lovers dedicated to crafting unforgettable culinary experiences. This is our story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Stats Section (Rebuilt for Stability) --- */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className="text-center text-white"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-orange-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Interactive Story Timeline --- */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Our Journey</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">From a humble beginning to a culinary force.</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2" aria-hidden="true"></div>
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className={`mb-12 flex items-center w-full ${index % 2 === 0 ? 'flex-row-reverse justify-end' : 'justify-start'}`}
              >
                <div className="w-5/12">
                   <div className={`p-6 rounded-xl shadow-lg ${index % 2 === 0 ? 'text-right' : 'text-left'} bg-white dark:bg-gray-800`}>
                    <p className="text-lg font-bold text-orange-500">{event.year}</p>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mt-1 mb-2">{event.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{event.description}</p>
                  </div>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-6 h-6 rounded-full bg-orange-500 z-10 border-4 border-gray-50 dark:border-gray-900"></div>
                </div>
                 <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Mission & Values Section --- */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Our Core Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">These principles guide every dish we craft and every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Culinary Excellence', description: 'We source only the finest ingredients and hold every dish to the highest standards of quality and flavor.', icon: Award },
              { title: 'Sustainable Future', description: 'Our commitment to the environment drives us to use eco-friendly packaging and support local, sustainable farms.', icon: Leaf },
              { title: 'Bold Innovation', description: 'We continuously experiment with new flavors and techniques to bring you unique culinary experiences that excite the palate.', icon: BrainCircuit }
            ].map((value, index) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full mb-6">
                  <value.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-7">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Team Section --- */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Meet The Artisans</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">The passionate people behind every delicious meal and exceptional experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden text-center group">
                <div className="relative h-64">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-orange-300 font-medium">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-6">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Final CTA --- */}
       <section className="py-20 bg-white dark:bg-gray-800">
            <div className="max-w-4xl mx-auto text-center">
                 <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Ready to Taste the Fusion?</h2>
                 <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Explore our menu and discover your next favorite dish.
                 </p>
                 <Link to="/menu">
                    <motion.button whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(249, 115, 22, 0.3)" }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-orange-500 text-white font-bold rounded-lg shadow-lg hover:bg-orange-600 transition-colors duration-300">
                        View Full Menu
                    </motion.button>
                 </Link>
            </div>
       </section>
    </div>
  );
};

export default About;

