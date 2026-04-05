interface Room {
  number: number;
  status: string;
}

interface TooltipProps {
  data: Room;
}

function Tooltip({ data }: TooltipProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "normal":
        return "Normal No incidents";
      case "critical":
        return "Critical Medical";
      case "moderate":
        return "Moderate Security";
      case "resolved":
        return "Resolved Maintenance";
      default:
        return status;
    }
  };

  return (
    <div className="absolute flex flex-col  z-10 bg-base-raised  border border-border-strong rounded-md px-3 py-2 shadow-lg text-xs text-text-primary whitespace-nowrap -top-12 left-1/2 transform -translate-x-1/2">
      <div className="font-semibold text-md font-sans tracking-wider">
        Room {data.number}
      </div>
      <div className="text-text-secondary font-sans font-medium brightness-125">
        Status: {getStatusLabel(data.status)}
      </div>
    </div>
  );
}

export default Tooltip;
