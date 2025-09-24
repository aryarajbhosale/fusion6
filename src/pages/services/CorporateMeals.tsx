import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Zap, Leaf, UtensilsCrossed, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

// Define the type for our form data
type CorporateInquiry = {
  companyName: string;
  contactPerson: string;
  email: string;
  teamSize: number;
  frequency: string;
  message: string;
};

const CorporateMeals: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CorporateInquiry>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = (data: CorporateInquiry) => {
    // Get existing inquiries from localStorage, or create an empty array
    const existingInquiries = JSON.parse(localStorage.getItem('corporateInquiries') || '[]');
    
    // Add a unique ID and timestamp to the new inquiry
    const newInquiry = {
      id: Date.now(),
      ...data,
      submittedAt: new Date().toISOString()
    };

    // Add the new inquiry to the list
    const updatedInquiries = [...existingInquiries, newInquiry];

    // Save the updated list back to localStorage
    localStorage.setItem('corporateInquiries', JSON.stringify(updatedInquiries));

    console.log("Corporate Inquiry Saved:", newInquiry);
    
    // Show the success message and reset the form
    setIsSubmitted(true);
    reset();

    // Hide the success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

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
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504754524776-8f4f37790774?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center text-white p-4"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              Fuel Your Team's Success
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
              Healthy, delicious, and convenient meal plans designed for the modern workplace.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* --- Why Choose Us Section --- */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Elevate Your Office Lunch</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            Boost productivity and morale with our chef-crafted corporate meal solutions. We focus on fresh ingredients and diverse menus to keep your team happy and energized.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Boost Productivity', description: 'Well-fed employees are happy and more focused. Skip the long lunch lines and enjoy more quality work time.' },
              { icon: Leaf, title: 'Healthy & Delicious', description: 'Our menus are packed with nutritious ingredients to provide sustained energy throughout the workday.' },
              { icon: UtensilsCrossed, title: 'Variety & Customization', description: 'From daily lunches to special event catering, we offer flexible plans to fit your company\'s unique needs.' },
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
                <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full inline-block mb-4">
                  <feature.icon className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* --- How It Works Section --- */}
        <section className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-12">Getting Started is Easy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                 {[{step: 1, title: "Request a Consultation", desc: "Fill out the form below with your company's details. Our corporate account manager will reach out."},
                 {step: 2, title: "Design Your Plan", desc: "We'll work with you to create a meal schedule and menu that fits your team's preferences and dietary needs."},
                 {step: 3, title: "Enjoy Seamless Delivery", desc: "Receive timely, individually packaged meals right at your office. It's that simple."}].map((item, i) => (
                      <motion.div custom={i} variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} key={item.step} className="relative pl-12">
                         <div className="absolute left-0 top-1 flex items-center justify-center w-10 h-10 bg-blue-500 text-white font-bold rounded-full text-xl">{item.step}</div>
                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                         <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </motion.div>
                 ))}
            </div>
        </section>


        {/* --- Contact Form Section --- */}
        <section className="mt-24 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-inner">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Get a Custom Quote</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Tell us a bit about your company's needs, and we'll create a tailored meal plan solution for you.
            </p>
          </div>
          
          {isSubmitted ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center bg-green-50 dark:bg-green-900/50 p-6 rounded-lg">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">Thank You!</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">Your quote request has been sent. Our team will contact you within one business day.</p>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                <input {...register('companyName', { required: true })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Person</label>
                <input {...register('contactPerson', { required: true })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Work Email</label>
                <input type="email" {...register('email', { required: true })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Team Size (Approx.)</label>
                <input type="number" {...register('teamSize', { required: true, min: 1 })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Frequency</label>
                <select {...register('frequency', { required: true })} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Daily</option>
                  <option>3 Times a Week</option>
                  <option>Weekly</option>
                  <option>Special Events Only</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Any Questions or Details?</label>
                <textarea {...register('message')} rows={4} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
              </div>
              <div className="md:col-span-2 text-center">
                <button type="submit" className="px-12 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Request a Quote
                </button>
              </div>
            </motion.form>
          )}
        </section>
      </div>
    </div>
  );
};

export default CorporateMeals;
