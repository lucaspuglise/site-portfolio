import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["8%", "-28%"]);

  return (
    <footer id="contato" ref={ref} className="relative flex min-h-[90vh] flex-col justify-between overflow-hidden border-t border-border pt-24 pb-10">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <p className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-signal">04</span> Próxima conexão
          <span className="ml-4 inline-flex items-center gap-2 text-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-flame" /> Buscando estágio em dados
          </span>
        </p>

        <h2 className="font-display text-[clamp(2.75rem,8vw,7.5rem)] font-normal leading-[0.92] tracking-[-0.02em]">
          <Line delay={0}>Vamos transformar</Line>
          <Line delay={0.12}>uma boa ideia</Line>
          <Line delay={0.24}>
            <em>em algo útil.</em>
          </Line>
        </h2>

        <div className="mt-16 grid gap-px border-y border-border md:grid-cols-2">
          <Magnetic strength={0.08}>
            <a
              href="mailto:lucaspuglisedeca@gmail.com"
              className="group flex w-full items-center justify-between gap-4 py-8 pr-4"
            >
              <span>
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">E-mail</span>
                <span className="font-display text-2xl md:text-3xl">lucaspuglisedeca@gmail.com</span>
              </span>
              <ArrowUpRight className="shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" />
            </a>
          </Magnetic>
          <Magnetic strength={0.08}>
            <a href="tel:+5561992093452" className="group flex w-full items-center justify-between gap-4 py-8 md:pl-8">
              <span>
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Telefone / WhatsApp</span>
                <span className="font-display text-2xl md:text-3xl">(61) 99209-3452</span>
              </span>
              <ArrowUpRight className="shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" />
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="mt-16">
        <motion.p
          style={{ x: ghostX }}
          aria-hidden="true"
          className="select-none whitespace-nowrap font-display text-[24vw] italic leading-[0.8] text-foreground/[0.05]"
        >
          Lucas Puglise de Carvalho
        </motion.p>
        <div className="mx-auto mt-8 flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row md:px-12">
          <p>© {new Date().getFullYear()} Lucas Puglise de Carvalho. Todos os direitos reservados.</p>
          <div className="relative z-20 flex flex-wrap items-center gap-3">
            <a
              href="https://www.linkedin.com/in/lucaspuglise/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir perfil de Lucas Puglise no LinkedIn em nova aba"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                try {
                  const w = window.open("https://www.linkedin.com/in/lucaspuglise/", "_blank", "noopener,noreferrer");
                  if (w) e.preventDefault();
                } catch {}
              }}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-foreground shadow-sm transition-all duration-300 hover:border-signal hover:bg-signal/15 hover:text-signal hover:shadow-[0_0_24px_rgba(74,120,240,0.35)] focus-visible:outline-2 focus-visible:outline-signal"
            >
              <svg className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>LinkedIn</span>
              <svg className="h-3 w-3 shrink-0 opacity-70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-signal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
            <a
              href="https://github.com/lucaspuglise"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir perfil de Lucas Puglise no GitHub em nova aba"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                try {
                  const w = window.open("https://github.com/lucaspuglise", "_blank", "noopener,noreferrer");
                  if (w) e.preventDefault();
                } catch {}
              }}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-foreground shadow-sm transition-all duration-300 hover:border-signal hover:bg-signal/15 hover:text-signal hover:shadow-[0_0_24px_rgba(74,120,240,0.35)] focus-visible:outline-2 focus-visible:outline-signal"
            >
              <svg className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span>GitHub</span>
              <svg className="h-3 w-3 shrink-0 opacity-70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-signal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
