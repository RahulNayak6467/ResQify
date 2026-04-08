import type { FC } from "react";

type LogType = "CARDIAC" | "FIRE" | "SECURITY" | "MAINT" | "ACCESS" | "MEDICAL";

interface LogEntry {
  time: string;
  type: LogType;
  message: string;
  confidence: number;
}

const logTypeColorMap: Record<LogType, string> = {
  CARDIAC: "text-critical",
  FIRE: "text-moderate",
  SECURITY: "text-text-secondary",
  MAINT: "text-resolved",
  ACCESS: "text-resolved",
  MEDICAL: "text-critical",
};

const confidenceColor = (val: number) => {
  if (val >= 95) return "text-resolved";
  if (val >= 85) return "text-moderate";
  return "text-critical";
};

const logEntries: LogEntry[] = [
  {
    time: "23:03:13",
    type: "CARDIAC",
    message:
      "Room 412 — unresponsive guest, irregular breathing, chest pain reported by roommate",
    confidence: 97,
  },
  {
    time: "22:58:02",
    type: "FIRE",
    message:
      "Room 207 — electrical burning smell from wall socket, smoke visible",
    confidence: 94,
  },
  {
    time: "22:51:44",
    type: "SECURITY",
    message:
      "Floor 3 hallway — threatening behaviour, guest confrontation, verbal abuse reported",
    confidence: 88,
  },
  {
    time: "21:22:11",
    type: "MAINT",
    message: "Room 118 — burst pipe, water accumulation on bathroom floor",
    confidence: 99,
  },
  {
    time: "20:45:33",
    type: "ACCESS",
    message: "Room 305 — keycard malfunction, guest locked out of room",
    confidence: 100,
  },
  {
    time: "19:12:08",
    type: "MEDICAL",
    message:
      "Room 214 — guest reports severe allergic reaction, difficulty breathing",
    confidence: 96,
  },
  {
    time: "18:34:51",
    type: "FIRE",
    message:
      "Room 509 — guest accidentally triggered smoke alarm cooking, no actual fire",
    confidence: 72,
  },
];

const AIClassificationLog: FC = () => (
  <div className="bg-surface border border-border rounded-lg overflow-hidden max-w-7xl mx-auto mt-12">
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
      <span className="font-mono text-xs font-semibold text-text-secondary uppercase tracking-widest">
        AI Classification Log — Today
      </span>
      <span className="font-mono text-xs text-text-faint">
        147 entries · Model: claude-haiku
      </span>
    </div>

    {logEntries.map(({ time, type, message, confidence }, i) => (
      <div
        key={i}
        className={`flex items-center gap-6 px-5 py-3 font-mono text-xs ${i !== logEntries.length - 1 ? "border-b border-border" : ""}`}
      >
        <span className="text-text-faint flex-shrink-0 w-16">{time}</span>
        <span
          className={`font-semibold flex-shrink-0 w-16 ${logTypeColorMap[type]}`}
        >
          {type}
        </span>
        <span className="text-text-secondary flex-1">{message}</span>
        <span
          className={`flex-shrink-0 font-semibold ${confidenceColor(confidence)}`}
        >
          {confidence}%
        </span>
      </div>
    ))}
  </div>
);

export default AIClassificationLog;
