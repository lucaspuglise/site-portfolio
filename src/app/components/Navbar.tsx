import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Sobre", href: "#sobre-mim", id: "sobre-mim" },
  { name: "Habilidades", href: "#habilidades", id: "habilidades" },
  { name: "Projetos", href: "#projetos", id: "projetos" },
  { name: "Contato", href: "#contato", id: "contato" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = ["inicio", ...navLinks.map((l) => l.id)];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === "inicio" ? "" : e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) setActive("contato");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <nav className="pointer-events-none fixed left-0 right-0 top-0 z-50 text-paper">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12 md:py-6">
          <a href="#inicio" className="pointer-events-auto border border-paper/20 bg-ink px-4 py-2.5 font-display text-2xl italic leading-none tracking-[-0.02em] shadow-lg shadow-black/20 focus-visible:outline-2 focus-visible:outline-signal">
            LPC.
          </a>

          <div className="pointer-events-auto hidden items-center gap-8 border border-paper/20 bg-ink px-6 py-3 shadow-lg shadow-black/20 md:flex">
            {navLinks.map((link, i) => (
              <a key={link.id} href={link.href} className="relative py-1 text-sm font-medium text-paper transition-colors hover:text-signal focus-visible:outline-2 focus-visible:outline-signal">
                <span className="mr-1.5 font-mono text-[10px] text-signal">0{i + 1}</span>
                {link.name}
                {active === link.id && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-px bg-signal" />
                )}
              </a>
            ))}
          </div>

          <button
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="pointer-events-auto grid h-11 w-11 place-items-center border border-paper/20 bg-ink md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-5 bg-background px-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-6xl leading-none text-foreground"
              >
                <span className="mr-3 font-mono text-xs text-signal">0{i + 1}</span>
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
