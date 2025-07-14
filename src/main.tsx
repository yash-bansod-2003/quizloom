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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <AuthContextProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthContextProvider>
      </Provider>
      ,
    </Suspense>
  </StrictMode>,
);
