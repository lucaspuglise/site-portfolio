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
            <span className="h-2 w-2 animate-pulse rounded-full bg-signal" /> Disponibilidade Imediata
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
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/lucaspuglise/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-signal">
              LinkedIn
            </a>
            <a href="https://github.com/lucaspuglise" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-signal">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
