export const legend = [
  { label: "Clear", color: "border-border bg-transparent" },
  { label: "Active incident", color: "border-critical bg-critical-muted" },
  { label: "Moderate", color: "border-moderate bg-moderate-muted" },
  { label: "Resolved", color: "border-resolved bg-resolved-muted" },
];

export const aiDashboardData = {
  stats: {
    totalClassifications: 147,
    vsYesterday: 23,
    avgLatency: "0.82s",
    p95Latency: "1.47s",
    highConfidence: "89%",
    highConfidenceThreshold: ">80%",
    escalations: 3,
    escalationNote: "low-conf flagged",
    model: "llama-3.3",
    modelNote: "Groq · $0.81 today",
  },

  classificationLog: [
    {
      ts: "16:27:50",
      category: "Security",
      desc: "Guest reports an armed individual hiding under the bed in their room.",
      conf: 95,
    },
    {
      ts: "16:32:23",
      category: "Maintenance",
      desc: "Stains discovered in a wardrobe need cleaning.",
      conf: 90,
    },
    {
      ts: "17:07:14",
      category: "Medical",
      desc: "Guest reports stomach pain.",
      conf: 80,
    },
    {
      ts: "19:45:59",
      category: "Fire",
      desc: "Guest reports a fire requiring immediate evacuation and fire response.",
      conf: 98,
    },
    {
      ts: "20:01:23",
      category: "Maintenance",
      desc: "Electric shocks in the shower · hazardous electrical fault.",
      conf: 80,
    },
    {
      ts: "01:41:20",
      category: "Maintenance",
      desc: "Substandard furniture in the room.",
      conf: 90,
    },
    {
      ts: "16:27:17",
      category: "Medical",
      desc: "Unspecified medical issues requiring assessment.",
      conf: 60,
    },
    {
      ts: "16:28:25",
      category: "Maintenance",
      desc: "Broken chairs and a damaged bed requiring maintenance.",
      conf: 90,
    },
    {
      ts: "16:38:49",
      category: "Maintenance",
      desc: "Guest requests assistance with obtaining good food.",
      conf: 90,
    },
    {
      ts: "16:39:12",
      category: "Maintenance",
      desc: "Flood in their room requiring prompt maintenance response.",
      conf: 92,
    },
    {
      ts: "16:39:30",
      category: "Fire",
      desc: "Guest reports a fire in their room.",
      conf: 95,
    },
    {
      ts: "16:39:52",
      category: "Medical",
      desc: "Persistent stomach pain for a week, needs medical assessment.",
      conf: 88,
    },
  ],

  categoryBreakdown: [
    { label: "Maintenance", count: 78, pct: 53, color: "#00e5a0" },
    { label: "Medical", count: 29, pct: 20, color: "#ff4757" },
    { label: "Security", count: 21, pct: 14, color: "#4ea3ff" },
    { label: "Fire", count: 13, pct: 9, color: "#ff7a5a" },
    { label: "Other", count: 6, pct: 4, color: "#6b7280" },
  ],

  hourlyActivity: [8, 5, 3, 4, 7, 12, 18, 22, 19, 25, 30, 32, 27, 21, 28, 31],

  //   confidenceBuckets: [
  //     { range: "90–100%", count: 94 },
  //     { range: "80–89%", count: 37 },
  //     { range: "70–79%", count: 13 },
  //     { range: "< 70%", count: 3 },
  //   ],
};
