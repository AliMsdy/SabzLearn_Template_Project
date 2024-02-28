import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { MainContext } from "./context/index.tsx";

import "./styles/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus:false,
      retryDelay: 3000,
      gcTime: 30 * 60 * 1000, // half an hour caches the data (default : 5min)
      staleTime: 60 * 60 * 1000, // this option won't refetch teh data until the 60 mins(default: 0 second)
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MainContext>
        <App />
      </MainContext>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>,
);
