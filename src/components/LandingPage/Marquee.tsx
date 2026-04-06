// function Marquee() {
//   return (
//     <div class="marquee-wrap">
//       <div class="marquee">
//         <span>Real-Time Alerts</span>
//         <span>AI Triage</span>
//         <span>Role-Based Access</span>
//         <span>IoT Integration</span>
//         <span>Evacuation Planning</span>
//         <span>Guest Safety</span>
//         <span>Staff Coordination</span>
//         <span>Incident Analytics</span>
//         <span>Emergency Protocols</span>
//         <span>Smart Notifications</span>
//         <span>Fire Detection</span>
//         <span>Medical Response</span>
//         <span>Real-Time Alerts</span>
//         <span>AI Triage</span>
//         <span>Role-Based Access</span>
//         <span>IoT Integration</span>
//         <span>Evacuation Planning</span>
//         <span>Guest Safety</span>
//         <span>Staff Coordination</span>
//         <span>Incident Analytics</span>
//         <span>Emergency Protocols</span>
//         <span>Smart Notifications</span>
//         <span>Fire Detection</span>
//         <span>Medical Response</span>
//       </div>
//     </div>
//   );
// }

// export default Marquee;

const features = [
  "AI Triage",
  "Role-Based Access",
  "IoT Integration",
  "Evacuation Planning",
  "Guest Safety",
  "Staff Coordination",
  "Incident Analytics",
  "Emergency Protocols",
  "Smart Notifications",
  "Fire Detection",
  "Medical Response",
  "Real-Time Alerts",
  "AI Triage",
  "Role-Based Access",
  "IoT Integration",
  "Evacuation Planning",
  "Guest Safety",
  "Staff Coordination",
  "Incident Analytics",
  "Emergency Protocols",
  "Smart Notifications",
  "Fire Detection",
  "Medical Response",
  "Real-Time Alerts",
];

function Marquee() {
  return (
    <div className="w-full  overflow-x-hidden border-t border-b border-t-border border-b-border p-2 ">
      <div className="flex gap-4 animate-marquee py-2 ">
        {features.map((f, index) => (
          //   <span key={`f-${index}`}>{f}</span>
          <div
            key={`f-${index}`}
            className="flex items-center gap-2 p-4  border border-border rounded-sm  bg-base-raised "
          >
            <span className="w-1 h-1 bg-resolved rounded-full"></span>
            <div className="text-sm text-text-secondary brightness-150  w-40 ">
              {f}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
