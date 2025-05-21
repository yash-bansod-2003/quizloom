import * as React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export default function AuthenticationLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      const params = new URLSearchParams(location.search);
      const redirectTo = params.get("redirectTo");
      navigate(redirectTo || "/dashboard");
    }
  }, [user, navigate, location]);

  return (
    <main className="flex h-full justify-center items-center">
      <Outlet />
    </main>
  );
}
