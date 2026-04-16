import { useEffect, useState } from "react";
import FloorMapLegend from "./floormaplegend";
import FloorMap from "./floorroom";
import { formatTime } from "../../../lib/utils";
import { getIncidentFloorMap } from "../../../lib/queris";

// constants/floorMap.ts

const floor3Rooms = [
  { number: 201, status: "normal" },
  { number: 201, status: "normal" },
  { number: 202, status: "normal" },
  { number: 203, status: "normal" },
  { number: 204, status: "normal" },
  { number: 205, status: "normal" },
  { number: 206, status: "normal" },
  { number: 207, status: "normal" },
  { number: 208, status: "normal" },
  { number: 209, status: "normal" },
  { number: 210, status: "normal" },
  { number: 211, status: "normal" },
  { number: 212, status: "normal" },
  { number: 213, status: "normal" },
  { number: 214, status: "normal" },
  { number: 215, status: "normal" },
  { number: 216, status: "normal" },
  { number: 217, status: "normal" },
  { number: 218, status: "normal" },
  { number: 220, status: "normal" },
  { number: 221, status: "normal" },
  { number: 222, status: "normal" },
  { number: 223, status: "normal" },
  { number: 224, status: "normal" },
  { number: 225, status: "normal" },
  { number: 226, status: "normal" },
  { number: 227, status: "normal" },
  { number: 228, status: "normal" },
  { number: 229, status: "normal" },
  { number: 230, status: "normal" },
  { number: 231, status: "normal" },
  { number: 232, status: "normal" },
  { number: 233, status: "normal" },
  { number: 234, status: "normal" },
  { number: 235, status: "normal" },
  { number: 236, status: "normal" },
  { number: 237, status: "normal" },
  { number: 238, status: "normal" },
  { number: 239, status: "normal" },
  { number: 240, status: "normal" },
];

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

function FloorLayout() {
  const [selectedFloor, setSelectedFloor] = useState(1);
  const rooms = Array.from({ length: ROOMS_PER_FLOOR }, (_, i) => ({
    number: selectedFloor * 100 + i + 1,
    status: "normal",
  }));
  console.log(rooms);
  const [dataFloor, setDataFloor] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const getData = await getIncidentFloorMap();
      console.log(getData);
      setDataFloor(getData);
    };
    fetchData();
  }, []);

  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < dataFloor.length; j++) {
      if (rooms[i].number === dataFloor[j].room_number) {
        rooms[i].status = dataFloor[j].incident_severity;
      }
    }
  }
  console.log(dataFloor);
  console.log(rooms);

  return (
    <div className="bg-base border border-border brightness-125 mx-auto max-w-[1600px] mt-6 h-fit px-6 py-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-sm text-text-secondary font-mono tracking-tight brightness-125 ">
          Floor {selectedFloor} Layout
        </h3>
        <div className="flex gap-0.5 items-center">
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
      <div className="grid grid-cols-10 gap-x-2 gap-y-2 mt-2">
        {/* {floor3Rooms.map((floor)) => (
          <FloorMap data={floor} />
        ))} */}
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
