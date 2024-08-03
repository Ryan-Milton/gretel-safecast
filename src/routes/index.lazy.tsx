import { createLazyFileRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "@/App";

const queryClient = new QueryClient();

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
