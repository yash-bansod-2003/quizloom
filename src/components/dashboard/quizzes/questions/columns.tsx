import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { priorities } from "./data";
import { Badge } from "@/components/ui/badge";

import { z } from "zod";

export const questionSchema = z.object({
  id: z.string(),
  text: z.string(),
  points: z.number(),
  type: z.enum([
    "mcq",
    "trueFalse",
    "multiSelect",
    "written",
    "video",
    "rating",
    "fileUpload",
    "ranking",
    "matrix",
  ]),
  difficulty: z.enum(["high", "low", "medium"]),
  tags: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Question = z.infer<typeof questionSchema>;

export const columns: ColumnDef<Question>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {(row.getValue("id") as string).slice(0, 6)}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "text",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Question" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {(row.getValue("text") as string).slice(0, 50)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const typeLabels: Record<string, string> = {
        mcq: "Multiple Choice",
        trueFalse: "True/False",
        multiSelect: "Multi Select",
        written: "Written",
        video: "Video",
        rating: "Rating",
        fileUpload: "File Upload",
        ranking: "Ranking",
        matrix: "Matrix",
      };

      return (
        <div className="flex w-[120px] items-center">
          <span className="text-sm">{typeLabels[type] || type}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "difficulty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Difficulty" />
    ),
    cell: ({ row }) => {
      const difficulty = row.getValue("difficulty") as string;
      const difficultyConfig = priorities.find(
        (priority) => priority.value === difficulty,
      );

      if (!difficultyConfig) {
        return <span className="capitalize">{difficulty}</span>;
      }

      return (
        <div className="flex w-[100px] items-center">
          {difficultyConfig.icon && (
            <difficultyConfig.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span className="capitalize">{difficultyConfig.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "tags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];

      if (!tags || tags.length === 0) {
        return <span className="text-muted-foreground">No tags</span>;
      }

      return (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {tags.slice(0, 1).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 1 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 1}
            </Badge>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const dateString = row.getValue("createdAt") as string;
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return (
        <div className="flex space-x-2">
          <span className="max-w-[120px] truncate font-medium">
            {formattedDate}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => {
      const dateString = row.getValue("updatedAt") as string;
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return (
        <div className="flex space-x-2">
          <span className="max-w-[120px] truncate font-medium">
            {formattedDate}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
