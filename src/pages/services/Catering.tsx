import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Heart, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

// Define the type for our form data
type CateringInquiry = {
  name: string;
  email: string;
  eventType: string;
  guestCount: number;
  eventDate: string;
  message: string;
};

const Catering: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CateringInquiry>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data: CateringInquiry) => {
    // Get existing inquiries from localStorage, or create an empty array
    const existingInquiries = JSON.parse(localStorage.getItem('cateringInquiries') || '[]');
    
    // Add a unique ID and timestamp to the new inquiry
    const newInquiry = {
      id: Date.now(),
      ...data,
      submittedAt: new Date().toISOString()
    };

    // Add the new inquiry to the list
    const updatedInquiries = [...existingInquiries, newInquiry];

    // Save the updated list back to localStorage
    localStorage.setItem('cateringInquiries', JSON.stringify(updatedInquiries));

    console.log("Catering Inquiry Saved:", newInquiry);
    
    // Show the success message and reset the form
    setIsSubmitted(true);
    reset();

    // Hide the success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const serviceVariants = {
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
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="text-center text-white p-4"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              Unforgettable Events,
            </h1>
            <h2 className="text-5xl md:text-6xl font-extrabold text-orange-400">
              Exquisite Flavors
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
              From intimate gatherings to grand celebrations, Fusion6 brings a culinary experience that delights every guest.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* --- Our Services Section --- */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Catering for Every Occasion</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            We believe every event is unique. Our team works with you to craft a personalized menu that perfectly matches your vision and taste.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Briefcase, title: 'Corporate Events', description: 'Impress your clients and colleagues with professional, delicious catering for meetings, conferences, and office parties.' },
              { icon: Award, title: 'Private Parties', description: 'Birthdays, anniversaries, or family get-togethers. We handle the food so you can enjoy the celebration.' },
              { icon: Heart, title: 'Wedding Celebrations', description: 'Create the perfect dining experience for your special day with our elegant and customizable wedding packages.' },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                custom={i}
                variants={serviceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="bg-orange-100 dark:bg-orange-900/50 p-4 rounded-full inline-block mb-4">
                  <service.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- How It Works Section --- */}
        <section className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12">Our Simple 3-Step Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                 {[{step: 1, title: "Inquire & Plan", desc: "Fill out our form with your event details. Our planners will contact you to discuss your vision."},
                 {step: 2, title: "Customize Your Menu", desc: "Work with our chefs to craft the perfect menu that suits your taste, dietary needs, and budget."},
                 {step: 3, title: "Celebrate & Enjoy", desc: "Relax and be a guest at your own event! Our professional team will handle everything from setup to cleanup."}].map((item, i) => (
                      <motion.div custom={i} variants={serviceVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} key={item.step} className="relative pl-12">
                         <div className="absolute left-0 top-1 flex items-center justify-center w-10 h-10 bg-orange-500 text-white font-bold rounded-full text-xl">{item.step}</div>
                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                         <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </motion.div>
                 ))}
            </div>
        </section>


        {/* --- Contact Form Section --- */}
        <section className="mt-24 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-inner">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Let's Plan Your Event</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Get a personalized quote for your next event. Fill out the form below, and our catering specialist will be in touch!
            </p>
          </div>
          
          {isSubmitted ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center bg-green-50 dark:bg-green-900/50 p-6 rounded-lg">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">Thank You!</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">Your inquiry has been sent successfully. We will get back to you shortly.</p>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input {...register('name', { required: true })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input type="email" {...register('email', { required: true })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Type</label>
                <select {...register('eventType', { required: true })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none">
                  <option>Corporate</option>
                  <option>Private Party</option>
                  <option>Wedding</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Guests</label>
                <input type="number" {...register('guestCount', { required: true, min: 1 })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Date</label>
                <input type="date" {...register('eventDate', { required: true })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Details</label>
                <textarea {...register('message')} rows={4} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"></textarea>
              </div>
              <div className="md:col-span-2 text-center">
                <button type="submit" className="px-12 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300">
                  Get a Quote
                </button>
              </div>
            </motion.form>
          )}
        </section>
      </div>
    </div>
  );
};

export default Catering;

