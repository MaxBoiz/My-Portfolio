"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowRight, FaCode, FaFilePdf, FaGithub, FaLayerGroup, FaMobileAlt, FaTimes } from "react-icons/fa";

const capabilities = [
  {
    number: "01",
    label: "Mobile engineering",
    title: "Vinfast Car Makerplace",
    copy: "Cross-platform mobile experiences shaped around clear flows, responsive feedback, and the details people notice every day.",
    tags: ["React Native", "Flutter", "Product thinking"],
    readout: [
      ["Mode", "Cross-platform"],
      ["Input", "Product signal"],
      ["Output", "Native feel"],
    ],
    status: "Sync ready",
    featured: true,
    icon: FaMobileAlt,
    accent: "from-indigo-500/25 to-cyan-400/5",
  },
  {
    number: "02",
    label: "Web experiences",
    title: "Interfaces with a pulse",
    copy: "Expressive web products where motion has a purpose, performance stays visible, and every screen earns its place.",
    tags: ["Next.js", "TypeScript", "Motion"],
    readout: [
      ["Mode", "Realtime UI"],
      ["Input", "Motion layer"],
      ["Output", "Clear response"],
    ],
    status: "Interface live",
    featured: false,
    icon: FaLayerGroup,
    accent: "from-fuchsia-500/20 to-indigo-400/5",
  },
  {
    number: "03",
    label: "Systems & experiments",
    title: "Curiosity, made useful",
    copy: "APIs, prototypes, and small technical experiments that turn unfamiliar ideas into things you can actually use.",
    tags: ["Node.js", "APIs", "Prototyping"],
    readout: [
      ["Mode", "Prototype loop"],
      ["Input", "Unknown signal"],
      ["Output", "Useful system"],
    ],
    status: "Experiment active",
    featured: false,
    icon: FaCode,
    accent: "from-cyan-500/20 to-emerald-400/5",
  },
];

export default function WorkShowcase() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const reportTriggerRef = useRef<HTMLButtonElement>(null);
  const reportPanelRef = useRef<HTMLDivElement>(null);

  const closeReport = useCallback(() => {
    setIsReportOpen(false);
    window.requestAnimationFrame(() => reportTriggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isReportOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeReport();
      if (event.key !== "Tab" || !reportPanelRef.current) return;

      const focusable = Array.from(
        reportPanelRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]"),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeReport, isReportOpen]);

  return (
    <section id="work" className="section-shell relative scroll-mt-16 py-28 sm:py-36">
      <div className="section-kicker">
        <span>01</span>
        Selected capabilities
      </div>
      <div className="mt-8">
        <h2 className="section-title max-w-3xl">The work is the proof</h2>
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
              className={`work-card${item.featured ? " work-card-featured" : ""}`}
              tabIndex={0}
            >
              <div className={`work-card-accent absolute inset-0 bg-gradient-to-br ${item.accent}`} />
              <div className="work-card-grid" aria-hidden="true" />
              <div className="work-card-scanline" aria-hidden="true" />
              <span className="work-card-corner work-card-corner-tl" aria-hidden="true" />
              <span className="work-card-corner work-card-corner-tr" aria-hidden="true" />
              <span className="work-card-corner work-card-corner-bl" aria-hidden="true" />
              <span className="work-card-corner work-card-corner-br" aria-hidden="true" />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="work-card-mission font-mono text-xs text-slate-500">
                    MISSION / {item.number}
                    <span aria-hidden="true">{"// SCANNING"}</span>
                  </span>
                  <span className="work-card-icon grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-indigo-200"><Icon /></span>
                </div>
                <p className="mt-16 text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">{item.label}</p>
                <h3 className="work-card-title mt-3 text-3xl font-bold leading-tight tracking-[-0.035em] text-white">{item.title}</h3>

                <div className="work-card-body">
                  <div className="work-card-default">
                    <p className="min-h-24 text-sm leading-7 text-slate-400">{item.copy}</p>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {item.tags.map((tag) => <span key={tag} className="tech-tag">{tag}</span>)}
                    </div>
                  </div>

                  <div className="work-card-readout" aria-hidden="true">
                    <div className="work-card-readout-header">
                      <span>Automated readout</span>
                      <span className="work-card-live"><i /> Live</span>
                    </div>
                    <div className="work-card-readout-data">
                      {item.readout.map(([label, value]) => (
                        <div className="work-card-readout-row" key={label}>
                          <span>{label}</span>
                          <strong>{value}</strong>
                        </div>
                      ))}
                    </div>
                    <div className="work-card-status">
                      <div className="work-card-status-line"><span>System status</span><strong>{item.status}</strong></div>
                      <div className="work-card-progress"><span /></div>
                    </div>
                  </div>
                </div>
              </div>
              {item.featured && (
                <button
                  ref={reportTriggerRef}
                  type="button"
                  className="mission-report-trigger"
                  onClick={() => setIsReportOpen(true)}
                  aria-haspopup="dialog"
                  aria-controls="mission-report-dialog"
                >
                  <span>Open mission report</span>
                  <FaArrowRight aria-hidden="true" />
                </button>
              )}
            </motion.article>
          );
        })}
      </div>

      <div className="repo-console mt-8">
        <div className="repo-console-grid" aria-hidden="true" />
        <div className="repo-console-scanline" aria-hidden="true" />
        <span className="repo-console-code" aria-hidden="true">SYS://REPOSITORY/MAXBOY</span>
        <div className="repo-console-layout relative z-10">
          <div className="repo-console-copy">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">Repository signal detected</p>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">Want to see how I think in code?</h3>
            <p className="mt-2 text-sm text-slate-400">Explore the experiments, commits, and projects behind the interface.</p>
          </div>

          <div className="repo-console-readout" aria-label="GitHub repository status">
            <div><span>Channel</span><strong>GitHub</strong></div>
            <div><span>Access</span><strong>Public</strong></div>
            <div><span>Signal</span><strong><i />Live</strong></div>
          </div>

          <a href="https://github.com/MaxBoiz" target="_blank" rel="noreferrer" className="repo-console-command">
            <span>Open GitHub</span>
          </a>
        </div>
      </div>

      <AnimatePresence>
        {isReportOpen && (
          <motion.div
            className="mission-report-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={closeReport}
          >
            <motion.div
              ref={reportPanelRef}
              id="mission-report-dialog"
              className="mission-report-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mission-report-title"
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.99 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="mission-report-grid" aria-hidden="true" />
              <header className="mission-report-header">
                <div>
                  <p>Featured mission // 01</p>
                  <h2 id="mission-report-title">Vinfast Car Makerplace</h2>
                </div>
                <button type="button" onClick={closeReport} autoFocus aria-label="Close mission report"><FaTimes /></button>
              </header>

              <div className="mission-report-layout">
                <div className="mission-report-main">
                  <section>
                    <p className="mission-report-label">Mission brief</p>
                    <p className="mission-report-lead">Cross-platform mobile experiences shaped around clear flows, responsive feedback, and the details people notice every day.</p>
                  </section>

                  <section>
                    <p className="mission-report-label">Engineering focus</p>
                    <div className="mission-report-focus">
                      <article><span>01</span><h3>Clear flows</h3><p>Keep the path through the product understandable and calm.</p></article>
                      <article><span>02</span><h3>Responsive feedback</h3><p>Make every interaction communicate what the system is doing.</p></article>
                      <article><span>03</span><h3>Native feel</h3><p>Carry one product direction across mobile platforms without losing care.</p></article>
                    </div>
                  </section>

                  <section>
                    <p className="mission-report-label">Build loop</p>
                    <div className="mission-report-flow" aria-label="Product build loop">
                      <span>Product signal</span><FaArrowRight /><span>Cross-platform</span><FaArrowRight /><span>Native feel</span>
                    </div>
                  </section>
                </div>

                <aside className="mission-report-aside">
                  <div className="mission-report-signal">
                    <p>System readout</p>
                    <dl>
                      <div><dt>Mode</dt><dd>Cross-platform</dd></div>
                      <div><dt>Input</dt><dd>Product signal</dd></div>
                      <div><dt>Output</dt><dd>Native feel</dd></div>
                      <div><dt>Status</dt><dd className="is-live"><i />Sync ready</dd></div>
                    </dl>
                  </div>

                  <div>
                    <p className="mission-report-label">Stack signal</p>
                    <div className="mission-report-tags"><span>React Native</span><span>Flutter</span><span>Product thinking</span></div>
                  </div>

                  <div className="mission-report-actions">
                    <a href="https://github.com/MaxBoiz" target="_blank" rel="noreferrer"><FaGithub /> Inspect GitHub</a>
                    <a href="/MaxBoy-CV.pdf" target="_blank" rel="noreferrer"><FaFilePdf /> View ENG CV</a>
                  </div>
                </aside>
              </div>

              {/* TODO: Add verified role, screenshots, repository link, and measurable outcomes when they are available. */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
