function Analysis() {
  return (
    <div className="p-4 mx-7 bg-accent-muted border border-accent-border   rounded-sm mt-4">
      <h3 className="text-sm text-accent font-sans tracking-widest">
        ⬡ AI ANALYSIS
      </h3>
      <div className="flex flex-col gap-1 mt-2">
        <div className="flex justify-between border-b border-b-border">
          <p className="text-[12px] font-mono tracking-wide font-normal  text-text-primary brightness-70">
            Classifiation
          </p>
          <p className="text-[12px] text-accent font-sans font-light">
            Cardiac Event
          </p>
        </div>
        <div className="flex justify-between  border-b border-b-border">
          <p className="text-[12px] font-mono tracking-wide font-normal  text-text-primary brightness-70">
            Confidence
          </p>
          <div className="flex gap-1 items-center">
            <span className="w-20 bg-accent h-1 rounded-full"></span>
            <p className="text-[12px] text-accent font-mono font-normal">97%</p>
          </div>
        </div>
        <div className="flex justify-between  border-b border-b-border">
          <p className="text-[12px] font-mono tracking-wide font-normal  text-text-primary brightness-70">
            Severity
          </p>
          <p className="text-[12px] text-critical font-mono font-normal">
            Critical
          </p>
        </div>
        <div className="flex justify-between  border-b border-b-border">
          <p className="text-[12px] font-mono tracking-wide font-normal  text-text-primary brightness-70">
            Recommended
          </p>
          <p className="text-[12px] text-text-primary font-sans font-light">
            Medical + AED
          </p>
        </div>
        <div className="flex justify-between  border-b border-b-border">
          <p className="text-[12px] font-mono tracking-wide font-normal  text-text-primary brightness-70">
            Classified in
          </p>
          <p className="text-[12px] text-resolved font-sans font-light">1.1s</p>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
