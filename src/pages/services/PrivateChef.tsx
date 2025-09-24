import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Star, Leaf, Calendar, CheckCircle } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';

// Define the type for our form data, now including the selected plan
type BookingInquiry = {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  guestCount: number;
  eventDate: string;
  message: string;
  selectedPlan: string; // New field to track the chosen package
};

const PrivateChef: React.FC = () => {
  // Add a ref for scrolling and state for the selected plan
  const formRef = useRef<HTMLElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<BookingInquiry>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data: BookingInquiry) => {
    const existingInquiries = JSON.parse(localStorage.getItem('privateChefInquiries') || '[]');
    const newInquiry = {
      id: Date.now(),
      ...data,
      submittedAt: new Date().toISOString()
    };
    const updatedInquiries = [...existingInquiries, newInquiry];
    localStorage.setItem('privateChefInquiries', JSON.stringify(updatedInquiries));
    console.log("Private Chef Inquiry Saved:", newInquiry);
    
    setIsSubmitted(true);
    reset();
    setSelectedPlan(''); // Reset selected plan after submission

    setTimeout(() => setIsSubmitted(false), 5000);
  };
  
  // --- NEW FUNCTION ---
  // Handles scrolling to the form and setting the selected plan
  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    setValue('selectedPlan', planName); // Set the value in the form
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  // --- END NEW FUNCTION ---

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
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621996346565-e326b20f545a?q=80&w=2069&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center text-white p-4"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              A Personal Culinary Journey
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
              Bring the fine dining experience home. Our private chefs create bespoke menus for your most memorable occasions.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* --- The Experience Section --- */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">The Ultimate In-Home Dining</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            Relax and enjoy the company of your guests while our professional chefs handle every detail, from sourcing the finest ingredients to leaving your kitchen spotless.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Star, title: 'Bespoke Menus', description: 'Every menu is crafted from scratch to match your tastes, dietary needs, and the theme of your event.' },
              { icon: Leaf, title: 'Premium Ingredients', description: 'We source only the freshest, highest-quality local and seasonal ingredients for a truly exceptional meal.' },
              { icon: ChefHat, title: 'Effortless Perfection', description: 'Our team takes care of shopping, cooking, serving, and cleaning, providing a seamless and luxurious experience.' },
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
                <div className="bg-yellow-100 dark:bg-yellow-900/50 p-4 rounded-full inline-block mb-4">
                  <feature.icon className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* --- Pricing Plans Section --- */}
        <section className="mt-24">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center">Our Private Chef Packages</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {/* Plan 1 */}
                <motion.div custom={0} variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col border dark:border-gray-700 rounded-xl shadow-lg p-8">
                    <h3 className="text-xl font-semibold text-orange-500 mb-2">Intimate Dinner</h3>
                    <p className="text-4xl font-bold text-gray-800 dark:text-white mb-4">$150 <span className="text-lg font-normal text-gray-500">/ person</span></p>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2"/>For 2 guests</li>
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2"/>Exquisite 3-course meal</li>
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2"/>Perfect for anniversaries</li>
                    </ul>
                    <button onClick={() => handlePlanSelect('Intimate Dinner')} className="w-full mt-auto py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Select Plan</button>
                </motion.div>
                {/* Plan 2 - Highlighted */}
                <motion.div custom={1} variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col border-2 border-orange-500 rounded-xl shadow-2xl p-8 relative">
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full">Most Popular</div>
                    <h3 className="text-xl font-semibold text-orange-500 mb-2">Celebration Package</h3>
                    <p className="text-4xl font-bold text-gray-800 dark:text-white mb-4">$120 <span className="text-lg font-normal text-gray-500">/ person</span></p>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2"/>For 4-10 guests</li>
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2"/>Gourmet 4-course meal</li>
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2"/>Includes appetizers</li>
                    </ul>
                    <button onClick={() => handlePlanSelect('Celebration Package')} className="w-full mt-auto py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">Select Plan</button>
                </motion.div>
                {/* Plan 3 */}
                <motion.div custom={2} variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col border dark:border-gray-700 rounded-xl shadow-lg p-8">
                     <h3 className="text-xl font-semibold text-orange-500 mb-2">Weekly Service</h3>
                    <p className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Custom <span className="text-lg font-normal text-gray-500">/ quote</span></p>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2"/>Personalized weekly meals</li>
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2"/>Healthy, convenient dining</li>
                        <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2"/>Meal prep solutions</li>
                    </ul>
                    <button onClick={() => handlePlanSelect('Weekly Service')} className="w-full mt-auto py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Contact Us</button>
                </motion.div>
            </div>
        </section>


        {/* --- Booking Form Section --- */}
        <section ref={formRef} className="mt-24 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-inner">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {selectedPlan ? `Book Your ${selectedPlan}` : 'Book a Consultation'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {selectedPlan ? 'Please provide your details below to proceed.' : 'Ready to create your perfect dining experience? Fill out the form below.'}
            </p>
          </div>
          
          {isSubmitted ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center bg-green-50 dark:bg-green-900/50 p-6 rounded-lg">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">Consultation Booked!</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">Thank you for your interest. Our team will contact you shortly to plan your event.</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Hidden input to store the selected plan */}
              <input type="hidden" {...register('selectedPlan')} value={selectedPlan} />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input {...register('name', { required: true })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="email" {...register('email', { required: true })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <input type="tel" {...register('phone', { required: true })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Guests</label>
                <input type="number" {...register('guestCount', { required: true, min: 1 })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
               <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Desired Date</label>
                <input type="date" {...register('eventDate', { required: true })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Occasion / Details</label>
                <textarea {...register('message')} rows={4} placeholder="e.g., Birthday party, special dietary requests..." className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"></textarea>
              </div>
              <div className="md:col-span-2 text-center">
                <button type="submit" className="px-12 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300">
                  Request Consultation
                </button>
              </div>
            </motion.form>
          )}
        </section>
      </div>
    </div>
  );
};

export default PrivateChef;

