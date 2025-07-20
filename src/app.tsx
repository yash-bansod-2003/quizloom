import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Loading } from "@/components/loading";

const RootLayout = lazy(() => import("@/layouts/root.js"));
const AppLayout = lazy(() => import("@/layouts/app.js"));
const AuthenticationLayout = lazy(() => import("@/layouts/authentication"));
const DashboardLayout = lazy(() => import("@/layouts/dashboard"));

const LoginPage = lazy(() => import("@/pages/auth/login"));
const RegisterPage = lazy(() => import("@/pages/auth/register"));

const HomePage = lazy(() => import("@/pages/home"));
const AboutPage = lazy(() => import("@/pages/about"));

const DashboardHomePage = lazy(() => import("@/pages/dashboard/home"));
const DashboardQuizzesPage = lazy(() => import("@/pages/dashboard/quizzes"));
const DashboardSettingsPage = lazy(() => import("@/pages/dashboard/settings"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <AppLayout />
          </Suspense>
        ),
        children: [
          {
            path: "/",
            element: (
              <Suspense fallback={<Loading />}>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: "/about",
            element: (
              <Suspense fallback={<Loading />}>
                <AboutPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "",
        element: (
          <Suspense fallback={<Loading />}>
            <AuthenticationLayout />
          </Suspense>
        ),
        children: [
          {
            path: "/auth/login",
            element: (
              <Suspense fallback={<Loading />}>
                <LoginPage />
              </Suspense>
            ),
          },
          {
            path: "/auth/register",
            element: (
              <Suspense fallback={<Loading />}>
                <RegisterPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <DashboardLayout />
          </Suspense>
        ),
        children: [
          {
            path: "/dashboard",
            element: (
              <Suspense fallback={<Loading />}>
                <DashboardHomePage />
              </Suspense>
            ),
          },
          {
            path: "/dashboard/settings",
            element: (
              <Suspense fallback={<Loading />}>
                <DashboardSettingsPage />
              </Suspense>
            ),
          },
          {
            path: "/dashboard/quizzes",
            element: (
              <Suspense fallback={<Loading />}>
                <DashboardQuizzesPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
