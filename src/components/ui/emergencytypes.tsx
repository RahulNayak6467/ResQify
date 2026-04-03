interface emergencyTypesProps {
  icon: string;
  label: string;
}

function EmergencyTypes({ icon, label }: emergencyTypesProps) {
  return (
    <div className="bg-surface border border-border rounded-lg px-8 py-2  flex flex-col justify-center items-center w-full cursor-pointer hover:border-critical-border hover:bg-critical-muted mt-2">
      <span>{icon}</span>
      <span className="mt-2 text-xs">{label}</span>
    </div>
  );
}

export default EmergencyTypes;
