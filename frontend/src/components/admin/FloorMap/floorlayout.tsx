import { useEffect, useState } from "react";
import FloorMapLegend from "./floormaplegend";
import FloorMap from "./floorroom";
import { getIncidentFloorMap } from "../../../lib/queris";
import AIStatsStrip from "../aiDashboard";

// constants/floorMap.ts


// const arr = [
//   1, 2, 3, 4, 5, 3, 3, 4, 5, 3, 2, 4, 3, 5, 6, 7, 4, 3, 4, 5, 6, 3, 4,
// ];

// const assignColor = (status: string) => {
//   switch (status) {
//     case "cleared":
//       return { bgColor: "#00d97e22", border: "#00d97e" };
//     case "moderate":
//       return { bgColor: "#ffaa0022", border: "#ffaa00" };
//     case "critical":
//       return { bgColor: "#ff3b3b22", border: "#ff3b3b" };
//     default:
//       break;
//   }
// };

const ROOMS_PER_FLOOR = 40;
const ONE_HOUR_MS = 60 * 60 * 1000;

function FloorLayout() {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [dataFloor, setDataFloor] = useState<
    { room_number: number; incident_severity: string; resolved_at: string | null }[]
  >([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      const getData = await getIncidentFloorMap();
      setDataFloor(getData);
    };
    fetchData();
  }, []);

  // Tick every minute so rooms revert to normal once the 1-hour window elapses
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(timer);
  }, []);

  const rooms = Array.from({ length: ROOMS_PER_FLOOR }, (_, i) => ({
    number: selectedFloor * 100 + i + 1,
    status: "normal",
  }));

  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < dataFloor.length; j++) {
      if (rooms[i].number === dataFloor[j].room_number) {
        const incident = dataFloor[j];
        if (
          incident.incident_severity === "resolved" &&
          incident.resolved_at &&
          now - new Date(incident.resolved_at).getTime() >= ONE_HOUR_MS
        ) {
          rooms[i].status = "normal";
        } else {
          rooms[i].status = incident.incident_severity;
        }
      }
    }
  }

  return (
    <div className="bg-base-raised/40 border border-border brightness-125 mx-auto max-w-[1400px]  h-fit px-6 py-4  rounded-b-lg">
      <div>
        <AIStatsStrip />
      </div>
      <div className="flex justify-between items-center mt-6 ">
        <h3 className="text-sm text-text-secondary font-mono tracking-tight brightness-125 ">
          Floor {selectedFloor} Layout
        </h3>
        <div className="flex gap-0.5  items-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              onClick={() => setSelectedFloor(() => index)}
              className="text-text-secondary text-xs px-2 py-1 border border-border bg-base hover:bg-surface-raised cursor-pointer rounded-sm  hover:text-text-primary transition-all"
            >
              {index}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-10 h-fit border border-border p-4 rounded-2xl bg-base-raised/40  gap-x-2 gap-y-2 mt-2">
        {rooms.map((floor) => (
          <FloorMap data={floor} />
        ))}
      </div>
      <div className="mt-4">
        <FloorMapLegend />
      </div>
    </div>
  );
}

export default FloorLayout;
