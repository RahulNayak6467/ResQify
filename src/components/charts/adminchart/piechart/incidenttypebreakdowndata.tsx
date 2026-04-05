interface incidentTypeBreakdownProps {
  type: string;
  value: number;
  fill: string;
}

const IncidentTypeBreakdown = ({
  data,
}: {
  data: incidentTypeBreakdownProps[];
}) => (
  <div className="flex flex-col gap-3">
    {data.map(({ type, value, fill }) => (
      <div key={type}>
        {/* label row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ background: fill }}
            />
            <span className="font-mono text-sm text-text-secondary">
              {type}
            </span>
          </div>
          <span className="font-mono text-sm font-semibold" style={{ fill }}>
            {value}%
          </span>
        </div>

        {/* bar */}
        <div className="h-1.5 bg-surface-raised rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${value}%`, background: fill }}
          />
        </div>
      </div>
    ))}
  </div>
);

export default IncidentTypeBreakdown;
