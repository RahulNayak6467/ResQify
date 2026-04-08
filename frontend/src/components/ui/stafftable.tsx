import type { FC } from "react";

type StaffRole = "STAFF" | "ADMIN";
type StaffStatus = "ONLINE" | "DEPLOYED" | "OFFLINE";

interface StaffMember {
  name: string;
  role: StaffRole;
  team: string;
  status: StaffStatus;
  incidentsToday: number | null;
}

const roleColorMap: Record<StaffRole, string> = {
  STAFF: "bg-accent-muted border-accent-border text-accent",
  ADMIN: "bg-admin-muted border-admin-border text-admin",
};

const statusColorMap: Record<StaffStatus, string> = {
  ONLINE: "text-resolved",
  DEPLOYED: "text-moderate",
  OFFLINE: "text-text-faint",
};

const statusDotMap: Record<StaffStatus, string> = {
  ONLINE: "bg-resolved",
  DEPLOYED: "bg-moderate",
  OFFLINE: "bg-text-faint",
};

const staffMembers: StaffMember[] = [
  {
    name: "Jaya Patel",
    role: "STAFF",
    team: "Medical",
    status: "ONLINE",
    incidentsToday: 4,
  },
  {
    name: "Ravi Kumar",
    role: "STAFF",
    team: "Fire Safety",
    status: "ONLINE",
    incidentsToday: 2,
  },
  {
    name: "Anita Singh",
    role: "STAFF",
    team: "Security",
    status: "DEPLOYED",
    incidentsToday: 1,
  },
  {
    name: "Rahul Sharma",
    role: "ADMIN",
    team: "All",
    status: "ONLINE",
    incidentsToday: null,
  },
];

const StaffTable: FC = () => (
  <div className="bg-surface border border-border rounded-lg overflow-hidden max-w-7xl mx-auto mt-12">
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
      <span className="font-mono text-xs font-semibold text-text-secondary uppercase tracking-widest">
        Staff Accounts
      </span>
      <button className="bg-admin-muted border border-admin-border text-admin font-mono text-xs px-3 py-1.5 rounded-md hover:opacity-80 transition-opacity">
        + Add Staff
      </button>
    </div>

    <div className="grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1.5fr_1fr] px-5 py-2.5 border-b border-border">
      {["NAME", "ROLE", "TEAM", "STATUS", "INCIDENTS TODAY", "ACTIONS"].map(
        (h) => (
          <span
            key={h}
            className="font-mono text-[10px] text-text-faint uppercase tracking-widest"
          >
            {h}
          </span>
        ),
      )}
    </div>

    {staffMembers.map(({ name, role, team, status, incidentsToday }, i) => (
      <div
        key={name}
        className={`grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1.5fr_1fr] items-center px-5 py-3 ${i !== staffMembers.length - 1 ? "border-b border-border" : ""}`}
      >
        <span className="font-mono text-sm font-semibold text-text-primary">
          {name}
        </span>

        <span
          className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded border w-fit uppercase tracking-wide ${roleColorMap[role]}`}
        >
          {role}
        </span>

        <span className="font-mono text-sm text-text-secondary">{team}</span>

        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${statusDotMap[status]}`} />
          <span
            className={`font-mono text-xs font-semibold ${statusColorMap[status]}`}
          >
            {status}
          </span>
        </div>

        <span className="font-mono text-sm text-text-primary">
          {incidentsToday ?? "—"}
        </span>

        <button className="font-mono text-xs text-text-secondary border border-border px-3 py-1 rounded-md w-fit hover:border-border-strong hover:text-text-primary transition-all">
          Edit
        </button>
      </div>
    ))}
  </div>
);

export default StaffTable;
