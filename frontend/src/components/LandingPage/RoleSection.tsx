import { User, FileText, Monitor } from "lucide-react";
import { motion, type Variants } from "motion/react";

const roles = [
  {
    icon: User,
    iconBg: "bg-resolved-muted",
    iconColor: "text-resolved",
    title: "Guest Portal",
    desc: "Frictionless emergency reporting with real-time status updates and safety guidance.",
    features: [
      "One-tap SOS",
      "Live incident tracking",
      "Evacuation guidance",
      "Multi-language support",
    ],
  },
  {
    icon: FileText,
    iconBg: "bg-accent-muted",
    iconColor: "text-accent",
    title: "Staff Dashboard",
    desc: "Task-focused interface for rapid response with clear assignments and status updates.",
    features: [
      "Assignment queue",
      "Priority sorting",
      "Quick status update",
      "Floor-level map",
    ],
  },
  {
    icon: Monitor,
    iconBg: "bg-critical-muted",
    iconColor: "text-critical",
    title: "Admin Command",
    desc: "Full situational awareness with analytics, staff management, and protocol configuration.",
    features: [
      "Real-time overview",
      "Staff management",
      "Incident analytics",
      "Protocol editor",
    ],
  },
];

const revealAnimation: Variants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  final: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const cardContainer: Variants = {
  inital: {
    opacity: 0,
  },
  final: {
    opacity: 1,

    transition: {
      duration: 2,
      staggerChildren: 0.4,
    },
  },
};

const cardAnimation: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(5px)",
  },
  final: {
    opacity: 1,
    filter: "none",
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const RolesSection = () => (
  <section className="max-w-7xl mx-auto bg-base mt-24 px-16 py-24">
    {/* heading */}
    <motion.div
      variants={revealAnimation}
      initial="initial"
      whileInView={"final"}
      viewport={{ once: true, amount: 0.7 }}
      className="text-center mb-16"
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-8 h-px bg-resolved" />
        <span
          className="font-mono text-xs font-semibold text-resolved
                         uppercase tracking-widest"
        >
          Interfaces
        </span>
        <div className="w-8 h-px bg-resolved" />
      </div>
      <h2
        className="font-serif font-bold text-5xl  bg-gradient-to-r from-resolved to-accent pb-2 bg-clip-text text-transparent
                     leading-tight tracking-tight mb-5"
      >
        Three Roles,
        <br />
        Three Experiences
      </h2>
      <p
        className="font-sans text-base text-text-secondary leading-relaxed
                    max-w-lg mx-auto"
      >
        Every user sees a purpose-built interface — optimized for their exact
        needs during a crisis.
      </p>
    </motion.div>

    {/* cards */}
    <div className="grid grid-cols-3 gap-5">
      {roles.map(({ icon: Icon, iconBg, iconColor, title, desc, features }) => (
        <motion.div
          variants={cardContainer}
          initial="initial"
          whileInView={"final"}
          viewport={{ once: true, amount: 0.7 }}
          key={title}
          whileHover={{ y: 10 }}
          className="bg-surface border border-border rounded-2xl p-7
                     flex flex-col gap-5 hover:border-border2
                     transition-colors duration-200 relative z-100"
        >
          {/* icon */}
          <motion.div
            variants={cardAnimation}
            className={`w-14 h-14 rounded-xl ${iconBg} flex items-center
                           justify-center flex-shrink-0`}
          >
            <Icon size={24} className={iconColor} />
          </motion.div>

          {/* title + desc */}
          <div>
            <motion.h3
              variants={cardAnimation}
              className="font-sans font-bold text-lg text-text-primary
                           leading-tight mb-2"
            >
              {title}
            </motion.h3>
            <motion.p
              variants={cardAnimation}
              className="font-sans text-sm text-text-secondary leading-relaxed"
            >
              {desc}
            </motion.p>
          </div>

          {/* feature list */}
          <motion.ul variants={cardAnimation} className="flex flex-col gap-2.5">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00d97e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
                <span className="font-sans text-sm text-text-secondary">
                  {f}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      ))}
    </div>
  </section>
);

export default RolesSection;
