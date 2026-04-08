import FloorMapLegend from "./floormaplegend";
import FloorMap from "./floorroom";

// constants/floorMap.ts

const floor3Rooms = [
  { number: 301, status: "normal" },
  { number: 302, status: "normal" },
  { number: 303, status: "normal" },
  { number: 304, status: "normal" },
  { number: 305, status: "normal" },
  { number: 306, status: "moderate" },
  { number: 307, status: "normal" },
  { number: 308, status: "normal" },
  { number: 309, status: "normal" },
  { number: 310, status: "normal" },
  { number: 311, status: "normal" },
  { number: 312, status: "critical" },
  { number: 313, status: "normal" },
  { number: 314, status: "normal" },
  { number: 315, status: "normal" },
  { number: 316, status: "normal" },
  { number: 317, status: "normal" },
  { number: 318, status: "resolved" },
  { number: 319, status: "normal" },
  { number: 320, status: "normal" },
  { number: 321, status: "normal" },
  { number: 322, status: "normal" },
  { number: 323, status: "normal" },
  { number: 324, status: "normal" },
  { number: 325, status: "normal" },
  { number: 326, status: "normal" },
  { number: 327, status: "normal" },
  { number: 328, status: "normal" },
  { number: 329, status: "moderate" },
  { number: 330, status: "normal" },
  { number: 331, status: "normal" },
  { number: 332, status: "normal" },
  { number: 333, status: "normal" },
  { number: 334, status: "normal" },
  { number: 335, status: "normal" },
  { number: 336, status: "normal" },
  { number: 337, status: "normal" },
  { number: 338, status: "normal" },
  { number: 339, status: "normal" },
  { number: 340, status: "critical" },
];

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

function FloorLayout() {
  return (
    <div className="bg-base border border-border brightness-125 mx-auto max-w-[1600px] mt-6 h-fit px-6 py-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h3 className="text-sm text-text-secondary font-mono tracking-tight brightness-125 ">
          Floor 5 Layout
        </h3>
        <div className="flex gap-0.5 items-center">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="text-text-secondary text-xs px-2 py-1 border border-border bg-base hover:bg-surface-raised cursor-pointer rounded-sm  hover:text-text-primary transition-all">
              {index}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-10 gap-x-2 gap-y-2 mt-2">
        {/* {floor3Rooms.map((floor)) => (
          <FloorMap data={floor} />
        ))} */}
        {floor3Rooms.map((floor) => (
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
