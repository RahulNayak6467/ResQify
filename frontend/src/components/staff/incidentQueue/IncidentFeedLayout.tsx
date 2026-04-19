import { useState } from "react";
import IncidentFeed from "./incidentFeed";
import IncidentFeedHeader from "./topbar";
import { useStaff } from "../../../context/staffContext";


const formatTime = (isoString: string): string => {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Usage
// "03:09 PM"

function IncidentFeedLayout() {
  //   const { isLoading } = useAuth();
  //   const [page, setPage] = useState(0);
  //   const [totalPages, setTotalPages] = useState(0);
  //   const handlePage = (id: number) => {
  //     setPage(() => id);
  //   };

  //   const [incident, setIncident] = useState<any[]>([]);
  const { page, handlePage, incident, totalPages, setSelectedIncident } =
    useStaff();
  const [incidentCategory, setIncidentCategory] = useState("ALL");
  const handleCategory = (category: string) => {
    setIncidentCategory(category);
  };
  console.log(incidentCategory);

  let incidentCategoryData = [...incident];
  if (incidentCategory !== "ALL") {
    incidentCategoryData = incident.filter(
      (inc) => inc.incident_severity.toUpperCase() === incidentCategory,
    );
  } else {
    incidentCategoryData = incident;
  }
  console.log(incidentCategory);
  console.log(incidentCategoryData);
  //   const [incident, SetIncident] = useState<any[]>([]);
  //   //   const handleTableResponse = async () => {
  //   //     const getIncidentDataResponse = await getIncidentData();
  //   //     const geyAiDataResponse = await getAiData();
  //   //   };
  //   useEffect(() => {
  //     const handleTableResponse = async () => {
  //       const incidentData = await getIncidentsData(page);

  //       console.log("Incident Data", incidentData);
  //       setIncident(incidentData);
  //       //   setTotalPages(incidentData.count);
  //     };
  //     handleTableResponse();
  //   }, [page]);

  //   if (isLoading) {
  //     return (
  //       <Loader fullscreen bg="mesh" variant="orbital" text="Fetching Data" />
  //     );
  //   }

  console.log(page);
  console.log(incident);

  console.log(incident);

  return (
    <section className="border-r border-border-strong h-screen">
      <IncidentFeedHeader
        handleCategory={handleCategory}
        page={page}
        handlePage={handlePage}
        totalPages={totalPages}
      />
      {incidentCategoryData.map((incident) => (
        <IncidentFeed
          key={incident.id}
          id={incident.INC_code}
          room={incident.room_number}
          floor={incident.room_number}
          title={incident?.aiclassification?.ai_summary}
          desc={incident?.aiclassification?.ai_suggestions}
          severity={incident.incident_severity}
          type={incident?.aiclassification?.emergency_team}
          aiTag={incident?.aiclassification?.crisp ?? "Critical"}
          time={formatTime(incident.created_at)}
          live={incident.incident_severity !== "resolved"}
          confidence={incident?.aiclassification?.ai_confidence}
          oneLineSummary={
            incident?.aiclassification?.one_line_summary ?? "Hello"
          }
          onClick={() => setSelectedIncident(incident)}
        />
      ))}
    </section>
  );
}

export default IncidentFeedLayout;
