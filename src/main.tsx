import "@fontsource-variable/inter";
import "./index.css";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/app";
import { Toaster } from "@/components/ui/sonner";
import { AuthContextProvider } from "@/hooks/use-auth";
import { Loading } from "@/components/loading";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/components/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <AuthContextProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
            <Toaster />
          </ThemeProvider>
        </AuthContextProvider>
      </Provider>
    </Suspense>
  </StrictMode>,
);
