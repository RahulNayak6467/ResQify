import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Role = "guest" | "staff" | "admin";

const roles: { id: Role; icon: string; label: string; desc: string }[] = [
  {
    id: "guest",
    icon: "🏨",
    label: "Guest",
    desc: "Report emergencies from your room",
  },
  {
    id: "staff",
    icon: "👮",
    label: "Staff",
    desc: "Manage and respond to incidents",
  },
  {
    id: "admin",
    icon: "⚙️",
    label: "Admin",
    desc: "Full system access and analytics",
  },
];

function RegisterForm() {
  const [role, setRole] = useState<Role>("admin");
  const navigate = useNavigate();

  return (
    <div className="max-w-[800px] p-6 px-10 border border-border-focus bg-base-raised rounded-r-2xl">
      <div>
        <h3 className="text-white text-lg font-sans font-medium tracking-normal">
          Create your account
        </h3>
        <p className="text-text-secondary brightness-125 font-sans text-xs font-medium tracking-wide mt-2 mb-2">
          Select your role to get started
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-7">
        {roles.map(({ id, icon, label, desc }) => (
          <button
            key={id}
            type="button"
            onClick={() => setRole(id)}
            className={`
              flex flex-col items-center justify-center gap-2
              py-6 px-4 rounded-xl border text-center
              transition-all duration-150 cursor-pointer
              ${
                role === id
                  ? "bg-critical-muted border-critical"
                  : "bg-surface border-border hover:border-border-strong  hover:bg-surface-raised"
              }
            `}
          >
            <span className="text-2xl leading-none">{icon}</span>
            <span
              className={`font-sans font-semibold text-sm ${
                role === id ? "text-critical" : "text-text-primary"
              }`}
            >
              {label}
            </span>
            <span className="font-mono text-[10px] text-text-faint leading-relaxed">
              {desc}
            </span>
          </button>
        ))}
      </div>

      <form>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
              First Name
            </label>
            <input
              type="text"
              placeholder="Jaya"
              className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
            />
          </div>

          <div>
            <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Patel"
              className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="jpatel@grandmumbai.com"
            className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
            />
          </div>

          <div>
            <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
            Hotel Code
          </label>
          <div className="flex items-stretch bg-surface-raised border border-border rounded-xl overflow-hidden focus-within:border-critical transition-colors">
            <span className="font-mono text-xs text-text-secondary bg-surface px-4 flex items-center border-r border-border2 flex-shrink-0 tracking-widest">
              RQ —
            </span>
            <input
              type="text"
              placeholder="GRAND-MUMBAI-01"
              className="flex-1 bg-transparent px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-5">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to login
          </button>

          <button
            type="submit"
            className="bg-critical text-white font-mono font-semibold text-sm tracking-widest rounded-xl py-3.5 px-8 flex items-center gap-2 hover:bg-[#e82020] hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(255,59,59,0.25)] hover:shadow-[0_8px_24px_rgba(255,59,59,0.35)] transition-all duration-200 active:translate-y-0"
          >
            Create account
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <p className="text-center font-mono text-xs text-text-secondary">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-critical hover:underline"
          >
            Sign in here
          </button>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
