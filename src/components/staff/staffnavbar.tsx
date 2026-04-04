import type { FC } from "react";
import { useEffect, useState } from "react";

const StaffTopbar: FC = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        String(now.getHours()).padStart(2, "0") +
          ":" +
          String(now.getMinutes()).padStart(2, "0") +
          ":" +
          String(now.getSeconds()).padStart(2, "0"),
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-5 h-[50px] bg-surface border-b-2 border-t-2  border-border sticky top-0 z-50">
      {/* left */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-accent rounded-md flex items-center justify-center font-mono text-[10px] font-bold text-white flex-shrink-0">
            SS
          </div>
          <span className="font-mono text-sm font-semibold text-text-primary tracking-wide">
            SAFESTAY / STAFF OPS
          </span>
        </div>

        <div className="flex items-center gap-2 border-l border-border2 pl-4">
          <div className="w-1.5 h-1.5 rounded-full bg-resolved animate-blink" />
          <span className="font-mono text-xs text-text-secondary tracking-wide">
            3 ACTIVE · SYSTEM LIVE
          </span>
        </div>
      </div>

      {/* right */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 bg-critical-muted border border-critical-border rounded px-3 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-critical animate-blink" />
          <span className="font-mono text-xs font-semibold text-critical tracking-wide">
            3 ALERTS
          </span>
        </div>

        <span className="font-mono text-sm font-semibold text-text-primary">
          {time}
        </span>

        <span className="font-mono text-xs text-text-secondary tracking-wide">
          STAFF: J.PATEL
        </span>
      </div>
    </div>
  );
};

export default StaffTopbar;
