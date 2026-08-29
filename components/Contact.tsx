import { FaArrowUp, FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const links = [
  ["GitHub", "https://github.com/MaxBoiz", FaGithub, "github"],
  // TODO: Replace "#" with your LinkedIn profile URL when it is available.
  ["LinkedIn", "#", FaLinkedinIn, "linkedin"],
  ["Facebook", "https://www.facebook.com/HuyMeowMeow", FaFacebookF, "facebook"],
  ["Instagram", "https://www.instagram.com/huylovemeow/", FaInstagram, "instagram"],
  ["X / Twitter", "https://x.com/kingzofd", FaTwitter, "x"],
] as const;

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden">
      <div className="contact-glow" />
      <div className="section-shell relative z-10 py-28 sm:py-36">
        <div className="section-kicker"><span>03</span>Open channel</div>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.22em] text-indigo-300">Transmitting from Vietnam</p>
        <h2 className="section-title mt-4 max-w-5xl">
          Have an idea worth building?
        </h2>
        <div className="mt-12 flex flex-col justify-between gap-10 pt-8 lg:flex-row lg:items-end">
          <p className="max-w-xl text-base leading-8 text-slate-400">Let&apos;s turn it into something people enjoy using. Find me online and start with a simple hello.</p>
          <div className="flex flex-wrap gap-3">
            {links.map(([label, href, Icon, brand]) => (
              <a
                key={label}
                href={href}
                target={href === "#" ? undefined : "_blank"}
                rel={href === "#" ? undefined : "noreferrer"}
                aria-label={label}
                className={`contact-link contact-link-${brand}`}
              >
                <span className="contact-link-signal" aria-hidden="true" />
                <Icon className="contact-link-icon" /><span>{label}</span>
                <span className="contact-link-status" aria-hidden="true"><i />Signal // Connect</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <footer className="section-shell relative z-10 flex flex-col gap-4 border-t border-white/[0.08] py-7 text-[11px] uppercase tracking-[0.16em] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 MaxBoy · Designed & engineered in Vietnam</span>
        <a href="#top" className="orbit-return flex items-center gap-2">
          <span className="orbit-return-copy">
            <span>Back to orbit</span>
            <span aria-hidden="true">03 · 02 · 01</span>
          </span>
          <FaArrowUp />
        </a>
      </footer>
    </section>
  );
}
