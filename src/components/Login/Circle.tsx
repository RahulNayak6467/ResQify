function Circle() {
  return (
    <div className="absolute w-full h-fit inset-0 top-62  flex items-center  justify-center pointer-events-none overflow-hidden">
      <div className="relative flex items-center   justify-center  w-96 h-96 ">
        <div className="absolute w-96 h-96 rounded-full border border-critical opacity-[0.05]" />
        <div className="absolute w-72 h-72 rounded-full border border-critical opacity-[0.08]" />
        <div className="absolute w-52 h-52 rounded-full border border-critical opacity-[0.12]" />
        <div className="absolute w-36 h-36 rounded-full border border-critical opacity-[0.18]" />

        <div className="absolute w-full h-full rounded-full animate-[spin_4s_linear_infinite]"></div>
        <div
          className="absolute w-full h-full rounded-full
                    animate-[spin_4s_linear_infinite]"
        >
          <div
            className="absolute top-0 left-0 w-full h-full rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 270deg, rgba(255,59,59,0.12) 360deg)",
            }}
          />
        </div>

        <div
          className="absolute w-2 h-2 rounded-full bg-critical
                    opacity-0 animate-blink [animation-delay:0.4s]"
          style={{ top: "25%", left: "65%" }}
        />
        <div
          className="absolute w-2 h-2 rounded-full bg-critical
                    opacity-0 animate-blink [animation-delay:0.4s]"
          style={{ top: "15%", left: "25%" }}
        />
        <div
          className="absolute w-2 h-2 rounded-full bg-critical
                    opacity-0 animate-blink [animation-delay:0.4s]"
          style={{ top: "35%", left: "25%" }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-critical
                    opacity-0 animate-blink [animation-delay:1.8s]"
          style={{ top: "60%", left: "28%" }}
        />
        <div
          className="absolute w-2 h-2 rounded-full bg-critical
                    opacity-0 animate-blink [animation-delay:2.9s]"
          style={{ top: "38%", left: "42%" }}
        />

        <div
          className="relative z-10 w-10 h-10 rounded-full bg-critical-muted
                    border border-critical-border flex items-center justify-center"
        >
          <div className="absolute w-5 h-px bg-critical" />
          <div className="absolute w-px h-5 bg-critical" />
        </div>
      </div>
    </div>
  );
}

export default Circle;
