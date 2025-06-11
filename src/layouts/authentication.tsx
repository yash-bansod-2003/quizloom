import * as React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Loading } from "@/components/loading";
import { useGetSessionQuery } from "@/services/authentication";

export default function AuthenticationLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: session, isLoading } = useGetSessionQuery();

  React.useEffect(() => {
    if (session && !isLoading) {
      const params = new URLSearchParams(location.search);
      const redirectTo = params.get("redirectTo");
      navigate(redirectTo || "/dashboard");
    }
  }, [navigate, location, session, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main className="flex h-full justify-center items-center">
      <Outlet />
    </main>
  );
}
