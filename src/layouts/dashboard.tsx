import { MainNav } from "@/components/dashboard-nav";
import { UserNav } from "@/components/user-nav";
import { useGetSessionQuery } from "@/services/authentication";
import { Loading } from "@/components/loading";
import { Navigate, Outlet } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

export default function DashboardPage() {
  const { isLoading, data: session } = useGetSessionQuery();

  if (!session && !isLoading) {
    return <Navigate to="/auth/login" replace />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />
              {session?.user && <UserNav user={session.user} />}
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}
