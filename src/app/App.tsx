import { motion, useScroll, useSpring } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";

const grain = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-signal selection:text-ink">
      <style>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>

      <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-signal" />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[55] opacity-[0.06]"
        style={{ backgroundImage: grain }}
      />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 mx-auto grid max-w-7xl grid-cols-2 px-6 md:grid-cols-4 md:px-12">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`border-l border-foreground/[0.05] ${i > 1 ? "hidden md:block" : ""} ${i === 3 ? "border-r" : ""}`} />
        ))}
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
