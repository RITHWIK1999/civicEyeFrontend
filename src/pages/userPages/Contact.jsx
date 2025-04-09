import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-gray-900 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact <span className="text-blue-600">Softronics</span>
        </motion.h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto leading-relaxed">
          Have questions or need support? Reach out to us anytime.
        </p>
      </div>

      <div className="mt-16 max-w-4xl mx-auto bg-white bg-opacity-60 p-8 rounded-3xl shadow-md backdrop-blur-lg text-center">
        <motion.h2
          className="text-3xl font-semibold text-gray-900"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get in Touch
        </motion.h2>

        <div className="mt-6 text-lg text-gray-800 space-y-4">
          <p>
            📍 <span className="font-semibold">Address:</span> 123 Innovation Street, Tech City, India - 560001
          </p>
          <p>
            📞 <span className="font-semibold">Contact:</span> (+91) 789 456 123 0
          </p>
          <p>
            📧 <span className="font-semibold">Email:</span> <a href="mailto:Softoniics@gmail.com" className="text-blue-600 hover:underline">Softoniics@gmail.com</a>
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <motion.h2
          className="text-3xl font-semibold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          We're Here to Help
        </motion.h2>
        <p className="text-gray-700 mt-4 max-w-2xl mx-auto leading-relaxed">
          Whether you need support or just want to say hello, we’d love to hear from you. 
          Reach out and let’s connect.
        </p>
      </div>
    </div>
  );
};

export default Contact;
