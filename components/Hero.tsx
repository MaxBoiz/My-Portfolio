"use client";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Hero() {
  return (
    <motion.div
      className="w-1/2 flex flex-col justify-center px-20 z-10 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Glow */}
      <div className="absolute left-10 top-1/3 w-72 h-72 bg-blue-600 opacity-10 blur-[100px] rounded-full pointer-events-none" />

      {/* Badge */}
      <motion.div variants={itemVariants} className="mb-4">
        <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Available for work
        </span>
      </motion.div>

      {/* 🔥 FIX 1: Greeting TO HƠN */}
      <motion.h1
        variants={itemVariants}
        className="text-2xl text-gray-300 font-medium mb-2 tracking-wide"
      >
        Hi there! 👋 Welcome to my profile
      </motion.h1>

      {/* 🔥 FIX 2: I'm NHỎ LẠI + KHÔNG WRAP */}
      <motion.h2
        variants={itemVariants}
        className="text-4xl xl:text-5xl font-semibold tracking-tight leading-tight mb-4 flex items-center gap-2"
      >
        I'm{" "}
        <span
          className="inline-block min-w-[260px] whitespace-nowrap
                     text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400
                     drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]"
        >
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

      

      {/* Bio */}
      <motion.p
        variants={itemVariants}
        className="mb-8 text-gray-400 leading-relaxed max-w-md text-base"
      >
        Passionate about crafting modern{" "}
        <span className="text-white font-medium">
          web & mobile applications
        </span>{" "}
        with smooth UI and delightful user experiences
      </motion.p>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="flex gap-8 mb-8 text-sm"
      >
        {[
          { value: "1+", label: "Years Exp" },
          { value: "10+", label: "Projects" },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col">
            <span className="text-2xl font-bold text-white">{value}</span>
            <span className="text-gray-500 text-xs mt-0.5">{label}</span>
          </div>
        ))}
      </motion.div>

      {/* Buttons giữ nguyên */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap gap-3"
      >
        <button className="group relative px-6 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden">
          <span className="relative z-10">My Portfolio</span>
        </button>

        <button className="group relative px-6 py-2.5 rounded-xl font-medium text-sm text-white border border-gray-600 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden">
          <span className="relative z-10">Projects</span>
        </button>

        <button className="group relative px-6 py-2.5 rounded-xl font-medium text-sm text-white border border-gray-600 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden">
          <span className="relative z-10">Get My CV</span>
        </button>
      </motion.div>
    </motion.div>
  );
}