import { useGetSessionQuery } from "@/services/authentication";
import { Loading } from "@/components/loading";
import { Navigate, Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardPage() {
  const { isLoading, data: session } = useGetSessionQuery();

  if (!session && !isLoading) {
    return <Navigate to="/auth/login" replace />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
