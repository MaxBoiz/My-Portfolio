"use client";

import { motion } from "framer-motion";
import { FaArrowRight, FaCode, FaLayerGroup, FaMobileAlt } from "react-icons/fa";

const capabilities = [
  {
    number: "01",
    label: "Mobile engineering",
    title: "Products designed to travel",
    copy: "Cross-platform mobile experiences shaped around clear flows, responsive feedback, and the details people notice every day.",
    tags: ["React Native", "Flutter", "Product thinking"],
    icon: FaMobileAlt,
    accent: "from-indigo-500/25 to-cyan-400/5",
  },
  {
    number: "02",
    label: "Web experiences",
    title: "Interfaces with a pulse",
    copy: "Expressive web products where motion has a purpose, performance stays visible, and every screen earns its place.",
    tags: ["Next.js", "TypeScript", "Motion"],
    icon: FaLayerGroup,
    accent: "from-fuchsia-500/20 to-indigo-400/5",
  },
  {
    number: "03",
    label: "Systems & experiments",
    title: "Curiosity, made useful",
    copy: "APIs, prototypes, and small technical experiments that turn unfamiliar ideas into things you can actually use.",
    tags: ["Node.js", "APIs", "Prototyping"],
    icon: FaCode,
    accent: "from-cyan-500/20 to-emerald-400/5",
  },
];

export default function WorkShowcase() {
  return (
    <section id="work" className="section-shell relative py-28 sm:py-36">
      <div className="section-kicker">
        <span>01</span>
        Selected capabilities
      </div>
      <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <h2 className="section-title max-w-3xl">The work is the proof</h2>
        <p className="max-w-md text-sm leading-7 text-slate-400 sm:text-base">
          I care about the complete path from an early idea to the moment a product feels natural in someone&apos;s hands.
        </p>
      </div>

      <div className="mt-16 grid gap-5 lg:grid-cols-3">
        {capabilities.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.number}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: index * 0.1 }}
              className="work-card group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500">MISSION / {item.number}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-indigo-200"><Icon /></span>
                </div>
                <p className="mt-16 text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">{item.label}</p>
                <h3 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.035em] text-white">{item.title}</h3>
                <p className="mt-5 min-h-24 text-sm leading-7 text-slate-400">{item.copy}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {item.tags.map((tag) => <span key={tag} className="tech-tag">{tag}</span>)}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="mt-8 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-9">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">Repository signal detected</p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">Want to see how I think in code?</h3>
            <p className="mt-2 text-sm text-slate-400">Explore the experiments, commits, and projects behind the interface.</p>
          </div>
          <a href="https://github.com/MaxBoiz" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-3 rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white transition hover:border-indigo-300/60 hover:bg-indigo-300/10">
            Open GitHub <FaArrowRight className="text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
}
