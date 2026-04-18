import { useEffect, useState, type FC } from "react";
import { getStaff } from "../../lib/queris";
import Loader from "./Loader";
import AIStatsStrip from "../admin/aiDashboard";
import StaffPerformance from "../admin/weeklyIncidents";

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

const StaffTable = () => {
  const [staffData, setStaffData] = useState([]);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      setIsloading(true);
      const data = await getStaff();
      setIsloading(false);
      const requiredData = data.map((staff) => {
        return {
          name: `${staff.first_name} ${staff.last_name}`,
          role: staff.role,
          team: staff.team_category ?? "ALL",
          status: staff.staff_status ?? "Online",
          incidents: staff.incident_resolved,
        };
      });
      setStaffData(requiredData);
    };
    fetchStaff();
  }, []);

  if (isloading) {
    return (
      <Loader fullscreen bg="mesh" variant="orbital" text="Fetching Data" />
    );
  }

  console.log(staffData);
  return (
    <div className="bg-base-raised/40 border border-border p-8   border-t-0 rounded-t-0 rounded-b-2xl overflow-hidden max-w-[1400px] mx-auto ">
      <StaffPerformance />
      <div className="border bg-base-raised border-border rounded-t-xl p-4 rounded-b-xl">
        <div className="flex items-center bg-base-raised justify-between px-5 pb-1 border-b rounded-t-xl  border-border">
          <span className="font-mono text-xs font-semibold text-text-secondary uppercase tracking-widest">
            Staff Accounts
          </span>
          <button className="bg-admin-muted border border-admin-border text-admin font-mono text-xs px-3 py-1.5 rounded-md hover:opacity-80 transition-opacity">
            + Add Staff
          </button>
        </div>

        <div className="grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1.5fr] bg-base-raised   px-5 py-2.5 border-b border-border">
          {["NAME", "ROLE", "TEAM", "STATUS", "INCIDENTS TODAY"].map((h) => (
            <span
              key={h}
              className="font-mono text-[10px] text-text-faint uppercase tracking-widest"
            >
              {h}
            </span>
          ))}
        </div>

        {staffData.map(({ name, role, team, status, incidents }, i) => (
          <div
            key={name}
            className={`grid grid-cols-[2fr_1fr_1.5fr_1.5fr_1.5fr] bg-base-raised   items-center px-5 py-3 ${i !== staffMembers.length - 1 ? "border-b  border-border" : " "}`}
          >
            <span className="font-mono text-sm font-semibold text-text-primary">
              {name.toUpperCase()}
            </span>

            <span
              className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded border w-fit uppercase tracking-wide ${roleColorMap[role.toUpperCase()]}`}
            >
              {role}
            </span>

            <span className="font-mono text-sm text-text-secondary">
              {team}
            </span>

            <div className="flex items-center  gap-2">
              <div
                className={`w-1.5 h-1.5 rounded-full ${statusDotMap[status.toUpperCase()]}`}
              />
              <span
                className={`font-mono ml-5 text-xs font-semibold ${statusColorMap[status.toUpperCase()]}`}
              >
                {status}
              </span>
            </div>

            <span className="font-mono text-sm text-text-primary">
              {role === "staff" ? incidents : "___"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffTable;
