function RecentActivity() {
  return (
    <div className="mb-8">
      <p className="font-mono text-[10px] text-text-faint uppercase tracking-widest mb-3">
        Recent Activity
      </p>
      <div className="flex flex-col gap-2">
        {[
          {
            dot: "bg-critical",
            text: "Room 412 — cardiac event",
            conf: "97%",
            time: "23:03",
          },
          {
            dot: "bg-moderate",
            text: "Room 207 — smoke detected",
            conf: "94%",
            time: "22:58",
          },
          {
            dot: "bg-resolved",
            text: "Room 118 — resolved",
            conf: "99%",
            time: "21:22",
          },
        ].map(({ dot, text, conf, time }) => (
          <div
            key={text}
            className="flex items-center gap-3 bg-surface border
                                  border-border rounded-lg px-3 py-2.5"
          >
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
            <span className="font-mono text-xs text-text-secondary flex-1">
              {text}
            </span>
            <span className="font-mono text-[10px] text-accent">{conf}</span>
            <span className="font-mono text-[10px] text-text-faint">
              {time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
