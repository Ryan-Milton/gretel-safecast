import { createLazyFileRoute } from "@tanstack/react-router";
import App from "@/App";
import ExpandingTablePage from "@/components/safecast-table/expanding-table-page";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <App>
      <ExpandingTablePage />
    </App>
  ),
});
