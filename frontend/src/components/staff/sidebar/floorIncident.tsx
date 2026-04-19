import { useStaff } from "../../../context/staffContext";

function FloorIncident() {
  const { incident } = useStaff();
  console.log(incident.slice(0, 3));
  const countOccurence = (roomNumber: number) => {
    const room = incident.filter(
      (inc) => Number(inc.room_number) === roomNumber,
    );
    console.log("room", roomNumber);
    console.log("roomOccurence", room);
    return room.length;
  };

  return (
    <div>
      <h3 className="text-text-secondary uppercase text-[10px] font-mono tracking-wide mb-1">
        floors
      </h3>
      {incident.slice(0, 3).map((inc) => (
        <div
          key={inc.INC_code}
          className="flex justify-between text-xs items-center hover:bg-surface-raised rounded-md transition-all cursor-pointer px-4 py-2 "
        >
          <div className="flex items-center gap-4">
            <p
              style={{
                backgroundColor:
                  countOccurence(inc.room_number) > 1 ? "#ff3b3b" : "#ffaa00",
              }}
              className="h-1.5 w-1.5 rounded-full"
            ></p>
            <p className="text-text-secondary font-mono">
              Floor {Math.floor(inc.room_number / 100)} — Room {inc.room_number}
            </p>
          </div>
          <p
            style={{
              color:
                countOccurence(inc.room_number) > 1 ? "#ff3b3b" : "#ffaa00",
            }}
            className="text-critical px-2 rounded-md"
          >
            {countOccurence(inc.room_number)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default FloorIncident;
