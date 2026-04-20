"use client";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

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
  const socials = [
    {
      name: "Facebook",
      username: "@HuyMeowMeow",
      icon: <FaFacebookF />,
      link: "https://www.facebook.com/HuyMeowMeow",
      style:
        "hover:text-blue-500 hover:border-blue-500 hover:bg-blue-500/10 hover:shadow-[0_0_25px_rgba(59,130,246,0.8)]",
    },
    {
      name: "LinkedIn",
      username: "Coming soon",
      icon: <FaLinkedinIn />,
      link: "#",
      style:
        "hover:text-sky-500 hover:border-sky-500 hover:bg-sky-500/10 hover:shadow-[0_0_25px_rgba(14,165,233,0.8)]",
    },
    {
      name: "X",
      username: "@kingzofd",
      icon: <FaTwitter />,
      link: "https://x.com/kingzofd",
      style:
        "hover:text-white hover:border-white hover:bg-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.8)]",
    },
    {
      name: "Instagram",
      username: "@huylovemeow",
      icon: <FaInstagram />,
      link: "https://www.instagram.com/huylovemeow/",
      style:
        "hover:text-pink-500 hover:border-pink-500 hover:bg-gradient-to-r hover:from-pink-500/20 hover:via-purple-500/20 hover:to-yellow-500/20 hover:shadow-[0_0_25px_rgba(236,72,153,0.8)]",
    },
  ];

  return (
    <motion.div
      className="w-1/2 flex flex-col justify-center px-20 z-10 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Glow */}
      <div className="absolute left-10 top-1/3 w-72 h-72 bg-blue-600 opacity-10 blur-[100px] rounded-full pointer-events-none" />

      {/* Greeting */}
      <motion.h1
        variants={itemVariants}
        className="text-2xl text-gray-300 font-medium mb-2 tracking-wide"
      >
        Hi there! 👋 Welcome to my profile
      </motion.h1>

      {/* Name */}
      <motion.h2
        variants={itemVariants}
        className="text-4xl xl:text-5xl font-semibold tracking-tight leading-tight mb-4 flex items-center gap-2"
      >
        I'm{" "}
        <span className="inline-block min-w-[260px] whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]">
          <TypeAnimation
            sequence={[
              "MaxBoy",
              2000,
              "a Software Engineer",
              2000,
              "a Mobile Developer",
              2000,
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
        with smooth UI and delightful user experiences.
      </motion.p>

      {/* Stats */}
      <motion.div variants={itemVariants} className="flex gap-8 mb-8 text-sm">
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

      {/* Buttons */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
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

      {/* SOCIAL */}
      <motion.div variants={itemVariants} className="flex gap-5 mt-16">
        {socials.map((item, index) => (
          <motion.a
            key={item.name}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className={`group relative ${
              item.link === "#" ? "pointer-events-none opacity-40" : ""
            }`}
          >
            {/* ICON */}
            <div
              className={`relative w-11 h-11 flex items-center justify-center rounded-xl
              border border-gray-700 text-gray-400
              backdrop-blur-md bg-white/5
              transition-all duration-300
              hover:scale-110 active:scale-95
              ${item.style}`}
            >
              <div className="transition-transform duration-300 group-hover:rotate-6">
                {item.icon}
              </div>

              {/* ripple */}
              <span className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 bg-white/20 animate-ping" />
            </div>

            {/* TOOLTIP */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <div className="px-3 py-1.5 rounded-md text-xs text-white bg-white/10 backdrop-blur-md border border-white/20 shadow-lg whitespace-nowrap text-center">
                <div className="font-medium">{item.name}</div>
                <div className="text-gray-400 text-[10px]">
                  {item.username}
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}