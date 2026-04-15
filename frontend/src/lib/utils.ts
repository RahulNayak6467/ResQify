import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (timestamp: string, responseTime?: number) => {
  const date = new Date(
    new Date(timestamp).getTime() + (responseTime || 0) * 1000,
  );
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

export const getResolutionTime = (
  createdAt: string,
  resolvedAt: string,
): number => {
  const created = new Date(createdAt);
  const resolved = new Date(resolvedAt);

  const diffMs = resolved.getTime() - created.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  //   const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (hours >= 1) return hours;
  if (minutes >= 1) return minutes;
  return 1;
};
