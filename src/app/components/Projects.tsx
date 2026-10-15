import { Fragment, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Figma, Github } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Magnetic } from "./Magnetic";
// @ts-ignore
import citySyncImage from "../../imports/celular_citysync.jpeg";
// @ts-ignore
import finanControlImage from "../../imports/financontrol.png";
// @ts-ignore
import loginImage from "../../imports/p_gina-login.png";

type Project = {
  id: string;
  kicker: string;
  badge: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  alt: string;
  bg: string;
  fit: string;
  links: { label: string; href: string; kind: "github" | "figma" }[];
  extra?: ReactNode;
};

function Pipeline() {
  const nodes = [
    { t: "Interface", s: "formulário · validação" },
    { t: "Servidor", s: "rotas · autenticação" },
    { t: "Banco de dados", s: "usuários · persistência" },
  ];
  return (
    <div className="mt-8 border-t border-border pt-6">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Fluxo do login</p>
      <div className="flex items-start">
        {nodes.map((n, i) => (
          <Fragment key={n.t}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.4 }}
              className="min-w-0 flex-1 border border-border p-3"
            >
              <p className="font-display text-xl leading-none">{n.t}</p>
              <p className="mt-2 font-mono text-[9px] uppercase leading-snug tracking-[0.1em] text-muted-foreground">{n.s}</p>
            </motion.div>
            {i < nodes.length - 1 && (
              <div className="relative mt-7 h-px w-5 shrink-0 bg-border md:w-8">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.4 + 0.4 }}
                  className="absolute inset-0 origin-left bg-signal"
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

const projects: Project[] = [
  {
    id: "01",
    kicker: "Mobilidade urbana + IA",
    badge: "City intelligence",
    title: "CitySync",
    description:
      "Aplicativo de inteligência urbana para monitorar tráfego e densidade populacional em tempo real. Usa IA para antecipar gargalos e sugerir rotas que tornam o deslocamento mais fluido.",
    tags: ["Python", "Machine Learning", "PostgreSQL", "React"],
    image: citySyncImage,
    alt: "Interface do aplicativo CitySync em um celular",
    bg: "bg-[#15152a]",
    fit: "object-cover",
    links: [
      { label: "GitHub", href: "https://github.com/lucaspuglise/CitySync", kind: "github" },
      {
        label: "Protótipo",
        href: "https://www.figma.com/make/di6XBjKasy3GHcr1rpuwbO/Cidade-Inteligente?fullscreen=1&t=v0FR76vi19xtkDtC-1",
        kind: "figma",
      },
    ],
  },
  {
    id: "02",
    kicker: "Python + banco de dados local",
    badge: "Finance OS",
    title: "FinanControl",
    description:
      "Sistema de controle financeiro pessoal em Python, com interface gráfica e banco de dados local. Organiza receitas, despesas e metas, oferecendo relatórios e gráficos para acompanhar cada decisão financeira.",
    tags: ["Python", "GUI", "SQLite", "Relatórios", "Gráficos"],
    image: finanControlImage,
    alt: "Painel principal do FinanControl com indicadores financeiros e gráfico de despesas",
    bg: "bg-[#e7e9ed]",
    fit: "object-cover object-left",
    links: [{ label: "Ver repositório", href: "https://github.com/lucaspuglise/Projeto-FinanControl.git", kind: "github" }],
  },
  {
    id: "03",
    kicker: "Web Full-Stack · autenticação",
    badge: "Auth system",
    title: "Site-Login",
    description:
      "Sistema de login funcional e responsivo, criado para aplicar os fundamentos do desenvolvimento Web Full-Stack: da concepção da interface visual (Frontend) à estruturação do servidor e do banco de dados (Backend).",
    tags: ["Full-Stack", "Frontend", "Backend", "Banco de dados", "Responsivo", "Autenticação"],
    image: loginImage,
    alt: "Tela de login com campos de e-mail e senha sobre um céu estrelado",
    bg: "bg-[#07162b]",
    fit: "object-cover",
    links: [{ label: "Ver repositório", href: "https://github.com/lucaspuglise/Site-Login", kind: "github" }],
    extra: <Pipeline />,
  },
];

function Media({ p, total }: { p: Project; total: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const lx = useSpring(0, { stiffness: 300, damping: 28 });
  const ly = useSpring(0, { stiffness: 300, damping: 28 });
  const [hover, setHover] = useState(false);

  return (
    <a
      ref={ref}
      href={p.links[0].href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Abrir repositório de ${p.title}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        lx.set(e.clientX - r.left + 16);
        ly.set(e.clientY - r.top + 16);
      }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className={`relative block min-h-[340px] overflow-hidden lg:min-h-[540px] ${p.bg}`}
    >
      <motion.img src={p.image} alt={p.alt} style={{ y }} className={`absolute inset-x-0 -top-[10%] h-[120%] w-full ${p.fit}`} />
      <span className="absolute left-4 top-4 bg-ink/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper">
        {p.id} / {String(total).padStart(2, "0")} — {p.badge}
      </span>
      <motion.span
        style={{ x: lx, y: ly }}
        animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.6 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute left-0 top-0 hidden rounded-full bg-signal px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink md:block"
      >
        Ver repo ↗
      </motion.span>
    </a>
  );
}

function Case({ p, flip, total }: { p: Project; flip: boolean; total: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-border pt-6"
    >
      <div className="mb-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <span>
          <span className="text-signal">{p.id}</span> — {p.kicker}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
          <Media p={p} total={total} />
        </div>

        <div className={`flex flex-col justify-center lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <h3 className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">{p.title}</h3>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{p.description}</p>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/80">
            {p.tags.map((t) => (
              <li key={t}>[ {t} ]</li>
            ))}
          </ul>
          {p.extra}
          <div className="mt-8 flex flex-wrap items-center gap-6">
            {p.links.map((l, i) => {
              const Icon = l.kind === "figma" ? Figma : Github;
              return i === 0 ? (
                <Magnetic key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-signal"
                  >
                    <Icon size={16} /> {l.label} <ArrowUpRight size={15} />
                  </a>
                </Magnetic>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-b border-foreground/40 pb-1 text-sm transition-colors hover:border-signal hover:text-signal"
                >
                  <Icon size={16} /> {l.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projetos" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <SectionHeading index="03" label="Projetos" lines={["Ideias em", <em key="e">movimento.</em>]} />
        <p className="-mt-8 mb-20 max-w-md text-sm leading-relaxed text-muted-foreground md:-mt-12">
          Produtos que exploram dados, automação e interfaces para tornar informação complexa mais legível.
        </p>
        <div className="grid gap-24 md:gap-32">
          {projects.map((p, i) => (
            <Case key={p.id} p={p} flip={i % 2 === 1} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
