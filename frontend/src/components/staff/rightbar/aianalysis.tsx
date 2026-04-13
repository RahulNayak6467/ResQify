import { useStaff } from "../../../context/staffContext";
// import Loader from "../../ui/Loader";

function Analysis() {
  const { selectedIncident } = useStaff();
  //   if (isLoading) {
  //     return (
  //       <Loader fullscreen bg="mesh" variant="orbital" text="Fetching Data" />
  //     );
  //   }
  if (!selectedIncident)
    return (
      <div className="p-4 text-text-faint text-[11px] font-mono">
        Select an incident to view details
      </div>
    );

  console.log(selectedIncident?.aiclassification);

  return (
    <div className="p-4 mx-7 bg-accent-muted border border-accent-border   rounded-sm mt-4">
      <h3 className="text-sm text-accent font-sans tracking-widest">
        ⬡ AI ANALYSIS
      </h3>
      <div className="flex flex-col gap-1 mt-2">
        <div className="flex justify-between border-b border-b-border">
          <p className="text-[12px] font-mono tracking-wide font-normal  text-text-primary brightness-70">
            Classifiation
          </p>
          <p className="text-[12px] text-accent font-sans font-light">
            {selectedIncident?.aiclassification?.crisp}
          </p>
        </div>
        <div className="flex justify-between  border-b border-b-border">
          <p className="text-[12px] font-mono tracking-wide font-normal  text-text-primary brightness-70">
            Confidence
          </p>
          <div className="flex gap-1 items-center">
            <span className="w-20 bg-accent h-1 rounded-full"></span>
            <p className="text-[12px] text-accent font-mono font-normal">
              {selectedIncident?.aiclassification?.ai_confidence}%
            </p>
          </div>
        </div>
        <div className="flex justify-between  border-b border-b-border">
          <p className="text-[12px] font-mono tracking-wide font-normal  text-text-primary brightness-70">
            Severity
          </p>
          <p className="text-[12px] text-critical font-mono font-normal">
            {selectedIncident?.aiclassification?.emergency_category}
          </p>
        </div>
        <div className="flex justify-between  border-b border-b-border">
          <p className="text-[12px] font-mono tracking-wide font-normal  text-text-primary brightness-70">
            Recommended
          </p>
          <p className="text-[12px] text-text-primary font-sans font-light">
            {selectedIncident.aiclassification?.emergency_team}
          </p>
        </div>
        <div className="flex justify-between  border-b border-b-border">
          <p className="text-[12px] font-mono tracking-wide font-normal  text-text-primary brightness-70">
            Classified in
          </p>
          <p className="text-[12px] text-resolved font-sans font-light">
            {selectedIncident?.aiclassification?.response_time}s
          </p>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
