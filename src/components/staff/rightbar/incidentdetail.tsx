function IncidentDetail() {
  return (
    <div className="flex flex-col gap-2 p-4 pb-2 w-fit mx-auto border-b border-b-border-strong h-fit">
      <div>
        <h3 className="text-text-secondary  tracking-wider text-[10px] uppercase font-sans font-normal">
          Incident Detail
        </h3>
      </div>
      <div>
        <p className="text-text-primary font-semibold font-sans text-[16px]">
          Guest unresponsive — chest pain reported
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-text-primary brightness-70 px-3 py-0.5 bg-surface-raised border border-border-focus text-[11px] rounded-sm">
          #INC-2847
        </span>
        <span className="text-text-primary brightness-70 px-3 py-0.5  bg-surface-raised border border-border-focus text-[11px] rounded-sm">
          Room 412
        </span>
        <span className="text-critical bg-critical-muted py-0.5 border-2 border-critical-border px-3 uppercase text-[11px] font-sans rounded-sm">
          critical
        </span>
      </div>
    </div>
  );
}

export default IncidentDetail;
