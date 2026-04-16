interface HeatMapRowProps {
  day: string;
  hours: number[];
}

const assignColor = (hour: number) => {
  switch (hour) {
    case 0:
      return "#161c2a";
    case 1:
      return "#FF3B3B30";
    case 2:
      return "#FF3B3B50";
    case 3:
      return "#ff3b3b70";
    case 4:
      return "#ff3b3b";

    default:
      break;
  }
};

const assignDay = (hour: number) => {
  switch (hour) {
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    case 7:
      return "Sun";

    default:
      break;
  }
};

function HeatMapHour({ data }: { data: HeatMapRowProps }) {
  return (
    <div className="grid grid-cols-[20px_1fr] place-items-center">
      <p className="text-text-secondary brightness-110 text-[11px] font-sans font-normal ">
        {/* {assignDay(Number(data?.day))} */}
        Mon
      </p>
      <div>
        <div className="flex gap-0.5">
          {data.hours.map((hour, index) => (
            <div key={index}>
              <div
                style={{ backgroundColor: assignColor(hour) }}
                className={`h-6 w-8 border border-border rounded-t-[2px] rounded-b-[2px] cursor-pointer opacity-60 hover:opacity-100 `}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeatMapHour;
