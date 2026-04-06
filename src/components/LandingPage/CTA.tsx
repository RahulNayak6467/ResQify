import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-base relative overflow-hidden">
      {/* background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[300px] rounded-full
                        bg-resolved opacity-[0.04] blur-[80px]"
        />
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[200px]
                        rounded-full bg-critical opacity-[0.04] blur-[80px]"
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[200px]
                        rounded-full bg-accent opacity-[0.03] blur-[80px]"
        />
      </div>

      {/* CTA content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center
                      text-center px-6 py-32"
      >
        {/* eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-resolved" />
          <span
            className="font-mono text-xs font-semibold text-resolved
                           uppercase tracking-widest"
          >
            Get Started
          </span>
          <div className="w-8 h-px bg-resolved" />
        </div>

        {/* heading */}
        <h2
          className="font-serif font-bold text-6xl bg-gradient-to-r from-resolved to-accent pb-2 bg-clip-text text-transparent
                       leading-tight tracking-tight mb-6 max-w-2xl"
        >
          Ready to Make Your
          <br />
          Hotel Safer?
        </h2>

        {/* subtext */}
        <p
          className="font-sans text-base text-text-secondary leading-relaxed
                      max-w-md mb-10"
        >
          Deploy ResQify in minutes. No hardware required. Just plug in and
          protect.
        </p>

        {/* CTA button */}
        <button
          onClick={() => navigate("/register")}
          className="bg-resolved text-[#07090d] font-sans font-bold
                     text-base px-10 py-4 rounded-xl
                     hover:opacity-90 hover:-translate-y-0.5
                     transition-all duration-200 active:translate-y-0
                     shadow-[0_4px_24px_rgba(0,217,126,0.25)]
                     hover:shadow-[0_8px_32px_rgba(0,217,126,0.35)]"
        >
          Start Free Trial
        </button>
      </div>

      {/* footer */}
      <div className="relative z-10 border-t border-border py-6 text-center">
        <p className="font-sans text-sm text-text-faint">
          Built with care by{" "}
          <span className="text-resolved font-semibold">ResQify</span> —
          Protecting guests, empowering staff.
        </p>
        <p className="font-sans text-xs text-text-faint mt-1">
          © 2026 ResQify. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
