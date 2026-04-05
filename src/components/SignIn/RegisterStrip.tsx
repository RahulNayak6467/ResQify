import ResQifyLogo from "../ui/ResqifyIcon";

const steps = [
  { n: 1, label: "Choose role", hint: "Guest, Staff or Admin" },
  { n: 2, label: "Account details", hint: "Name, email, password" },
  { n: 3, label: "Hotel code", hint: "Link to your property" },
  { n: 4, label: "Access granted", hint: "You're all set" },
];

const RegisterStrip = () => (
  <div
    className="w-[400px]  h-full bg-surface
                  border-2 border-border-strong flex flex-col
                  justify-between p-8 rounded-l-2xl "
  >
    <div>
      {/* logo */}
      <div className="flex items-center  mb-10">
        <ResQifyLogo className="w-10 h-10" />
        <span className="font-sans font-bold text-xl tracking-tight">
          <span className="text-critical">ResQ</span>
          <span className="text-text-primary">ify</span>
        </span>
      </div>

      {/* label */}
      <p
        className="font-mono text-[10px] text-text-faint uppercase
                    tracking-widest mb-6"
      >
        Registration Steps
      </p>

      {/* steps */}
      <div className="flex flex-col">
        {steps.map(({ n, label, hint }, i) => (
          <div key={n} className="flex gap-4 relative pb-8 last:pb-0">
            {/* connector */}
            {i !== steps.length - 1 && (
              <div
                className="absolute left-[13px] top-7 bottom-0
                              w-px bg-border-focus"
              />
            )}

            {/* dot */}
            <div
              className={`
              w-7 h-7 rounded-full flex-shrink-0 z-10
              flex items-center justify-center
              font-mono text-xs font-semibold
              border-[1.5px] transition-all

              ${
                n === 1
                  ? "bg-critical-muted border-critical text-critical"
                  : "bg-base border-border text-text-faint"
              }
            `}
            >
              {n}
            </div>

            {/* content */}
            <div className="pt-0.5">
              <p
                className={`
                font-mono text-sm font-semibold mb-1
                ${n === 1 ? "text-critical" : "text-text-primary"}
              `}
              >
                {label}
              </p>
              <p className="font-mono text-xs text-text-faint leading-relaxed">
                {hint}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* bottom note */}
    <div className="border-t border-border pt-5">
      <p className="font-mono text-[10px] text-text-faint leading-relaxed">
        Staff and Admin accounts require hotel code verification before
        activation.
      </p>
    </div>
  </div>
);

export default RegisterStrip;
