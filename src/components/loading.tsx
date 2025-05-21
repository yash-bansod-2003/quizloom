import { Icons } from "@/components/icons";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Icons.spinner className="w-10 h-10 animate-spin text-gray-500" />
    </div>
  );
};
