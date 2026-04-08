function Hero() {
  return (
    <div className="mx-auto max-w-7xl flex justify-center flex-col items-center gap-2 ">
      <p className="text-critical bg-critical-muted border border-critical-border px-4 w-fit text-xs rounded-full p-2 uppercase font-sans h-fit">
        <span className="mr-1"> ⚠ </span>
        Emergency
        <span className="ml-1.5">Reporting</span>
      </p>
      <div>
        <h1 className="font-sans font-extrabold text-4xl text-center  text-text-primary tracking">
          Report an
        </h1>

        <h1 className="font-syne  font-extrabold text-4xl text-center tracking-normal text-critical">
          Incident
        </h1>
        <p className="mt-2 font-mono text-text-secondary text-xs w-90 text-center [word-spacing:2px] opacity-65">
          Describe what's happening — our AI will route help to you immediately.
        </p>
      </div>
    </div>
  );
}

export default Hero;
