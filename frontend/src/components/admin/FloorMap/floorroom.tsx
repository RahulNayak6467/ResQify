import { useState } from "react";
import Tooltip from "./floortooltip";

interface Room {
  number: number;
  status: string;
}

const assignColor = (status: string) => {
  switch (status) {
    case "resolved":
      return { bgColor: "#00d97e1a", border: "#00d97e80" };
    case "moderate":
      return { bgColor: "#ffaa0040", border: "#ffaa0080" };
    case "critical":
      return { bgColor: "#ff3b3a40", border: "#ff3b3b80" };
    case "low":
      return { bgColor: "#4a9eff40", border: "#4a9eff80" };
    default:
      break;
  }
};

function FloorMap({ data }: { data: Room }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <div
        style={{
          backgroundColor: assignColor(data.status)?.bgColor,
          borderColor: assignColor(data.status)?.border,
        }}
        className={`flex items-center justify-center w-full h-30 rounded-t-sm rounded-b-sm text-xs border border-${data.status === "normal" ? "border" : data.status} ${data.status === "critical" ? "animate-flash-room" : ""} bg-surface-raised brightness-60 cursor-pointer border-2 hover:border-border-focus transition-all `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {data.number}
      </div>
      {isHovered && <Tooltip data={data} />}
    </div>
  );
}

export default FloorMap;
