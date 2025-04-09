import React from "react";
import { motion } from "framer-motion";
import justice from "../../assets/close-up-law-statue.jpg";
import safety from "../../assets/safety.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-gray-900 tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About <span className="text-blue-500">CivicEYE</span>
        </motion.h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto leading-relaxed">
          A public violence complaint platform dedicated to justice and transparency.
        </p>
      </div>

      <div className="mt-20 grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <motion.img
          src={justice}
          alt="Community Support"
          className="w-full rounded-3xl shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          className="bg-white bg-opacity-60 p-8 rounded-3xl shadow-md backdrop-blur-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900">Our Mission</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            CivicEye empowers citizens with a secure platform to report public violence.
            We believe in transparency, ensuring that every complaint is heard and acted
            upon efficiently.
          </p>
        </motion.div>
      </div>

      <div className="mt-20 grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <motion.div
          className="bg-white bg-opacity-60 p-8 rounded-3xl shadow-md backdrop-blur-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900">How It Works</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Submit complaints with evidence, track progress, and receive real-time updates.
            Authorities collaborate to ensure swift justice.
          </p>
        </motion.div>
        <motion.img
          src={safety}
          alt="Reporting Process"
          className="w-full rounded-3xl shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <div className="mt-20 text-center">
        <motion.h2
          className="text-3xl font-semibold text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Join Us in Making a Difference
        </motion.h2>
        <p className="text-gray-700 mt-4 max-w-2xl mx-auto leading-relaxed">
          By using CivicEye, you're contributing to a safer and more accountable society.
          Let's work together to eradicate violence and injustice.
        </p>
      </div>
    </div>
  );
};

export default About;
