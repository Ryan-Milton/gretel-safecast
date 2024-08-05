import { useLoaderData } from "@tanstack/react-router";
import MapComponent from "./map-component";
import { fetchLocationName } from "@/lib/data";
import dayjs from "dayjs";

export default function DetailsPage() {
  const loaderData = useLoaderData({ from: "/routed-table/$measurementId/" });
  console.log(loaderData);
  const { measurement_data, user_data, bgeigie_import_data, device_data } =
    loaderData;
  const { latitude, longitude, location_name } = measurement_data;
  const locationName = location_name
    ? location_name
    : fetchLocationName(latitude, longitude);
  const deviceData = () => {
    if (device_data?.status === 404 && !measurement_data?.devicetype_id) {
      if (
        typeof bgeigie_import_data !== "undefined" &&
        bgeigie_import_data !== null
      ) {
        return null;
      } else {
        return (
          <div className="text-left">
            <p className="font-semibold text-lg border-b">Device Info</p>
            <p>Device Not Found</p>
          </div>
        );
      }
    } else if (
      device_data?.status !== 404 &&
      !measurement_data?.devicetype_id &&
      !measurement_data?.device_id
    ) {
      if (
        typeof bgeigie_import_data !== "undefined" &&
        bgeigie_import_data !== null
      ) {
        return null;
      } else {
        return (
          <div className="text-left">
            <p className="font-semibold text-lg border-b">Device Info</p>
            <p>Device Not Found</p>
          </div>
        );
      }
    } else if (
      (device_data?.status !== 404 || device_data?.status === 404) &&
      measurement_data?.devicetype_id !== null
    ) {
      return (
        <div className="text-left">
          <p className="font-semibold text-lg border-b">Device Info</p>
          {!!measurement_data?.devicetype_id.includes(",") ? (
            measurement_data?.devicetype_id
              .split(",")
              .map((devicetype: string) => <p>{devicetype}</p>)
          ) : (
            <p>{measurement_data?.devicetype_id}</p>
          )}
        </div>
      );
    } else if (
      device_data?.status !== 404 &&
      !measurement_data?.devicetype_id
    ) {
      return (
        <div className="text-left">
          <p className="font-semibold text-lg border-b">Device Info</p>
          <p>Manufacture: {device_data?.manufacturer}</p>
          <p>Model: {device_data?.model}</p>
          <p>Sensor: {device_data?.sensor}</p>
        </div>
      );
    }
  };
  const bgeigieImportData = () => (
    <div className="flex flex-col w-full text-left truncate">
      {bgeigie_import_data !== null ? (
        <>
          <p className="font-semibold text-lg border-b">BGeigie Import Info</p>
          <p>
            Source URL:{" "}
            <a href={bgeigie_import_data?.source.url}>
              {bgeigie_import_data?.source.url}
            </a>
          </p>
          <p>MD5 Sum: {bgeigie_import_data?.md5sum}</p>
          <p>Status: {bgeigie_import_data?.status}</p>
          <p>Measurements Count: {bgeigie_import_data?.measurements_count}</p>
          {bgeigie_import_data?.map_id && (
            <p>Map ID: {bgeigie_import_data?.map_id}</p>
          )}
          <p>Status Details:</p>
          <ul>
            <li>
              Process File:{" "}
              {bgeigie_import_data?.status_details.process_file.toString()}
            </li>
            <li>
              Import BGeigie Logs:{" "}
              {bgeigie_import_data?.status_details.import_bgeigie_logs.toString()}
            </li>
            <li>
              Compute Lat/Lng:{" "}
              {bgeigie_import_data?.status_details.compute_latlng.toString()}
            </li>
            <li>
              Measurements Added:{" "}
              {bgeigie_import_data?.status_details.measurements_added.toString()}
            </li>
          </ul>
          <p>Approved: {bgeigie_import_data?.approved.toString()}</p>
          <p>
            Created At:{" "}
            {new Date(bgeigie_import_data?.created_at).toLocaleString()}
          </p>
          <p>
            Updated At:{" "}
            {new Date(bgeigie_import_data?.updated_at).toLocaleString()}
          </p>
          <p>Name: {bgeigie_import_data?.name}</p>
          {bgeigie_import_data?.description && (
            <p>Description: {bgeigie_import_data?.description}</p>
          )}
          <p>Lines Count: {bgeigie_import_data?.lines_count}</p>
          <p>Credits: {bgeigie_import_data?.credits}</p>
          {bgeigie_import_data?.height !== null && (
            <p>Height: {bgeigie_import_data?.height}</p>
          )}
          {bgeigie_import_data?.orientation && (
            <p>Orientation: {bgeigie_import_data?.orientation}</p>
          )}
          <p>Cities: {bgeigie_import_data?.cities}</p>
          <p>Subtype: {bgeigie_import_data?.subtype}</p>
          {bgeigie_import_data?.comment && (
            <p>Comment: {bgeigie_import_data?.comment}</p>
          )}
          <p>Rejected: {bgeigie_import_data?.rejected.toString()}</p>
          {bgeigie_import_data?.rejected_by && (
            <p>Rejected By: {bgeigie_import_data?.rejected_by}</p>
          )}
          {bgeigie_import_data?.approved_by && (
            <p>Approved By: {bgeigie_import_data?.approved_by}</p>
          )}
          {bgeigie_import_data?.would_auto_approve !== null && (
            <p>
              Would Auto Approve:{" "}
              {bgeigie_import_data?.would_auto_approve.toString()}
            </p>
          )}
          {bgeigie_import_data?.auto_apprv_no_zero_cpm !== null && (
            <p>
              Auto Approve No Zero CPM:{" "}
              {bgeigie_import_data?.auto_apprv_no_zero_cpm.toString()}
            </p>
          )}
          {bgeigie_import_data?.auto_apprv_no_high_cpm !== null && (
            <p>
              Auto Approve No High CPM:{" "}
              {bgeigie_import_data?.auto_apprv_no_high_cpm.toString()}
            </p>
          )}
          {bgeigie_import_data?.auto_apprv_gps_validity !== null && (
            <p>
              Auto Approve GPS Validity:{" "}
              {bgeigie_import_data?.auto_apprv_gps_validity.toString()}
            </p>
          )}
          {bgeigie_import_data?.auto_apprv_frequent_bgeigie_id !== null && (
            <p>
              Auto Approve Frequent BGeigie ID:{" "}
              {bgeigie_import_data?.auto_apprv_frequent_bgeigie_id.toString()}
            </p>
          )}
          {bgeigie_import_data?.auto_apprv_good_bgeigie_id !== null && (
            <p>
              Auto Approve Good BGeigie ID:{" "}
              {bgeigie_import_data?.auto_apprv_good_bgeigie_id.toString()}
            </p>
          )}
          {bgeigie_import_data?.version && (
            <p>Version: {bgeigie_import_data?.version}</p>
          )}
        </>
      ) : null}
    </div>
  );
  return (
    <div className="flex flex-row container mx-auto mt-4 p-4 rounded-md border">
      <div className="flex flex-col gap-4 w-1/2">
        <div className="text-left">
          <p className="font-semibold text-lg border-b">Measurement Info</p>
          <div className="flex gap-2">
            <p>Captured At:</p>
            <p>
              {dayjs(String(loaderData.measurement_data.captured_at)).format(
                "MM/DD/YYYY h:mm A"
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <p>Value:</p>
            <p>{String(loaderData.measurement_data.value)}</p>
          </div>
          <div className="flex gap-2">
            <p>Unit of Measure:</p>
            <p>{String(loaderData.measurement_data.unit)}</p>
          </div>
          <div className="flex gap-2">
            <p>Location:</p>
            <p>{locationName.data}</p>
          </div>
        </div>
        <div className="text-left">
          <p className="font-semibold text-lg border-b">Reporter Info</p>
          <p>Name: {user_data?.name}</p>
          <p>Measurement Count: {user_data?.measurements_count}</p>
        </div>
        {deviceData()}
        {bgeigieImportData()}
      </div>
      <div className="flex w-1/2 pl-4">
        <MapComponent lat={latitude} lon={longitude} height={"h-fill"} />
      </div>
    </div>
  );
}
