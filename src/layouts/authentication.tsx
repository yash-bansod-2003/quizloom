import { Outlet } from "react-router-dom";

export default function AuthenticationLayout() {
  return (
    <main className="flex h-full justify-center items-center">
      <Outlet />
    </main>
  );
}
