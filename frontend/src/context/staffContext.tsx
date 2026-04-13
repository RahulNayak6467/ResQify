import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseclient";
import { useAuth } from "../hooks/useAuth";

interface valueProps {
  incident: any[];
  totalPages: number;
  page: number;
  selectedIncident: any;
  setIncident: React.Dispatch<React.SetStateAction<any[]>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  // handleIncidents,
  // handleTotalPages,
  handlePage: (page: number) => void;
  // handleSelectedIncident,
  setSelectedIncident: any;
  isLoading: boolean;
}

const StaffContext = createContext<valueProps | null>(null);

export const useStaff = () => {
  const ctx = useContext(StaffContext);
  if (!ctx) {
    throw new Error("Need to wrap around staffcontextprovider");
  }
  return ctx;
};

const StaffContextProvider = ({ children }: { children: React.ReactNode }) => {
  //   const { getIncidentsData } = useAuth();
  const [incident, setIncident] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any[] | null>(null);

  //   const handleIncidents = (incident: any) => {
  //     setIncidents(incident);
  //   };

  //   const handleTotalPages = (page: number) => {
  //     setTotalPages(page);
  //   };

  const handlePage = (page: number) => {
    setPage(page);
  };

  const handleSelectedIncident = (incident: any) => {
    setSelectedIncident(incident);
  };

  const ITEMS_PER_PAGE = 7;

  useEffect(() => {
    const fetchIncidents = async () => {
      setIsLoading(true);
      const { data, count } = await supabase
        .from("incidents")
        .select(`*, aiclassification(*)`, { count: "exact" })
        .order("created_at", { ascending: false })
        .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);

      //   setIncident(data ? { data, count } : { data: [], count: 0 });
      setIncident(data || []);
      setCount(count || 0);
      setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));
      setSelectedIncident(data?.[0] || null);
      setIsLoading(false);
    };

    fetchIncidents();
  }, [page]);

  //   useEffect(() => {
  //     const handleTableResponse = async () => {
  //       const incidentData = await getIncidentsData(page);

  //       console.log("Incident Data", incidentData);
  //       setIncident(incidentData);
  //       //   setTotalPages(incidentData.count);
  //     };
  //     handleTableResponse();
  //   }, [page]);

  const value: valueProps = {
    incident,
    totalPages,
    page,
    selectedIncident,
    setIncident,
    setTotalPages,
    // handleIncidents,
    // handleTotalPages,
    handlePage,
    isLoading,
    // handleSelectedIncident,
    setSelectedIncident,
  };

  return (
    <StaffContext.Provider value={value}>{children}</StaffContext.Provider>
  );
};

export default StaffContextProvider;
