import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
// import { useAuthContext } from "../../context/AuthProvider";

type Role = "guest" | "staff" | "admin";

const roles: { id: Role; icon: string; label: string }[] = [
  { id: "guest", icon: "🏨", label: "GUEST" },
  { id: "staff", icon: "👮", label: "STAFF" },
  { id: "admin", icon: "⚙️", label: "ADMIN" },
];

const Login = () => {
  const [role, setRole] = useState<Role>("guest");
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();

  const onSubmit = async (userData: { email: string; password: string }) => {
    const userInfo = {
      email: userData.email,
      password: userData.password,
      role,
    };

    await signIn(userInfo.email, userInfo.password, role);
  };

  return (
    <div className=" bg-base flex items-center h-full justify-center z-100">
      <div
        className=" bg-surface border-r border-border rounded-r-2xl w-[500px]
                       p-6 shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
      >
        {/* heading */}
        <h1
          className="font-sans font-bold text-3xl text-text-primary
                       tracking-tight leading-tight mb-2"
        >
          Welcome back
        </h1>
        <p className="font-mono text-xs text-text-secondary mb-8">
          Sign in to access your ResQify dashboard
        </p>

        {/* role selector */}
        <div
          className="grid grid-cols-3 gap-0 bg-surface-raised border
                        border-border rounded-xl p-1 mb-7"
        >
          {roles.map(({ id, icon, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setRole(id)}
              className={`
                flex flex-col items-center justify-center gap-1.5
                py-3.5 px-2 rounded-lg border border-border-focus transition-all duration-150
                font-mono text-[10px] tracking-widest
                ${
                  role === id
                    ? "bg-surface border-border border text-text-primary shadow-md"
                    : "bg-transparent border-transparent text-text-secondary hover:bg-surface"
                }
              `}
            >
              <span className="text-xl leading-none">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* hotel code */}
          <div className="mb-4">
            <label
              className="font-mono text-[10px] text-text-secondary
                              uppercase tracking-widest block mb-2"
            >
              Hotel Code
            </label>
            <div
              className="flex items-stretch bg-surface-raised border
                            border-border rounded-xl overflow-hidden
                            focus-within:border-critical transition-colors"
            >
              <span
                className="font-mono text-xs text-text-secondary
                               bg-surface px-4 flex items-center
                               border-r border-border2 flex-shrink-0
                               tracking-widest"
              >
                RQ —
              </span>
              <input
                type="text"
                placeholder="GRAND-MUMBAI-01"
                className="flex-1 bg-transparent px-4 py-3 font-mono
                           text-sm text-text-primary outline-none
                           placeholder:text-text-faint"
              />
            </div>
          </div>

          {/* email */}
          <div className="mb-4">
            <label
              className="font-mono text-[10px] text-text-secondary
                              uppercase tracking-widest block mb-2"
            >
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="jpatel@grandmumbai.com"
              className="w-full bg-surface-raised border border-border
                         rounded-xl px-4 py-3 font-mono text-sm
                         text-text-primary outline-none
                         placeholder:text-text-faint
                         focus:border-critical transition-colors"
            />
          </div>

          {/* password */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-2">
              <label
                className="font-mono text-[10px] text-text-secondary
                                uppercase tracking-widest"
              >
                Password
              </label>
              <button
                type="button"
                className="font-mono text-[11px] text-critical hover:underline"
              >
                Forgot?
              </button>
            </div>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••••••"
              className="w-full bg-surface-raised border border-border
                         rounded-xl px-4 py-3 font-mono text-sm
                         text-text-primary outline-none
                         placeholder:text-text-faint
                         focus:border-critical transition-colors"
            />
          </div>

          {/* submit */}
          <button
            type="submit"
            className="w-full bg-critical text-white font-mono font-semibold
                       text-sm tracking-widest rounded-xl py-4 mt-6
                       flex items-center justify-center gap-2
                       hover:bg-[#e82020] hover:-translate-y-0.5
                       shadow-[0_4px_16px_rgba(255,59,59,0.25)]
                       hover:shadow-[0_8px_24px_rgba(255,59,59,0.35)]
                       transition-all duration-200 active:translate-y-0 cursor-pointer "
          >
            Sign in
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
        </form>

        {/* footer */}
        <p className="text-center font-mono text-xs text-text-secondary mt-5">
          No account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-critical hover:underline transition-all cursor-pointer"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
