import { cn } from "@/lib/utils";
import MapComponent from "../map-component";

export default function DetailedView(props: any) {
  const { data } = props;
  const { measurement_data, user_data, bgeigie_import_data, device_data } =
    data;
  const userData = () => (
    <div className="w-1/4">
      <p className="font-semibold border-b">Reporter Info</p>
      <p>Name: {user_data?.name}</p>
      <p>Measurement Count: {user_data?.measurements_count}</p>
    </div>
  );
  const bgeigieImportData = () => (
    <div className="flex flex-col w-full text-left truncate">
      {bgeigie_import_data !== null ? (
        <>
          <p className="font-semibold border-b">BGeigie Import Info</p>
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
  const deviceData = () => {
    if (device_data?.status === 404 && !measurement_data?.devicetype_id) {
      if (
        typeof bgeigie_import_data !== "undefined" &&
        bgeigie_import_data !== null
      ) {
        return null;
      } else {
        return (
          <div className="flex flex-col w-1/4">
            <p className="font-semibold border-b">Device Info</p>
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
          <div className="flex flex-col w-1/4">
            <p className="font-semibold border-b">Device Info</p>
            <p>Device Not Found</p>
          </div>
        );
      }
    } else if (
      (device_data?.status !== 404 || device_data?.status === 404) &&
      measurement_data?.devicetype_id !== null
    ) {
      return (
        <div className="flex flex-col w-1/4">
          <p className="font-semibold border-b">Device Info</p>
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
        <div className="flex flex-col w-1/4">
          <p className="font-semibold border-b">Device Info</p>
          <p>Manufacture: {data?.device_data?.manufacturer}</p>
          <p>Model: {data?.device_data?.model}</p>
          <p>Sensor: {data?.device_data?.sensor}</p>
        </div>
      );
    }
  };
  return (
    <div className="flex flex-row gap-4 w-full text-left px-4 truncate">
      {userData()}
      {deviceData()}
      <div className={cn(bgeigie_import_data !== null ? "w-1/4" : "")}>
        {bgeigieImportData()}
      </div>
      <div className="flex flex-col w-1/2">
        <MapComponent
          lat={measurement_data?.latitude}
          lon={measurement_data?.longitude}
          height={"h-80"}
        />
      </div>
    </div>
  );
}
