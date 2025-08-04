import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Circle,
  Play,
  Pause,
  Calendar,
  Archive,
  CheckSquare,
  FileText,
  Video,
  Star,
  Upload,
  List,
  Grid,
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

export const questionTypes = [
  {
    value: "mcq",
    label: "Multiple Choice",
    icon: CheckSquare,
  },
  {
    value: "trueFalse",
    label: "True/False",
    icon: Circle,
  },
  {
    value: "multiSelect",
    label: "Multi Select",
    icon: CheckSquare,
  },
  {
    value: "written",
    label: "Written",
    icon: FileText,
  },
  {
    value: "video",
    label: "Video",
    icon: Video,
  },
  {
    value: "rating",
    label: "Rating",
    icon: Star,
  },
  {
    value: "fileUpload",
    label: "File Upload",
    icon: Upload,
  },
  {
    value: "ranking",
    label: "Ranking",
    icon: List,
  },
  {
    value: "matrix",
    label: "Matrix",
    icon: Grid,
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
