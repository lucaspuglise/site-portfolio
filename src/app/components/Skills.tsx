import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { SectionHeading } from "./SectionHeading";

const marqueeItems = ["Python", "Banco de Dados", "Inteligência Artificial", "Web"];

function Marquee() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const smooth = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-2000, 0, 2000], [-6, 0, 6], { clamp: false });
  const dir = useRef(1);
  const x = useTransform(baseX, (v) => `${(((v % 50) + 50) % 50) - 50}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * -3 * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const strip = (
    <div className="flex shrink-0 items-center">
      {marqueeItems.map((item, i) => (
        <span key={item} className="flex items-center">
          <span
            className={`px-8 font-display text-[clamp(3.5rem,10vw,9rem)] leading-none ${
              i % 2 === 0 ? "text-transparent [-webkit-text-stroke:1px_var(--foreground)]" : "italic text-foreground"
            }`}
          >
            {item}
          </span>
          <span className="h-3 w-3 rounded-full bg-signal" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-border py-8" aria-hidden="true">
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap">
        {strip}
        {strip}
      </motion.div>
    </div>
  );
}

const skills = [
  { n: "01", title: "Python", description: "Desenvolvimento de scripts, automação e análise de dados.", tag: "linguagem principal" },
  { n: "02", title: "Estruturação de BD", description: "Modelagem relacional, queries avançadas e otimização.", tag: "dados" },
  { n: "03", title: "Tecnologias Web", description: "Construção de interfaces e integrações com HTML, CSS e JS.", tag: "interfaces" },
];

export function Skills() {
  const aiRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: aiRef, offset: ["start end", "end start"] });
  const ghostY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="habilidades" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeading index="02" label="Habilidades" lines={["Ferramentas que", <em key="e">uso todo dia.</em>]} />
      </div>

      <Marquee />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mt-6 border-b border-border">
          {skills.map((s) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
              }}
              style={{ backgroundImage: "radial-gradient(320px circle at var(--x, -400px) var(--y, -400px), rgba(255,75,43,0.1), transparent 70%)" }}
              className="group grid items-baseline gap-3 border-t border-border py-8 md:grid-cols-[4rem_1.2fr_1fr_auto] md:gap-8"
            >
              <span className="font-mono text-xs text-signal">{s.n}</span>
              <h3 className="font-display text-4xl leading-none transition-transform duration-500 group-hover:translate-x-3 md:text-6xl">{s.title}</h3>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">{s.description}</p>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.tag}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          ref={aiRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="relative mt-20 overflow-hidden bg-paper p-8 text-ink md:p-14"
        >
          <motion.span
            style={{ y: ghostY }}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -right-4 select-none font-display text-[16rem] italic leading-none text-ink/[0.07] md:text-[26rem]"
          >
            IA
          </motion.span>
          <div className="relative">
            <span className="mb-6 inline-block -rotate-3 border-2 border-[#c4321a] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#c4321a]">
              Foco Principal
            </span>
            <h3 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.92]">
              Inteligência <em>Artificial</em>
            </h3>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
              Exploração e integração de <strong className="font-semibold text-ink">IAs Generativas</strong> e{" "}
              <strong className="font-semibold text-ink">LLMs (Large Language Models)</strong> para automação de tarefas, geração de conteúdo e criação de agentes inteligentes.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <div className="flex items-center gap-3 border border-cyan-300/60 bg-cyan-300/10 px-6 py-3.5 text-base font-medium text-white shadow-[0_0_32px_rgba(103,232,249,0.18)]">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" /> Windows (principal)
          </div>
          <div className="flex items-center gap-2 border border-border px-4 py-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/60" /> Ambiente Linux
          </div>
          <div className="flex items-center gap-2 border border-border px-4 py-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/60" /> Inglês Intermediário
          </div>
        </motion.div>
      </div>
    </section>
  );
}
