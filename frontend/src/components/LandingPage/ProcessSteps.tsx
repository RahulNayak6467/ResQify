import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";

const steps = [
  {
    n: "01",
    tag: "DETECT",
    title: "Incident Reported",
    desc: "Guests tap one button. IoT sensors auto-trigger. Either way, the system knows within milliseconds.",
    color: "#00d97e",
  },
  {
    n: "02",
    tag: "CLASSIFY",
    title: "AI Triage & Severity",
    desc: "Claude reads the report, classifies severity (low / medium / high / critical), and suggests the optimal response protocol.",
    color: "#4a9eff",
  },
  {
    n: "03",
    tag: "ASSIGN",
    title: "Smart Staff Routing",
    desc: "The nearest available staff member gets the assignment. Admin sees the full picture on the command dashboard.",
    color: "#ffaa00",
  },
  {
    n: "04",
    tag: "RESOLVE",
    title: "Track & Close",
    desc: "Real-time status updates for everyone involved. Full audit trail logged for compliance and analytics.",
    color: "#ff3b3b",
  },
];

const fadeIn: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  final: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const ProcessSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const transformed = useTransform(scrollYProgress, [0, 1], [0, 500]);
  return (
    <section className="max-w-7xl mx-auto px-16 py-20">
      {/* heading */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-resolved" />
          <span
            className="font-mono text-xs font-semibold text-resolved
          uppercase tracking-widest"
          >
            Process
          </span>
        </div>
        <h2
          className=" font-bold text-5xl font-serif bg-gradient-to-r from-resolved to-accent pb-2 bg-clip-text text-transparent
        leading-tight tracking-tight mb-5"
        >
          From Incident to Resolution in Under 90 Seconds
        </h2>
        <p
          className="font-sans text-base text-text-secondary leading-relaxed
        max-w-lg"
        >
          A fully automated pipeline that detects, classifies, assigns, and
          tracks every emergency.
        </p>
      </div>

      {/* timeline */}
      <div className="flex gap-12">
        {/* vertical line + dots */}
        <div className="relative flex flex-col items-center flex-shrink-0 pt-2">
          {/* full line */}
          <motion.div
            style={{ height: transformed }}
            ref={timelineRef}
            viewport={{ once: true }}
            className="absolute   top-2 bottom-2 left-1/2 -translate-x-1/2
          w-px bg-surface-raised brightness-200"
          />
          {/* dots */}
          {steps.map(({ color }, i) => (
            <div
              key={i}
              className="relative z-10 w-4 h-4  rounded-full flex-shrink-0"
              style={{
                background: color,
                boxShadow: `0 0 60px ${color}100`,
                marginBottom: i !== steps.length - 1 ? "120px" : 0,
                marginTop: i === 0 ? 15 : 15,
              }}
            />
          ))}
        </div>

        {/* step content */}
        <div className="flex flex-col gap-12 flex-1">
          {steps.map(({ n, tag, title, desc, color }) => (
            <motion.div key={n}>
              <motion.div
                variants={fadeIn}
                initial="initial"
                whileInView={"final"}
                viewport={{ once: true, amount: 1 }}
                className="flex items-center gap-2 mb-3"
              >
                <span
                  className="font-mono text-xs font-semibold uppercase
                           tracking-widest"
                  style={{ color }}
                >
                  STEP {n}
                </span>
                <span className="font-mono text-xs text-text-faint">
                  — {tag}
                </span>
              </motion.div>
              <motion.h3
                variants={fadeIn}
                initial="initial"
                whileInView={"final"}
                viewport={{ once: true, amount: 1 }}
                className="font-sans font-bold text-xl text-text-primary
              leading-tight mb-3"
              >
                {title}
              </motion.h3>
              <motion.p
                variants={fadeIn}
                initial="initial"
                whileInView={"final"}
                viewport={{ once: true, amount: 1 }}
                className="font-sans text-sm text-text-secondary leading-relaxed
              max-w-2xl"
              >
                {desc}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
