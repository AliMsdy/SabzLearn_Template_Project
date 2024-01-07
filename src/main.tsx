import { Suspense, lazy } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MainContext } from "./context/index.tsx";

import "./styles/index.css";

import { Loading } from "./Components/index.ts";

const App = lazy(() => import("./App.tsx")); // eslint-disable-line

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: true,
      // retry:2,
      // retryDelay:5000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MainContext>
        <Suspense fallback={<Loading />}>
          <App />
        </Suspense>
      </MainContext>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>,
);
