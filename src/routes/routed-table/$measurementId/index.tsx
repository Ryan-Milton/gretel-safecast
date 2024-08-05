import App from "@/App";
import { createFileRoute } from "@tanstack/react-router";
import DetailsPage from "@/components/details-page";
import {
  fetchMeasurementDetails,
  fetchDeviceData,
  fetchUserData,
  fetchBgeigieImportData,
} from "@/lib/data";

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
  component: () => (
    <App>
      <DetailsPage />
    </App>
  ),
});
