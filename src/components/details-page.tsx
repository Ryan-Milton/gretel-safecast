import { useParams } from "@tanstack/react-router";

export default function DetailsPage() {
  const params = useParams({ from: "/routed-table/$measurementId/" });
  const { measurementId } = params;
  console.log(params);
  return <div>Measurement ID: {measurementId}</div>;
}
