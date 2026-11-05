import { Fragment, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { SectionHeading } from "./SectionHeading";

const lead =
  "Estudante de **Ciência da Computação no CEUB**, com forte perfil analítico e foco em **Engenharia e Análise de Dados**. Tenho experiência prática em todo o ciclo dos dados: da modelagem estrutural em SQL à visualização de métricas, sempre buscando transformar informação bruta em soluções estratégicas. Tenho grande interesse em **Inteligência Artificial** e estudo o tema de forma contínua, aplicando-a de maneira prática e útil.";

type Token = { w: string; strong: boolean; glue?: boolean };

function Word({ t, i, n, p }: { t: Token; i: number; n: number; p: MotionValue<number> }) {
  const opacity = useTransform(p, [i / n, (i + 1) / n], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={t.strong ? "italic text-signal" : ""}>
      {t.w}
    </motion.span>
  );
}

function ScrollWords({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const segs = text.split("**");
  const tokens: Token[] = segs
    .flatMap((seg, i) =>
      seg
        .split(" ")
        .filter(Boolean)
        // só cola quando não há espaço dos dois lados da fronteira (ex.: vírgula após destaque)
        .map((w, j) => ({ w, strong: i % 2 === 1, glue: j === 0 && i > 0 && !seg.startsWith(" ") && !segs[i - 1].endsWith(" ") })),
    );
  return (
    <p ref={ref} className="relative font-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.12] text-foreground">
      {tokens.map((t, i) => (
        <Fragment key={i}>
          <Word t={t} i={i} n={tokens.length} p={scrollYProgress} />
          {!tokens[i + 1]?.glue && " "}
        </Fragment>
      ))}
    </p>
  );
}

const facts = [
  { n: "01", label: "Formação", main: "Ciência da Computação", sub: "CEUB · fev/2026 – dez/2029 (previsto)" },
  { n: "02", label: "Idiomas", rows: [["Português", "nativo"], ["Inglês", "profissional"]] },
  { n: "03", label: "Perfil", main: "Educador Social Voluntário", sub: "Análise de dados · relatórios · Data Storytelling" },
] as const;

export function About() {
  return (
    <section id="sobre-mim" className="relative z-10 -mt-[75vh] border-t border-border bg-background pb-28 pt-12 md:pb-40 md:pt-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeading index="01" label="Sobre mim" lines={["Lógica de máquina,", <em key="e">ouvido de gente.</em>]} />

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ScrollWords text={lead} />
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="mt-12 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Combino raciocínio lógico, aprendizado rápido e comunicação clara (Data Storytelling) para traduzir desafios técnicos em resultados compreensíveis. Como{" "}
              <strong className="font-semibold text-foreground">Educador Social Voluntário</strong>, analisei o desempenho de alunos e elaborei relatórios para diferentes públicos. Estudo para a certificação{" "}
              <strong className="font-semibold text-foreground">Microsoft Power BI (PL-300)</strong>, concluí o <strong className="font-semibold text-foreground">Solve It with SQL (Oracle APEX)</strong> e fui aprovado até a fase final do processo seletivo de Estágio em Data Science na{" "}
              <strong className="font-semibold text-foreground">Ouvidoria-Geral da União (OGU)</strong>, ainda no primeiro semestre. Uso IAs Generativas (LLMs e LRMs) no dia a dia para aprender mais rápido, automatizar tarefas e validar ideias, e busco evoluir sempre nesse campo. Procuro uma oportunidade de estágio para gerar impacto real, trabalhando em equipe.
            </motion.p>
          </div>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="self-start border-b border-border lg:sticky lg:top-28 lg:col-span-4"
          >
            {facts.map((f) => (
              <div key={f.n} className="group relative border-t border-border py-6 transition-transform duration-300 hover:translate-x-2">
                <span className="absolute -left-4 top-0 h-full w-px origin-top scale-y-0 bg-signal transition-transform duration-300 group-hover:scale-y-100" />
                <dt className="mb-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="text-signal">{f.n}</span>
                  {f.label}
                </dt>
                <dd>
                  {"rows" in f ? (
                    <div className="space-y-1">
                      {f.rows.map(([a, b]) => (
                        <div key={a} className="flex items-baseline justify-between">
                          <span className="font-display text-2xl">{a}</span>
                          <span className="font-mono text-xs text-muted-foreground">{b}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="font-display text-2xl leading-tight">{f.main}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{f.sub}</p>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
