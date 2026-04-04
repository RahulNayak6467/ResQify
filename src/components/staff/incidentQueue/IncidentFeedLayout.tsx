import IncidentFeed from "./incidentFeed";
import IncidentFeedHeader from "./topbar";

interface Incident {
  id: string;
  room: string;
  floor: string;
  title: string;
  desc: string;
  severity: Severity;
  type: IncidentType;
  aiTag: string;
  time: string;
  live?: boolean;
}

type Severity = "CRITICAL" | "MODERATE" | "RESOLVED";
type IncidentType = "MEDICAL" | "FIRE" | "SECURITY" | "MAINTENANCE";

const incidents: Incident[] = [
  {
    id: "#INC-2847",
    room: "ROOM 412",
    floor: "FLOOR 4",
    title: "Guest unresponsive — chest pain reported",
    desc: "Roommate called front desk. Guest collapsed, breathing irregular. AI: cardiac event.",
    severity: "CRITICAL",
    type: "MEDICAL",
    aiTag: "AI: 97% cardiac",
    time: "23:03 PM",
    live: true,
  },
  {
    id: "#INC-2846",
    room: "ROOM 207",
    floor: "FLOOR 2",
    title: "Smoke detected — guest evacuated",
    desc: "Burning smell from wall socket. Fire protocol activated. Sprinklers on standby.",
    severity: "CRITICAL",
    type: "FIRE",
    aiTag: "AI: 94% electrical fire",
    time: "22:58 PM",
    live: true,
  },
  {
    id: "#INC-2845",
    room: "FLOOR 3 HALLWAY",
    floor: "FLOOR 3",
    title: "Suspicious individual — threatening guest",
    desc: "Aggressive person in 3F corridor. Security dispatched. CCTV flagged.",
    severity: "MODERATE",
    type: "SECURITY",
    aiTag: "AI: 88% security threat",
    time: "22:51 PM",
    live: false,
  },
  {
    id: "#INC-2844",
    room: "ROOM 118",
    floor: "FLOOR 1",
    title: "Burst pipe — resolved",
    desc: "Maintenance resolved. Guest moved to room 120.",
    severity: "RESOLVED",
    type: "MAINTENANCE",
    aiTag: "AI: 99% pipe burst",
    time: "21:22 PM",
    live: false,
  },
];

function IncidentFeedLayout() {
  return (
    <section className="border-r border-border-strong h-screen">
      <IncidentFeedHeader />
      {incidents.map((incident) => (
        <IncidentFeed
          id={incident.id}
          room={incident.room}
          floor={incident.floor}
          title={incident.title}
          desc={incident.desc}
          severity={incident.severity}
          type={incident.type}
          aiTag={incident.aiTag}
          time={incident.time}
          live={incident.live}
        />
      ))}
    </section>
  );
}

export default IncidentFeedLayout;
