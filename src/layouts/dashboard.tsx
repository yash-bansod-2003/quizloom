import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <main className="flex h-full justify-center items-center">
      <Outlet />
    </main>
  );
}
