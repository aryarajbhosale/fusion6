import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Wind } from 'lucide-react';

// Define the type for a post for better code quality and stability
type Post = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  author: string;
  authorImage: string;
  date: string;
  readTime: string;
};

const Insights: React.FC = () => {
  // More detailed and robust post data
  const allPosts: Post[] = [
    {
      title: "The Unstoppable Rise of Fusion Cuisine",
      description: "This month, Fusion Biryani and Spicy Ramen didn't just top the charts—they created a new standard for flavor. Discover why customers are raving about these bold combinations.",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop",
      tags: ['Top Seller', 'Fusion'],
      author: 'Chef Alex',
      authorImage: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop',
      date: 'Sep 15, 2025',
      readTime: '5 min read'
    },
    {
      title: "Healthy Eating in 2025: It's All About Plant Power",
      description: "We're seeing a massive shift towards wellness. Plant-based meals and vibrant protein bowls are more popular than ever. Here's what's driving the trend.",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop", 
      tags: ['Health', 'Trends'],
      author: 'Jane Doe',
      authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
      date: 'Sep 10, 2025',
      readTime: '7 min read'
    },
    {
      title: "This Week's Special: A Slice of Heaven",
      description: "Don't miss out on our new Paneer Tikka Pizza. It's the perfect fusion of smoky Indian spices and classic Italian comfort, and it's already a hit!",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
      tags: ['Special', 'New Arrival'],
      author: 'Chef Alex',
      authorImage: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop',
      date: 'Sep 22, 2025',
      readTime: '3 min read'
    },
     {
      title: "From Farm to Table: Our Commitment to Sustainability",
      description: "Learn about our partnerships with local farms and how we're reducing our carbon footprint, one delicious dish at a time.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop",
      tags: ['Sustainability', 'Community'],
      author: 'Maria Garcia',
      authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop',
      date: 'Sep 5, 2025',
      readTime: '6 min read'
    },
     {
      title: "The Tech in Our Kitchen: How AI Perfects Your Meal",
      description: "Step behind the scenes and see how we use cutting-edge technology to ensure every order is consistent, perfectly cooked, and delivered on time.",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2071&auto=format&fit=crop", // <-- CORRECTED IMAGE
      tags: ['Innovation', 'Technology'],
      author: 'Tom Chen',
      authorImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop',
      date: 'Aug 28, 2025',
      readTime: '8 min read'
    },
  ];

  const [filter, setFilter] = useState('All');
  const tags = ['All', 'Top Seller', 'Fusion', 'Health', 'Trends', 'Special', 'Sustainability', 'Innovation'];
  
  const filteredPosts = filter === 'All' ? allPosts : allPosts.filter(p => p.tags.includes(filter));

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* --- Hero Section --- */}
      <div className="relative h-96 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490818387583-1b48b909385a?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }} className="text-center text-white p-8">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Food for Thought</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
              The latest trends, stories, and culinary inspiration from the Fusion6 kitchen.
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* --- Tag Filter --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
            {tags.map(tag => (
                <button 
                    key={tag}
                    onClick={() => setFilter(tag)}
                    className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 ${filter === tag ? 'bg-orange-500 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                    {tag}
                </button>
            ))}
        </div>

        {/* --- Blog Grid --- */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, i) => (
                <motion.div
                  key={post.title}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group h-full flex flex-col hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 right-4 flex gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-black/50 text-white text-xs font-semibold rounded-full backdrop-blur-sm">{tag}</span>
                        ))}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex-grow">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{post.description}</p>
                    <div className="border-t dark:border-gray-700 pt-4 mt-auto flex items-center justify-between">
                        <div className="flex items-center">
                            <img src={post.authorImage} alt={post.author} className="w-8 h-8 rounded-full object-cover mr-3"/>
                            <div className="text-xs">
                                <p className="font-semibold text-gray-800 dark:text-gray-200">{post.author}</p>
                                <p className="text-gray-500 dark:text-gray-400">{post.date}</p>
                            </div>
                        </div>
                        <Link to="#" className="text-xs font-semibold text-orange-500 hover:text-orange-600 flex items-center">
                            Read <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-20"
                >
                    <Wind className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4"/>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">No Posts Found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Try selecting another category to see more insights!</p>
                </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* --- Newsletter CTA --- */}
        <section className="mt-24 bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-inner">
            <motion.div
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: 0.2 }}
                 className="max-w-3xl mx-auto text-center"
            >
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Stay Ahead of the Flavor Curve</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    Subscribe for weekly updates, special offers, and exclusive recipes from our chefs.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <input type="email" placeholder="Enter your email" className="w-full px-5 py-3 rounded-lg text-gray-800 border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"/>
                    <button type="submit" className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300">
                        Subscribe
                    </button>
                </form>
            </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Insights;

