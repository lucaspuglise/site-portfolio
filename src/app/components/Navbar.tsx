import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "./theme";

const navLinks = [
  { name: "Sobre", href: "#sobre-mim", id: "sobre-mim" },
  { name: "Habilidades", href: "#habilidades", id: "habilidades" },
  { name: "Projetos", href: "#projetos", id: "projetos" },
  { name: "Contato", href: "#contato", id: "contato" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { dark, toggle } = useTheme();
  // Hero ainda claro (topo da página, modo claro): o logotipo precisa de tinta escura
  const [atTop, setAtTop] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const onLight = atTop && !dark;

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
      setAtTop(window.scrollY < window.innerHeight * 0.3);
      setScrolled(window.scrollY > window.innerHeight * 0.3);
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) setActive("contato");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <nav className="pointer-events-none fixed left-0 right-0 top-0 z-50 text-paper">
        {/* Véu suave atrás do logotipo quando o conteúdo rola por baixo (sem caixa) */}
        <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/70 to-transparent transition-opacity duration-500 ${scrolled && !onLight ? "opacity-100" : "opacity-0"}`} />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12 md:py-6">
          <a
            href="#inicio"
            aria-label="Lucas Puglise de Carvalho, início"
            className="pointer-events-auto group relative flex items-baseline font-display text-[2rem] italic leading-none tracking-[-0.03em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          >
            <span className={`transition-colors duration-500 ${onLight ? "text-ink" : "text-white"}`}>LP</span>
            <span className={`transition-all duration-500 group-hover:-translate-y-0.5 ${onLight ? "text-[#2f5fe0]" : "text-signal"}`}>C</span>
            <span className="inline-block origin-bottom text-flame transition-transform duration-300 group-hover:scale-150">.</span>
            <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-signal to-flame transition-all duration-500 group-hover:w-full" />
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
            type="button"
            onClick={toggle}
            aria-pressed={dark}
            aria-label={dark ? "Desativar modo escuro" : "Ativar modo escuro"}
            title={dark ? "Modo claro" : "Modo escuro"}
            className="pointer-events-auto ml-auto mr-3 grid h-11 w-11 place-items-center border border-paper/20 bg-ink text-paper transition-colors hover:border-signal hover:text-signal focus-visible:outline-2 focus-visible:outline-signal md:ml-0 md:mr-0"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

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
