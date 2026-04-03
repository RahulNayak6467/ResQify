// interface StatCardProps {
//   num: string;
//   label: string;
//   delta: string;
//   color: string;
// }

// function StatCard({ num, label, delta, color }: StatCardProps) {
//   return (
//     <div className="bg-surface border-t  p-4 rounded-md flex flex-col gap-2">
//       <span className="text-text-secondary text-3xl font-bold font-sans">
//         {num}
//       </span>
//       <p className="text-text-secondary text-xs font-sans uppercase ">
//         {label}
//       </p>
//       <p className="text-text-secondary text-xs font-sans uppercase ">
//         {delta}
//       </p>
//     </div>
//   );
// }

// export default StatCard;

interface StatCardProps {
  num: string;
  label: string;
  delta: string;
  color: string;
}

const StatCard = ({ num, label, delta, color }: StatCardProps) => (
  <div
    style={{ borderTopColor: color }}
    className={`bg-surface  border-t  rounded-lg h-25 p-2 px-4  `}
  >
    <div
      style={{ color: color }}
      className={`font-mono text-3xl font-semibold leading-none mb-1 mt-2`}
    >
      {num}
    </div>
    <div className="font-mono text-xs text-text-secondary uppercase tracking-wider mt-1 mb-2">
      {label}
    </div>
    <div className="font-mono text-[10px] text-text-secondary">{delta}</div>
  </div>
);

export default StatCard;
