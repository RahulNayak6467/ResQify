import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Loader from "../../ui/Loader";
import IncidentFeed from "./incidentFeed";
import IncidentFeedHeader from "./topbar";
import { useStaff } from "../../../context/staffContext";

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

const formatTime = (isoString: string): string => {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Usage
// "03:09 PM"

function IncidentFeedLayout() {
  //   const { isLoading } = useAuth();
  //   const [page, setPage] = useState(0);
  //   const [totalPages, setTotalPages] = useState(0);
  //   const handlePage = (id: number) => {
  //     setPage(() => id);
  //   };

  //   const [incident, setIncident] = useState<any[]>([]);
  const {
    page,
    handlePage,
    incident,
    totalPages,
    setSelectedIncident,
    setIncident,
  } = useStaff();
  const [incidentCategory, setIncidentCategory] = useState("ALL");
  const handleCategory = (category: string) => {
    setIncidentCategory(category);
  };
  console.log(incidentCategory);

  let incidentCategoryData = [...incident];
  if (incidentCategory !== "ALL") {
    incidentCategoryData = incident.filter(
      (inc) => inc.incident_severity.toUpperCase() === incidentCategory,
    );
  } else {
    incidentCategoryData = incident;
  }
  console.log(incidentCategory);
  console.log(incidentCategoryData);
  //   const [incident, SetIncident] = useState<any[]>([]);
  //   //   const handleTableResponse = async () => {
  //   //     const getIncidentDataResponse = await getIncidentData();
  //   //     const geyAiDataResponse = await getAiData();
  //   //   };
  //   useEffect(() => {
  //     const handleTableResponse = async () => {
  //       const incidentData = await getIncidentsData(page);

  //       console.log("Incident Data", incidentData);
  //       setIncident(incidentData);
  //       //   setTotalPages(incidentData.count);
  //     };
  //     handleTableResponse();
  //   }, [page]);

  //   if (isLoading) {
  //     return (
  //       <Loader fullscreen bg="mesh" variant="orbital" text="Fetching Data" />
  //     );
  //   }

  console.log(page);
  console.log(incident);

  console.log(incident);

  return (
    <section className="border-r border-border-strong h-screen">
      <IncidentFeedHeader
        handleCategory={handleCategory}
        page={page}
        handlePage={handlePage}
        totalPages={totalPages}
      />
      {incidentCategoryData.map((incident) => (
        <IncidentFeed
          key={incident.id}
          id={incident.INC_code}
          room={incident.room_number}
          floor={incident.room_number}
          title={incident?.aiclassification?.ai_summary}
          desc={incident?.aiclassification?.ai_suggestions}
          severity={incident.incident_severity}
          type={incident?.aiclassification?.emergency_team}
          aiTag={incident?.aiclassification?.crisp ?? "Critical"}
          time={formatTime(incident.created_at)}
          live={incident.incident_severity !== "resolved"}
          confidence={incident?.aiclassification?.ai_confidence}
          oneLineSummary={
            incident?.aiclassification?.one_line_summary ?? "Hello"
          }
          onClick={() => setSelectedIncident(incident)}
        />
      ))}
    </section>
  );
}

export default IncidentFeedLayout;
