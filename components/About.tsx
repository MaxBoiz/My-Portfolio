"use client";

import { motion } from "framer-motion";

const principles = [
  ["01", "Clarity first", "The best interface explains itself before a tutorial ever has to.", "Principle verified"],
  ["02", "Motion with meaning", "Animation should guide attention, reveal hierarchy, or reward an action.", "Motion calibrated"],
  ["03", "Build, measure, refine", "Good products emerge through small decisions, honest feedback, and iteration.", "Iteration active"],
];

export default function About() {
  return (
    <section id="about" className="section-shell grid scroll-mt-16 gap-16 py-28 sm:py-36 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
      <div>
        <div className="section-kicker"><span>02</span>Behind the build</div>
        <h2 className="section-title mt-8">Good software should feel human</h2>
        <p className="mt-8 max-w-xl text-base leading-8 text-slate-400">
          My favorite work lives where engineering discipline meets visual curiosity. I enjoy turning ambiguous ideas into calm, useful experiences and learning whatever the next build demands.
        </p>

        <div className="terminal-card mt-10 font-mono text-sm">
          <div className="mb-5 flex gap-2"><span /><span /><span /></div>
          <p><b>&gt;</b> huy.location</p>
          <p className="terminal-answer">Vietnam / GMT+7</p>
          <p className="mt-4"><b>&gt;</b> huy.focus</p>
          <p className="terminal-answer">web · mobile · thoughtful interactions</p>
          <p className="mt-4"><b>&gt;</b> huy.status</p>
          <p className="terminal-answer text-emerald-300">available_for_opportunities<span className="terminal-cursor">_</span></p>
        </div>
      </div>

      <div className="divide-y divide-white/[0.14]">
        {principles.map(([number, title, copy, status], index) => (
          <motion.div
            key={number}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.1 }}
            className="principle-card grid gap-5 py-9 sm:grid-cols-[48px_1fr]"
            tabIndex={0}
          >
            <span className="principle-scanline" aria-hidden="true" />
            <span className="principle-number font-mono text-xs text-indigo-300">{number}</span>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 max-w-lg text-sm leading-7 text-slate-400">{copy}</p>
              <span className="principle-status" aria-hidden="true"><i />{status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
