import type { FC } from "react";

interface Team {
  name: string;
  status: string;
}

const statusColorMap: Record<string, string> = {
  DEPLOYED: "text-critical",
  STANDBY: "text-moderate",
  AVAIL: "text-resolved",
};

const dotColorMap: Record<string, string> = {
  DEPLOYED: "bg-critical",
  STANDBY: "bg-moderate",
  AVAIL: "bg-resolved",
};

const teams: Team[] = [
  { name: "Medical", status: "DEPLOYED" },
  { name: "Fire Safety", status: "STANDBY" },
  { name: "Security", status: "DEPLOYED" },
  { name: "Maintenance", status: "AVAIL" },
];

const TeamStatus: FC = () => (
  <div>
    <p className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mb-3">
      Team Status
    </p>

    <div className="flex flex-col">
      {teams.map(({ name, status }: Team) => (
        <div
          key={name}
          className="flex items-center justify-between px-4 py-1 border-b border-border last:border-b-0 "
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColorMap[status]}`}
            />
            <span className="font-mono text-[12px] text-text-secondary">
              {name}
            </span>
          </div>

          <div className="flex items-center text-[12px] gap-3">
            <span
              className={`font-mono text-[10px] opacity-70 font-semibold ${statusColorMap[status]}`}
            >
              {status}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TeamStatus;
