import Globe from "@/components/Globe";
import Hero from "@/components/Hero";
import WorkShowcase from "@/components/WorkShowcase";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-white">
      <div className="noise" />
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#05070d]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-end px-6 sm:justify-between sm:px-10 lg:px-16">
          <a href="#top" className="hidden items-center sm:flex" aria-label="Back to top">
            <span className="hidden text-xs font-semibold uppercase tracking-[0.22em] text-slate-300 sm:block">MaxBoy / Portfolio</span>
          </a>
          <div className="flex items-center gap-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 sm:gap-9">
            <a className="nav-link" href="#work">Work</a>
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <div id="top" className="relative mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 pb-12 pt-32 sm:px-10 lg:flex-row lg:items-center lg:px-16 lg:pt-24">
        <div className="hero-grid" />
        <div className="orb orb-one" />
        <Hero />
        <div className="relative mt-10 flex w-full items-center justify-center lg:mt-0 lg:w-[46%]">
          <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-600 xl:block [writing-mode:vertical-rl]">16.0544° N · 108.2022° E · Signal active</div>
          <Globe />
        </div>
      </div>
      <WorkShowcase />
      <About />
      <Contact />
    </main>
  );
}
