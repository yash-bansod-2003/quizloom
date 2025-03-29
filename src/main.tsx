import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

function Loading() {
  return <div>Loading...</div>;
}

const RootLayout = lazy(() => import("@/layouts/root.js"));
const AppLayout = lazy(() => import("@/layouts/app"));
const AuthenticationLayout = lazy(() => import("@/layouts/authentication"));
const DashboardLayout = lazy(() => import("@/layouts/dashboard"));
const AdminLayout = lazy(() => import("@/layouts/admin"));

const LoginPage = lazy(() => import("@/pages/auth/login"));
const RegisterPage = lazy(() => import("@/pages/auth/register"));

const HomePage = lazy(() => import("@/pages/home"));
const AboutPage = lazy(() => import("@/pages/about"));

const DashboardHomePage = lazy(() => import("@/pages/dashboard/home"));
const DashboardSettingsPage = lazy(() => import("@/pages/dashboard/settings"));

const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
const QuizList = lazy(() => import("@/pages/admin/QuizList"));
const QuizEditor = lazy(() => import("@/pages/admin/QuizEditor"));
const Settings = lazy(() => import("@/pages/admin/Settings"));

const router = createBrowserRouter([
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
        ],
      },
      {
        path: "/admin",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: "quizzes",
            element: (
              <Suspense fallback={<Loading />}>
                <QuizList />
              </Suspense>
            ),
          },
          {
            path: "quizzes/new",
            element: (
              <Suspense fallback={<Loading />}>
                <QuizEditor />
              </Suspense>
            ),
          },
          {
            path: "quizzes/:id/edit",
            element: (
              <Suspense fallback={<Loading />}>
                <QuizEditor />
              </Suspense>
            ),
          },
          {
            path: "settings",
            element: (
              <Suspense fallback={<Loading />}>
                <Settings />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
);
