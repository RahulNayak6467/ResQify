import { createContext, useContext, useEffect, useState } from "react";
import { useStaff } from "./staffContext";
import {
  getActiveIncidentData,
  getAIAccuracy,
  getAIData,
  getAILatency,
  getIncidents,
  getIncidentType,
  getResolutionRate,
  getResolvedTime,
  getStaffOnline,
} from "../lib/queris";

interface valueProps {
  overview: number[];
  incidentGraph: any;
  resolvedTime: any;
  confidenceData: any;
  heatmap: any;
  isloading: boolean;
}

const AdminContext = createContext<valueProps | null>(null);

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("Wrap the provider around admin context provider");
  }
  return ctx;
};

const AdminContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [overview, setOverview] = useState<number[]>([]);
  const [incidentGraph, setIncidentGraph] = useState([]);
  const [resolvedTime, setResolvedTime] = useState([]);
  const [confidenceData, setConfidenceData] = useState([]);
  const [heatmap, setHeatMap] = useState([]);
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const AIAccuracy = await getAIAccuracy();
      const AILatency = await getAILatency();
      const ActiveIncidents = await getActiveIncidentData();
      const StaffOnline = await getStaffOnline();
      const PercentageResolved = await getResolutionRate();
      const IncidentData = await getIncidentType();
      const ResolvedData = await getResolvedTime();
      const ConfidenceData = await getAIData();
      const HeatMap = await getIncidents();
      setIsloading(false);
      setOverview([
        AIAccuracy,
        AILatency,
        ActiveIncidents,
        StaffOnline,
        PercentageResolved,
      ]);
      setIncidentGraph(IncidentData);
      setResolvedTime(ResolvedData);
      setConfidenceData(ConfidenceData);
      setHeatMap(HeatMap);
    };
    fetchData();
  }, []);

  const value: valueProps = {
    overview,
    incidentGraph,
    resolvedTime,
    confidenceData,
    heatmap,
    isloading,
  };
  //   consiewCard, setOverviewCard] = useStaff([]);
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
