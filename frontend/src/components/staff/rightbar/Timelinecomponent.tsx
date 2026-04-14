type TimelineItemProps = {
  label: string;
  time: string | null;
  status: "done" | "active" | "pending";
  isLast?: boolean;
};

const dotColorMap = {
  done: "bg-green-500 border-green-500",
  active: "bg-amber-400 border-amber-400",
  pending: "bg-transparent border-zinc-600",
};

const textColorMap = {
  done: "text-zinc-200",
  active: "text-amber-300",
  pending: "text-zinc-500",
};

function TimelineItem({
  label,
  time,
  status,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="flex gap-3 relative">
      {!isLast && (
        <div className="absolute left-[5px] top-3 bottom-0 w-px border border-border-strong bg-border2" />
      )}
      <div
        className={`w-3 h-3 rounded-full border-2 flex-shrink-0 mt-0.5 z-10 ${dotColorMap[status]} ${status === "active" ? "animate-blink" : ""}`}
      />
      <div className="pb-4">
        <p
          className={`font-mono text-sm font-medium leading-tight ${textColorMap[status]}`}
        >
          {label}
        </p>
        <p className="font-mono text-xs text-text-faint mt-0.5">
          {time ?? "—"}
        </p>
      </div>
    </div>
  );
}

export default TimelineItem;
