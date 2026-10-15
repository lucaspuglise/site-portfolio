import type { ReactNode } from "react";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function SectionHeading({ index, label, lines }: { index: string; label: string; lines: ReactNode[] }) {
  return (
    <div className="mb-14 md:mb-20">
      <div className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="text-signal">{index}</span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease }}
          className="h-px flex-1 origin-left bg-border"
        />
        <span>{label}</span>
      </div>
      <h2 className="font-display text-[clamp(2.75rem,8vw,7.5rem)] font-normal leading-[0.92] tracking-[-0.02em] text-foreground">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.1em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  );
}
