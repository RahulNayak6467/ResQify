import Card from "./FeaturesCard";

import {
  Clock,
  MessageSquare,
  Shield,
  Monitor,
  Activity,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Clock,
    iconColor: "#00d97e",
    iconBg: "#00d97e10",
    title: "Real-Time Alert Engine",
    desc: "Millisecond-latency push notifications with severity-based routing. Critical alerts hit every screen instantly.",
    tag: "REAL-TIME",
    tagColor: "text-accent",
    tagBg: "bg-accent-muted",
  },
  {
    icon: MessageSquare,
    iconColor: "#4a9eff",
    iconBg: "#4a9eff10",
    title: "AI-Powered Triage",
    desc: "Claude analyzes incident reports in real-time, auto-classifies severity, and recommends optimal response protocols.",
    tag: "AI-POWERED",
    tagColor: "text-resolved",
    tagBg: "bg-resolved-muted",
  },
  {
    icon: Shield,
    iconColor: "#ff3b3b",
    iconBg: "#ff3b3b10",
    title: "Crisis Coordination",
    desc: "Unified command center for staff assignment, evacuation routing, and multi-floor incident management.",
    tag: "SECURITY",
    tagColor: "text-critical",
    tagBg: "bg-critical-muted",
  },
  {
    icon: Monitor,
    iconColor: "##ffaa00",
    iconBg: "#ffaa0010",
    title: "Guest Portal",
    desc: "One-tap emergency reporting with location auto-detection, live status tracking, and multilingual support.",
    tag: "REAL-TIME",
    tagColor: "text-accent",
    tagBg: "bg-accent-muted",
  },
  {
    icon: Activity,
    iconColor: "#00d97e",
    iconBg: "#00d97e10",
    title: "Incident Analytics",
    desc: "Historical pattern recognition, heatmaps, and predictive risk scoring to prevent incidents before they happen.",
    tag: "AI-POWERED",
    tagColor: "text-resolved",
    tagBg: "bg-resolved-muted",
  },
  {
    icon: Users,
    iconColor: "#4a9eff",
    iconBg: "#4a9eff10",
    title: "Role-Based Dashboards",
    desc: "Tailored interfaces for guests, staff, and admins — each seeing exactly what they need, nothing they don't.",
    tag: "SECURITY",
    tagColor: "text-critical",
    tagBg: "bg-critical-muted",
  },
];

function Features() {
  return (
    <div className="mt-48 max-w-7xl mx-auto">
      <h1 className="text-center text-7xl font-serif bg-gradient-to-r from-resolved to-accent pb-2 bg-clip-text text-transparent">
        Designed for the Best Outcomes
      </h1>
      <p className="text-center text-lg text-text-secondary brightness-150 mt-8 mx-auto w-[500px]">
        Every feature is engineered to shave seconds off response time — because
        in emergencies, seconds save lives.
      </p>
      <div className=" mt-24  grid grid-cols-3 gap-8 ">
        {features.map((item) => (
          <Card
            title={item.title}
            desc={item.desc}
            iconBg={item.iconBg}
            icon={item.icon}
            tag={item.tag}
            tagColor={item.tagColor}
            tabBg={item.tagBg}
          />
        ))}
      </div>
    </div>
  );
}

export default Features;
