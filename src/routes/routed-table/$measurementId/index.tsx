import App from "@/App";
import { createFileRoute } from "@tanstack/react-router";
import DetailsPage from "@/components/details-page";
import {
  fetchMeasurementDetails,
  fetchDeviceData,
  fetchUserData,
  fetchBgeigieImportData,
} from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/routed-table/$measurementId/")({
  loader: async ({ params }) => {
    const measurement_data = await fetchMeasurementDetails(
      params.measurementId
    );
    const { user_id, device_id, measurement_import_id } = measurement_data;
    console.log(user_id, device_id, measurement_import_id);
    const user_data = await fetchUserData(user_id);
    const bgeigie_import_data =
      measurement_import_id !== null
        ? await fetchBgeigieImportData(measurement_import_id)
        : null;
    const device_data =
      device_id !== null ? await fetchDeviceData(device_id) : null;
    return { measurement_data, user_data, bgeigie_import_data, device_data };
  },
  notFoundComponent: () => {
    return <p>Details not found</p>;
  },
  pendingComponent: () => (
    <div className="flex flex-row container mx-auto mt-4 p-4 rounded-md border">
      <div className="flex flex-col gap-6 w-1/2">
        <div className="flex gap-2 flex-col w-full">
          <Skeleton className="w-2/3 h-4" />
          <Skeleton className="w-2/5 h-4" />
          <Skeleton className="w-1/4 h-4" />
          <Skeleton className="w-1/2 h-4" />
        </div>
        <div className="flex gap-2 flex-col w-full">
          <Skeleton className="w-2/3 h-4" />
          <Skeleton className="w-2/5 h-4" />
          <Skeleton className="w-1/4 h-4" />
          <Skeleton className="w-1/2 h-4" />
        </div>
        <div className="flex gap-2 flex-col w-full">
          <Skeleton className="w-2/3 h-4" />
          <Skeleton className="w-2/5 h-4" />
          <Skeleton className="w-1/4 h-4" />
          <Skeleton className="w-1/2 h-4" />
        </div>
      </div>
      <div className="flex flex-col w-1/2">
        <Skeleton className="w-full h-80" />
      </div>
    </div>
  ),
  component: () => (
    <App>
      <DetailsPage />
    </App>
  ),
});
