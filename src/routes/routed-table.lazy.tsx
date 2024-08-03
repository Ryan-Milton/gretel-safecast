import { createLazyFileRoute } from "@tanstack/react-router";
import RoutedTablePage from "@/components/safecast-table/routed-table-page";
import App from "@/App";

export const Route = createLazyFileRoute("/routed-table")({
  component: () => (
    <App>
      <RoutedTablePage />
    </App>
  ),
});
