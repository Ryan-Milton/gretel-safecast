import App from "@/App";
import { createFileRoute } from "@tanstack/react-router";
import DetailsPage from "@/components/details-page";

export const Route = createFileRoute("/routed-table/$measurementId/")({
  // In a loader
  // loader: ({ params }) => fetchPost(params.postId),
  // Or in a component
  notFoundComponent: () => {
    return <p>Post not found</p>;
  },
  component: () => (
    <App>
      <DetailsPage />
    </App>
  ),
});
