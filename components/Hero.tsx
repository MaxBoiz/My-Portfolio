"use client";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="w-1/2 flex flex-col justify-center px-20 z-10">
      
      <motion.h1 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl mb-4 font-bold"
      >
        Hi! 👋 Welcome to my profile
      </motion.h1>

      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-5xl mb-6"
      >
        I'm {" "}
        <span className="text-blue-400">
          <TypeAnimation
            sequence={[
                "MaxBoy", 2000,
                "a Software Engineer", 2000,
                "a Mobile Developer", 2000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </span>
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mb-6 text-gray-400"
      >
        I'm in love with programming and JS Framework
      </motion.p>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex gap-4"
      >
        <button className="bg-white text-black px-5 py-2 rounded-lg hover:scale-105 transition">
          My Portfolio
        </button>

        <button className="border px-5 py-2 rounded-lg hover:bg-white hover:text-black transition">
          Projects
        </button>

        <button className="border px-5 py-2 rounded-lg hover:bg-white hover:text-black transition">
          Get My CV
        </button>
      </motion.div>

    </div>
  );
}