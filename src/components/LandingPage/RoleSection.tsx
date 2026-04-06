import { User, FileText, Monitor } from "lucide-react";

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

const RolesSection = () => (
  <section className="max-w-7xl mx-auto bg-base mt-24 px-16 py-24">
    {/* heading */}
    <div className="text-center mb-16">
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
    </div>

    {/* cards */}
    <div className="grid grid-cols-3 gap-5">
      {roles.map(({ icon: Icon, iconBg, iconColor, title, desc, features }) => (
        <div
          key={title}
          className="bg-surface border border-border rounded-2xl p-7
                     flex flex-col gap-5 hover:border-border2
                     transition-colors duration-200 relative z-100"
        >
          {/* icon */}
          <div
            className={`w-14 h-14 rounded-xl ${iconBg} flex items-center
                           justify-center flex-shrink-0`}
          >
            <Icon size={24} className={iconColor} />
          </div>

          {/* title + desc */}
          <div>
            <h3
              className="font-sans font-bold text-lg text-text-primary
                           leading-tight mb-2"
            >
              {title}
            </h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              {desc}
            </p>
          </div>

          {/* feature list */}
          <ul className="flex flex-col gap-2.5">
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
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default RolesSection;
