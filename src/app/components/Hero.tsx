import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Download, Github, Linkedin } from "lucide-react";
import { Magnetic } from "./Magnetic";
// @ts-ignore
import portrait from "../../imports/Retrato_minimalista_de_passaporte_em_fundo_branco.png";
// @ts-ignore
import cvFile from "../../imports/CV_Lucas_Puglise.pdf";

const PAPER = "#ece9e2";
const INK = "#080c18";
const ease = [0.22, 1, 0.36, 1] as const;

const BOOT = [
  "> autenticando usuário: lucas.puglise",
  "> carregando módulos: python · sql · ia",
  "> acesso concedido",
];

const PINS = [
  { n: "01", label: "Inteligência Artificial", x: 50, y: 23, side: "right", mobile: true },
  { n: "02", label: "Python", x: 54.5, y: 47, side: "right", mobile: true },
  { n: "03", label: "Banco de Dados", x: 41, y: 58, side: "left", mobile: false },
  { n: "04", label: "UI / UX", x: 50, y: 79, side: "right", mobile: true },
] as const;

const maskStyle = {
  maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
};

function RevealWord({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.16em] -mb-[0.16em] ${className}`} aria-hidden="true">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className={`inline-block ${i === text.length - 1 && className.includes("italic") ? "pr-[0.14em]" : ""}`}
          initial={{ y: "112%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.05, ease }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const bg = useTransform(p, [0.16, 0.42], [PAPER, INK]);
  const fg = useTransform(p, [0.16, 0.42], [INK, PAPER]);
  const photoScale = useTransform(p, [0, 1], [1, 1.18]);
  const multiplyOpacity = useTransform(p, [0.14, 0.34], [1, 0]);
  const negativeOpacity = useTransform(p, [0.2, 0.42], [0, 1]);
  const toneFilter = useTransform(p, [0.05, 0.3], ["grayscale(0) contrast(1)", "grayscale(1) contrast(1.15)"]);
  const lucasX = useTransform(p, [0, 1], ["0vw", "-12vw"]);
  const puglX = useTransform(p, [0, 1], ["0vw", "12vw"]);
  const pinsOpacity = useTransform(p, [0.03, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const scanOpacity = useTransform(p, [0.15, 0.3], [1, 0]);
  const stampOpacity = useTransform(p, [0.4, 0.5], [0, 1]);
  const stampScale = useTransform(p, [0.4, 0.55], [1.45, 1]);
  const cueOpacity = useTransform(p, [0, 0.12], [1, 0]);
  const ringsOpacity = useTransform(p, [0.3, 0.6], [1, 0.35]);
  const vignette = useTransform(p, [0, 0.4], [1, 0]);

  const [step, setStep] = useState(reduce ? 3 : 0);
  useEffect(() => {
    if (reduce) {
      setStep(3);
      return;
    }
    const timers = [500, 1300, 2100].map((ms, i) => setTimeout(() => setStep(i + 1), ms));
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  const [fine, setFine] = useState(false);
  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 260, damping: 28 });
  const sy = useSpring(my, { stiffness: 260, damping: 28 });
  const rx = useTransform(sx, (v) => v - 28);
  const ry = useTransform(sy, (v) => v - 28);
  const fxX = useTransform(sx, (v) => (v - 600) * -0.012);
  const fxY = useTransform(sy, (v) => (v - 400) * -0.012);
  const tx = useTransform(sx, (v) => v + 40);
  const ty = useTransform(sy, (v) => v + 34);
  const readout = useTransform([sx, sy], ([x, y]: number[]) => `x ${Math.round(x)} · y ${Math.round(y)}`);
  const showScan = fine && !reduce;

  return (
    <section ref={ref} id="inicio" className="relative h-[200vh] bg-background">
      <motion.div
        style={{ backgroundColor: bg, color: fg }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(e.clientX - r.left);
          my.set(e.clientY - r.top);
        }}
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
      >
        <h1 className="sr-only">Lucas Puglise de Carvalho</h1>

        {/* Navy vignette: breaks up the white and melts into the dark page */}
        <motion.div
          style={{ opacity: vignette }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_70%_65%_at_50%_45%,transparent_35%,rgba(8,12,24,0.28)_100%)]"
        />

        {/* Giant name — sits behind the portrait */}
        <motion.div style={{ x: lucasX }} className="absolute left-[4vw] top-[17vh] md:top-[17vh]">
          <RevealWord
            text="Lucas"
            delay={0.3}
            className="font-display text-[clamp(4.25rem,20vw,6.5rem)] leading-[0.85] tracking-[-0.03em] md:text-[clamp(7rem,13vw,15rem)]"
          />
        </motion.div>
        <motion.div
          style={{ x: puglX }}
          className="absolute left-[20vw] top-[25vh] md:bottom-[5vh] md:left-auto md:right-[3vw] md:top-auto"
        >
          <RevealWord
            text="Puglise"
            delay={0.55}
            className="font-display italic text-[clamp(4.25rem,20vw,6.5rem)] leading-[0.85] tracking-[-0.03em] md:text-[clamp(7rem,13vw,15rem)]"
          />
        </motion.div>

        {/* Portrait: wrapper has no transform/opacity so blend modes see the stage color */}
        <div className="pointer-events-none absolute bottom-[22vh] left-1/2 -ml-[44.4vh] h-[50vh] w-[88.8vh] md:bottom-0 md:-ml-[64vh] md:h-[72vh] md:w-[128vh]">
          {/* Rings + orbit tokens behind the face (white photo bg multiplies over them) */}
          <motion.div
            style={{ scale: photoScale, originY: 0.75, opacity: ringsOpacity, x: fxX, y: fxY }}
            className="absolute inset-0"
            aria-hidden="true"
          >
            <div className="absolute left-1/2 top-[44%] aspect-square h-[104%] -translate-x-1/2 -translate-y-1/2">
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full overflow-visible"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="0.12" strokeDasharray="0.6 1.4" />
                <circle cx="50" cy="50" r="49" fill="none" stroke="#ff4b2b" strokeWidth="0.35" strokeDasharray="8 292" />
              </motion.svg>
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute inset-[11%] h-[78%] w-[78%] overflow-visible"
                animate={reduce ? undefined : { rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.15" />
                <circle cx="50" cy="1" r="1.1" fill="#ff4b2b" />
                <circle cx="99" cy="50" r="0.7" fill="currentColor" />
                <circle cx="20" cy="85" r="0.7" fill="currentColor" />
              </motion.svg>
              {["{ }", "SELECT *", "01", "def ia():"].map((t, i) => (
                <motion.span
                  key={t}
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                  className="absolute hidden font-mono text-[11px] tracking-wider md:block"
                  style={{ left: ["4%", "88%", "92%", "-2%"][i], top: ["30%", "20%", "62%", "70%"][i] }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.img
            src={portrait}
            alt="Retrato de Lucas Puglise de Carvalho"
            draggable={false}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
            className="absolute inset-0 h-full w-full select-none object-cover"
            style={{ scale: photoScale, originY: 0.75, opacity: multiplyOpacity, filter: toneFilter, mixBlendMode: "multiply", ...maskStyle }}
          />
          <motion.img
            src={portrait}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-cover"
            style={{ scale: photoScale, originY: 0.75, opacity: negativeOpacity, filter: "grayscale(1) invert(1) contrast(1.15)", mixBlendMode: "screen", ...maskStyle }}
          />

          {/* Annotation pins pinned to face landmarks */}
          <motion.div style={{ scale: photoScale, originY: 0.75, opacity: pinsOpacity }} className="absolute inset-0">
            {PINS.map((pin, i) => (
              <motion.div
                key={pin.n}
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 3 ? 1 : 0 }}
                transition={{ duration: 0.5, delay: i * 0.18 }}
                className={`absolute ${pin.mobile ? "" : "hidden md:block"}`}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              >
                <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-signal ring-4 ring-signal/25" />
                <span className={`absolute top-0 h-px w-10 bg-current/60 md:w-24 ${pin.side === "right" ? "left-2" : "right-2"}`} />
                <span
                  className={`absolute -top-5 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] md:text-[11px] ${
                    pin.side === "right" ? "left-2 md:left-3" : "right-2 md:right-3"
                  }`}
                >
                  <span className="text-signal">{pin.n}</span> {pin.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Boot sequence */}
        <div className="absolute left-5 top-[84px] z-20 font-mono text-[10px] leading-relaxed md:left-[4vw] md:top-[104px] md:text-[11px]" aria-hidden="true">
          {BOOT.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: step > i ? 1 : 0, x: step > i ? 0 : -8 }}
              transition={{ duration: 0.4 }}
              className={i === 2 ? "text-signal" : "opacity-70"}
            >
              {line}
              {i === 2 && <span className="ml-1 inline-block h-[0.8em] w-[0.5em] translate-y-[1px] animate-pulse bg-signal" />}
            </motion.p>
          ))}
        </div>

        {/* Stamp after lights go off */}
        <motion.div
          style={{ opacity: stampOpacity, scale: stampScale, rotate: -6 }}
          className="pointer-events-none absolute left-[5vw] top-[42%] z-20 border-2 border-signal px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-signal md:text-sm"
        >
          Acesso concedido
        </motion.div>

        {/* Intro + actions */}
        <div className="absolute bottom-4 left-4 right-4 z-20 border border-paper/25 bg-ink p-4 text-paper shadow-[0_18px_40px_-18px_rgba(8,12,24,0.6)] md:bottom-[5vh] md:left-[4vw] md:right-auto md:max-w-sm md:p-5">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/80">Ciência da Computação · CEUB · 2029</p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease }}
            className="font-display text-lg leading-snug md:text-[1.6rem]"
          >
            Estudante de Ciência da Computação focado em <em>Python</em>, <em>Banco de Dados</em> e <em>Inteligência Artificial</em>.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease }}
            className="mt-4 flex items-center gap-3"
          >
            <Magnetic>
              <motion.a
                href={cvFile}
                download="LucasPuglise_CV.pdf"
                className="inline-flex items-center gap-2 bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-signal"
              >
                <Download size={16} /> Baixar Currículo
              </motion.a>
            </Magnetic>
            <a
              href="https://www.linkedin.com/in/lucaspuglise/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn de Lucas Puglise"
              className="grid h-11 w-11 place-items-center border border-paper/50 text-paper transition-colors hover:border-signal hover:text-signal"
            >
              <Linkedin size={17} />
            </a>
            <a
              href="https://github.com/lucaspuglise"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub de Lucas Puglise"
              className="grid h-11 w-11 place-items-center border border-paper/50 text-paper transition-colors hover:border-signal hover:text-signal"
            >
              <Github size={17} />
            </a>
          </motion.div>
        </div>

        {/* Side cue */}
        <div className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] sm:flex md:right-6">
          <span className="[writing-mode:vertical-rl]">Brasília, DF · BR</span>
          <span className="h-12 w-px bg-current/40" />
          <motion.a href="#sobre-mim" style={{ opacity: cueOpacity }} className="opacity-70 [writing-mode:vertical-rl]">
            Role para apagar a luz
          </motion.a>
        </div>

        {/* Cursor scanner */}
        {showScan && (
          <motion.div style={{ opacity: scanOpacity }} className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
            <motion.span style={{ y: sy }} className="absolute left-0 right-0 top-0 h-px bg-signal/30" />
            <motion.span style={{ x: sx }} className="absolute bottom-0 left-0 top-0 w-px bg-signal/30" />
            <motion.div style={{ x: rx, y: ry }} className="absolute left-0 top-0 h-14 w-14">
              <span className="absolute inset-0 rounded-full border border-signal/80" />
              <span className="absolute left-1/2 top-[-8px] h-[72px] w-px bg-signal/70" />
              <span className="absolute left-[-8px] top-1/2 h-px w-[72px] bg-signal/70" />
            </motion.div>
            <motion.span style={{ x: tx, y: ty }} className="absolute left-0 top-0 font-mono text-[10px] text-signal">
              {readout}
            </motion.span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
