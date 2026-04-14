interface IncidentTypeBreakdownProps {
  type: string;
  value: number;
  fill: string;
}

const IncidentTypeBreakdownValue = ({
  type,
  value,
  fill,
}: IncidentTypeBreakdownProps) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <div
          className="w-3 h-3 rounded-sm shrink-0"
          style={{ background: fill }}
        />
        <span className="font-mono text-sm text-text-secondary">{type}</span>
      </div>
      <span className="font-mono text-sm font-semibold" style={{ color: fill }}>
        {value}%
      </span>
    </div>
    <div className="h-1.5 bg-surface-raised rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{ width: `${value}%`, background: fill }}
      />
    </div>
  </div>
);

export default IncidentTypeBreakdownValue;
