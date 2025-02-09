import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import RootLayout from "@/layouts/root";
import AppLayout from "@/layouts/app";
import AuthenticationLayout from "@/layouts/authentication";
import DashboardLayout from "@/layouts/dashboard";

import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";

import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";

import DashboardHomePage from "@/pages/dashboard/home";
import DashboardSettingsPage from "@/pages/dashboard/settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/about",
            element: <AboutPage />,
          },
        ],
      },
      {
        path: "",
        element: <AuthenticationLayout />,
        children: [
          {
            path: "/auth/login",
            element: <LoginPage />,
          },
          {
            path: "/auth/register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardHomePage />,
          },
          {
            path: "/dashboard/settings",
            element: <DashboardSettingsPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
