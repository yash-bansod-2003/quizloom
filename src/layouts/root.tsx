import * as React from "react";
import { Outlet } from "react-router-dom";
import { profile } from "@/lib/http-client";
import { useAuth } from "@/hooks/use-auth";

export default function RootLayout() {
  const { user, login } = useAuth();

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profile();
        if (data) {
          login(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    if (!user) {
      fetchProfile();
    }
  }, [login, user]);

  return <Outlet />;
}
