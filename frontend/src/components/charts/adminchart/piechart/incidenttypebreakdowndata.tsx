import { useAdmin } from "../../../../context/adminContext";
import IncidentTypeBreakdownValue from "../incidenttypebreakdown";

const IncidentTypeBreakdown = () => {
  const { incidentGraph } = useAdmin();
  const Medical = incidentGraph.filter(
    (inc: any) => inc.emergency_team === "Medical",
  ).length;
  const Security = incidentGraph.filter(
    (inc: any) => inc.emergency_team === "Security",
  ).length;
  const Fire = incidentGraph.filter(
    (inc: any) => inc.emergency_team === "Fire",
  ).length;
  const Maintenance = incidentGraph.filter(
    (inc: any) => inc.emergency_team === "Maintenance",
  ).length;

  const total = Medical + Security + Fire + Maintenance;
  console.log(incidentGraph);
  return (
    <div className="flex flex-col gap-3">
      <IncidentTypeBreakdownValue
        type={"Medical"}
        value={Math.round((Medical * 100) / total)}
        fill={"#4a9eff"}
      />
      <IncidentTypeBreakdownValue
        type={"Fire / Smoke"}
        value={Math.round((Fire * 100) / total)}
        fill={"#ffaa00"}
      />
      <IncidentTypeBreakdownValue
        type={"Security"}
        value={Math.round((Security * 100) / total)}
        fill={"#ff3b3b"}
      />
      <IncidentTypeBreakdownValue
        type={"Maintenance"}
        value={Math.round((Maintenance * 100) / total)}
        fill={"#00d97e"}
      />
    </div>
  );
};

export default IncidentTypeBreakdown;
