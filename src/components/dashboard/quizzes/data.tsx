import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Circle,
  Play,
  Pause,
  Calendar,
  Archive,
} from "lucide-react";

export const statuses = [
  {
    value: "draft",
    label: "Draft",
    icon: Circle,
  },
  {
    value: "live",
    label: "Live",
    icon: Play,
  },
  {
    value: "paused",
    label: "Paused",
    icon: Pause,
  },
  {
    value: "scheduled",
    label: "Scheduled",
    icon: Calendar,
  },
  {
    value: "closed",
    label: "Closed",
    icon: Archive,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
];
