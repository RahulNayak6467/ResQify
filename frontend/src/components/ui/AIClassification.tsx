import { useEffect, useState, type FC } from "react";
import { getAiSuggestions } from "../../lib/queris";
import { formatTime } from "../../lib/utils";
import AISidebar from "../admin/aisidebar";
import AIStatsStrip from "../admin/aiDashboard";
// import { Pagination } from "./pagination";
import PaginationStaff from "../staff/incidentQueue/pagination";

type LogType =
  | " MAINTENANCE"
  | "FIRE"
  | "SECURITY"
  | "MAINT"
  | "ACCESS"
  | "MEDICAL";

interface LogEntry {
  time: string;
  type: LogType;
  message: string;
  confidence: number;
}

const logTypeColorMap: Record<LogType, string> = {
  MAINTENANCE: "text-moderate",
  FIRE: "text-critical",
  SECURITY: "text-accent",
  MAINT: "text-resolved",
  ACCESS: "text-resolved",
  MEDICAL: "text-critical",
};

const confidenceColor = (val: number) => {
  if (val >= 80) return "text-resolved";
  if (val >= 60) return "text-moderate";
  return "text-critical";
};

// const logEntries: LogEntry[] = [
//   {
//     time: "23:03:13",
//     type: "CARDIAC",
//     message:
//       "Room 412 — unresponsive guest, irregular breathing, chest pain reported by roommate",
//     confidence: 97,
//   },
//   {
//     time: "22:58:02",
//     type: "FIRE",
//     message:
//       "Room 207 — electrical burning smell from wall socket, smoke visible",
//     confidence: 94,
//   },
//   {
//     time: "22:51:44",
//     type: "SECURITY",
//     message:
//       "Floor 3 hallway — threatening behaviour, guest confrontation, verbal abuse reported",
//     confidence: 88,
//   },
//   {
//     time: "21:22:11",
//     type: "MAINT",
//     message: "Room 118 — burst pipe, water accumulation on bathroom floor",
//     confidence: 99,
//   },
//   {
//     time: "20:45:33",
//     type: "ACCESS",
//     message: "Room 305 — keycard malfunction, guest locked out of room",
//     confidence: 100,
//   },
//   {
//     time: "19:12:08",
//     type: "MEDICAL",
//     message:
//       "Room 214 — guest reports severe allergic reaction, difficulty breathing",
//     confidence: 96,
//   },
//   {
//     time: "18:34:51",
//     type: "FIRE",
//     message:
//       "Room 509 — guest accidentally triggered smoke alarm cooking, no actual fire",
//     confidence: 72,
//   },
// ];

const AIClassificationLog = () => {
  const [page, setPage] = useState(0);
  const handlePage = (id: number) => {
    setPage(id);
  };
  const [logEntries, setLogEntries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAiSuggestions();
      console.log(data);
      const requiredData = data.map((data) => {
        return {
          time: formatTime(data.created_at, 0, false),
          type: data.emergency_team,
          message: data.one_line_summary,
          confidence: data.ai_confidence,
        };
      });
      console.log(requiredData);
      setLogEntries(requiredData);
    };
    fetchData();
  }, []);
  return (
    <section className="flex flex-col gap-8  bg-base-raised/40 border border-border rounded-b-lg rounded-0 overflow-hidden max-w-[1400px] mx-auto  p-8 ">
      <AIStatsStrip />

      <div className="flex gap-8">
        <div className="w-[70%]  bg-base-raised border-border border p-4 rounded-xl">
          <div className="flex items-center  px-5 py-2 border-b border-border">
            <span className="font-mono text-xs font-semibold text-text-secondary uppercase tracking-widest">
              AI Classification Log — Today
            </span>
            <PaginationStaff
              currentPage={10}
              totalPages={10}
              handlePage={handlePage}
            />
          </div>
          {logEntries
            .slice(0, 15)
            .map(({ time, type, message, confidence }, i) => (
              <div
                key={i}
                className={`flex  bg-base-raised items-center gap-6 px-5 py-3 font-mono text-xs ${i !== logEntries.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="text-text-faint flex-shrink-0 w-16">
                  {time}
                </span>
                <span
                  className={`font-semibold flex-shrink-0 w-16 ${logTypeColorMap[type.toUpperCase()]}`}
                >
                  {" "}
                  {type}
                </span>
                <span className="text-text-primary font-mono  flex-1 line-clamp-1">
                  {message}
                </span>
                <span
                  className={`flex-shrink-0 font-semibold ${confidenceColor(confidence)}`}
                >
                  {confidence}%
                </span>
              </div>
            ))}
        </div>
        <div className="w-[30%]">
          <AISidebar />
        </div>
      </div>
    </section>
  );
};

export default AIClassificationLog;
