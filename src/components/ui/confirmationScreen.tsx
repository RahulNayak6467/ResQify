import { CheckIcon } from "lucide-react";

const ConfirmationScreen = () => (
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
        { key: "Incident ID", val: 1, style: "font-mono" },
        {
          key: "Classified as",
          val: <span className="badge-accent">Medical</span>,
        },
        { key: "Severity", val: <span className="badge-critical">High</span> },
        { key: "Dispatched to", val: "🏥 Medical Team" },
        { key: "ETA", val: "~3 min", color: "text-resolved" },
      ].map(({ key, val, style, color }) => (
        <div
          key={key}
          className="flex items-center justify-between px-5 py-3.5 border-b border-border last:border-b-0"
        >
          <span className="font-mono text-xs text-text-secondary">{key}</span>
          <span
            className={`font-mono text-sm font-medium text-text-primary ${color ?? ""} ${style ?? ""}`}
          >
            {val}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default ConfirmationScreen;
