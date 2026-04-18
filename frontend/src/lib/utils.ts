import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (
  timestamp: string,
  responseTime?: number,
  bool?: boolean,
) => {
  const date = new Date(
    new Date(timestamp).getTime() + (responseTime || 0) * 1000,
  );
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: bool ?? true,
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

export const getDayNumber = (num: number) => {
  switch (num) {
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    case 7:
      return "Sun";

    default:
      break;
  }
};

export const getAverageTime = (time: number | string) => {
  const minutes = Math.floor(Number(time) / 60);
  const hours = Math.floor(Number(time) / (60 * 60));
  const days = Math.floor(Number(time) / (60 * 60 * 24));
  if (hours >= 1) return `${hours} hours`;
  if (minutes >= 1) return `${minutes} minutes`;
  if (days >= 1) return `${days} days`;

  return `${time} s`;

  //   const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
};
