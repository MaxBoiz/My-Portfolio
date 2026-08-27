"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { FaArrowDown, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
} satisfies Variants;

export default function Hero() {
  return (
    <section className="relative z-10 flex w-full flex-col justify-center lg:w-[54%]">
      <motion.div custom={0} variants={reveal} initial="hidden" animate="visible" className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        Available for opportunities
      </motion.div>

      <motion.p custom={0.08} variants={reveal} initial="hidden" animate="visible" className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-indigo-300">
        Software engineer · Vietnam / GMT+7
      </motion.p>

      <motion.h1 custom={0.16} variants={reveal} initial="hidden" animate="visible" className="section-title max-w-4xl">
        Building digital
        <span className="block bg-gradient-to-r from-indigo-300 via-white to-cyan-300 bg-clip-text text-transparent">products that feel alive</span>
      </motion.h1>

      <motion.div custom={0.22} variants={reveal} initial="hidden" animate="visible" className="mt-6 flex flex-wrap items-center gap-x-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
        <span>I&apos;m</span>
        <span className="min-w-[270px] bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent sm:min-w-[330px]">
          <TypeAnimation
            sequence={["MaxBoy", 2000, "a Software Engineer", 2000, "a Mobile Developer", 2000]}
            speed={50}
            repeat={Infinity}
          />
        </span>
      </motion.div>

      <motion.p custom={0.28} variants={reveal} initial="hidden" animate="visible" className="mt-4 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
        I craft thoughtful web and mobile experiences, from the first sketch to the final interaction.
      </motion.p>

      <motion.div custom={0.32} variants={reveal} initial="hidden" animate="visible" className="mt-9 flex flex-wrap items-center gap-3">
        <a href="#work" className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-indigo-200">
          Explore my work
          <FaArrowDown className="text-xs transition-transform group-hover:translate-y-1" />
        </a>
        <a href="https://github.com/MaxBoiz" target="_blank" rel="noreferrer" aria-label="View MaxBoy's GitHub profile" className="social-button"><FaGithub /></a>
        <a href="#contact" aria-label="Go to contact section" className="social-button"><FaLinkedinIn /></a>
      </motion.div>

      <motion.div custom={0.44} variants={reveal} initial="hidden" animate="visible" className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
        {[["01+", "Years building"], ["10+", "Projects shipped"], ["∞", "Curiosity"]].map(([value, label]) => (
          <div key={label}>
            <div className="font-mono text-lg font-bold text-white">{value}</div>
            <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
