interface emergencyTypesProps {
  icon: string;
  label: string;
  emergencyType: string;
  setEmergencyType: (label: string) => void;
}

function EmergencyTypes({
  icon,
  label,
  emergencyType,
  setEmergencyType,
}: emergencyTypesProps) {
  console.log(emergencyType);
  return (
    <div
      onClick={() => setEmergencyType(label)}
      className={
        emergencyType === label
          ? "bg-critical-muted border border-critical-muted rounded-lg px-8 py-2  flex flex-col justify-center items-center w-full cursor-pointer mt-2"
          : "bg-surface border border-border rounded-lg px-8 py-2  flex flex-col justify-center items-center w-full cursor-pointer hover:border-critical-border hover:bg-critical-muted mt-2"
      }
    >
      <span>{icon}</span>
      <span className="mt-2 text-xs">{label}</span>
    </div>
  );
}

export default EmergencyTypes;
