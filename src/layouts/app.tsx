import { SiteHeader } from "@/components/site-header";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </>
  );
}
