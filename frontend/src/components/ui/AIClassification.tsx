import { useEffect, useState } from "react";
import { getAiSuggestions } from "../../lib/queris";
import { formatTime } from "../../lib/utils";
import AISidebar from "../admin/aisidebar";
import AIStatsStrip from "../admin/aiDashboard";
import PaginationStaff from "../staff/incidentQueue/pagination";

interface LogEntry {
  time: string;
  type: string;
  message: string;
  confidence: number;
}

const logTypeColorMap: Record<string, string> = {
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

const ITEMS_PER_PAGE = 15;

const AIClassificationLog = () => {
  const [page, setPage] = useState(0);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getAiSuggestions();
      const requiredData = data.map((entry) => ({
        time: formatTime(entry.created_at, 0, false),
        type: entry.emergency_team,
        message: entry.one_line_summary,
        confidence: entry.ai_confidence,
      }));
      setLogEntries(requiredData);
      setPage(0);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(logEntries.length / ITEMS_PER_PAGE);
  const pageEntries = logEntries.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  return (
    <section className="flex flex-col gap-8  bg-base-raised/40 border border-border rounded-b-lg rounded-0 overflow-hidden max-w-[1400px] mx-auto  p-8 ">
      <AIStatsStrip />

      <div className="flex gap-8">
        <div className="w-[70%]  bg-base-raised border-border border p-4 rounded-xl">
          <div className="flex items-center  px-5 py-2 border-b border-border">
            <span className="font-mono text-xs font-semibold text-text-secondary uppercase tracking-widest">
              AI Classification Log — This Week
            </span>
            <PaginationStaff
              currentPage={page}
              totalPages={totalPages}
              handlePage={setPage}
            />
          </div>
          {isLoading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 px-5 py-3 border-b border-border"
                >
                  <div className="w-16 h-3 bg-surface-raised rounded animate-pulse shrink-0" />
                  <div className="w-16 h-3 bg-surface-raised rounded animate-pulse shrink-0" />
                  <div className="flex-1 h-3 bg-surface-raised rounded animate-pulse" />
                  <div className="w-10 h-3 bg-surface-raised rounded animate-pulse shrink-0" />
                </div>
              ))
            : pageEntries.map(({ time, type, message, confidence }, i) => (
                <div
                  key={i}
                  className={`flex bg-base-raised items-center gap-6 px-5 py-3 font-mono text-xs ${i !== pageEntries.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="text-text-faint shrink-0 w-16">{time}</span>
                  <span
                    className={`font-semibold shrink-0 w-16 ${logTypeColorMap[type?.toUpperCase()] ?? "text-text-secondary"}`}
                  >
                    {type}
                  </span>
                  <span className="text-text-primary font-mono flex-1 line-clamp-1">
                    {message}
                  </span>
                  <span
                    className={`shrink-0 font-semibold ${confidenceColor(confidence)}`}
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
