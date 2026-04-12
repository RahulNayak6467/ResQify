import { CheckIcon } from "lucide-react";
import useClassify from "../../hooks/useClassify";
import { useLocation } from "react-router-dom";

const ConfirmationScreen = () => {
  const { state } = useLocation();
  const { incident, classification } = state;
  console.log(state);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base px-6 py-12">
      {/* check ring */}
      <div className="w-18 h-18 rounded-full border border-resolved-border bg-resolved-muted flex items-center justify-center mb-7">
        <CheckIcon size={28} className="text-resolved" strokeWidth={2.5} />
      </div>

      {/* heading */}
      <h1 className="font-display font-extrabold text-4xl text-text-primary text-center tracking-tight leading-tight mb-3">
        Help is on the way
      </h1>
      <p className="font-mono text-sm text-text-secondary text-center leading-relaxed mb-8">
        Your report has been classified and dispatched.
        <br />A team member will reach you shortly.
      </p>

      {/* detail card */}
      <div className="w-full max-w-md bg-base-raised border border-border rounded-xl overflow-hidden">
        {[
          { key: "Incident ID", val: incident?.INC_code, style: "font-mono" },
          {
            key: "Classified as",
            val: (
              <span className="badge-accent">
                {classification?.emergency_category}
              </span>
            ),
          },
          {
            key: "Severity",
            val: (
              <span className="badge-critical">
                {classification?.incident_severity}
              </span>
            ),
          },
          { key: "Dispatched to", val: classification?.emergency_category },
        ].map(({ key, val, style }) => (
          <div
            key={key}
            className="flex items-center justify-between px-5 py-3.5 border-b border-border last:border-b-0"
          >
            <span className="font-mono text-xs text-text-secondary">{key}</span>
            <span
              className={`font-mono text-sm font-medium text-text-secondary ${style ?? ""}`}
            >
              {val}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ConfirmationScreen;
