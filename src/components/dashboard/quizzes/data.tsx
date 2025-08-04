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
    value: "DRAFT",
    label: "Draft",
    icon: Circle,
  },
  {
    value: "LIVE",
    label: "Live",
    icon: Play,
  },
  {
    value: "PAUSED",
    label: "Paused",
    icon: Pause,
  },
  {
    value: "SCHEDULED",
    label: "Scheduled",
    icon: Calendar,
  },
  {
    value: "CLOSED",
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
