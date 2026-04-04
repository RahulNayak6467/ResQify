interface FloorAlert {
  label: string;
  count: number;
  color: string;
}

const floorAlerts: FloorAlert[] = [
  { label: "Floor 4 — Room 412", count: 1, color: "#ff3b3b" },
  { label: "Floor 2 — Room 207", count: 1, color: "#ff3b3b" },
  { label: "Floor 3 — Hallway", count: 1, color: "#ffaa00" },
];

function FloorIncident() {
  return (
    <div>
      <h3 className="text-text-secondary uppercase text-[10px] font-mono tracking-wide mb-1">
        floors
      </h3>
      {floorAlerts.map((floor) => (
        <div
          key={floor.label}
          className="flex justify-between text-xs items-center hover:bg-surface-raised rounded-md transition-all cursor-pointer px-4 py-2 "
        >
          <div className="flex items-center gap-4">
            <p
              style={{ backgroundColor: floor.color }}
              className="h-1.5 w-1.5 rounded-full"
            ></p>
            <p className="text-text-secondary font-mono">{floor.label}</p>
          </div>
          <p
            style={{
              color: floor.color,
            }}
            className="text-critical px-2 rounded-md"
          >
            {floor.count}
          </p>
        </div>
      ))}
    </div>
  );
}

export default FloorIncident;
