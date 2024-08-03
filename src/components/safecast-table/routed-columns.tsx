import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "../ui/skeleton";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export type MeasurementData = {
  id: number;
  user_id: number;
  value: number;
  unit: string;
  location_name: null | string;
  device_id: null | number;
  original_id: null | number;
  measurement_import_id: number | null;
  captured_at: string | null;
  height: number | null;
  devicetype_id: string | null;
  sensor_id: number | null;
  station_id: number | null;
  channel_id: number | null;
  latitude: number | null;
  longitude: number | null;
  subRows: MeasurementData[];
};

export const columns: ColumnDef<MeasurementData>[] = [
  {
    accessorKey: "captured_at",
    header: "Captured At",
    cell: ({ row }) => {
      return (
        <Link
          to="/routed-table/$measurementId"
          params={{ measurementId: `${row.original.id}` }}
          className="w-48 cursor-pointer"
        >
          {dayjs(String(row.original.captured_at)).format("MM/DD/YYYY h:mm A")}
        </Link>
      );
    },
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "unit",
    header: "Type",
  },
  {
    accessorKey: "location_name",
    header: "Location",
    cell: ({ row }) => {
      const fetchLocationName = (
        latitude: number | null,
        longitude: number | null
      ) => {
        const { isPending, isError, data, error } = useQuery({
          queryKey: ["location_name", latitude, longitude],
          queryFn: async () => {
            const response = await fetch(
              `/nominatim/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const json = await response.json();
            const { address } = json;

            if (!address) {
              return json.display_name;
            }

            const locationParts = [];

            if (address.hamlet) {
              locationParts.push(address.hamlet);
            } else if (address.city) {
              locationParts.push(address.city);
            } else if (address.province) {
              locationParts.push(address.province);
            } else if (address.suburb) {
              locationParts.push(address.suburb);
            }

            if (address.state) {
              locationParts.push(address.state);
            } else if (address.country) {
              locationParts.push(address.country);
            }

            return locationParts.length > 0
              ? locationParts.join(", ")
              : json.display_name;
          },
          enabled: latitude !== null && longitude !== null,
        });

        return { isPending, isError, data, error };
      };

      const locationName = fetchLocationName(
        row.original.latitude,
        row.original.longitude
      );

      return (
        <span className="w-48">
          {row.original.location_name && row.original.location_name}
          {!row.original.location_name && locationName.isPending && (
            <Skeleton className="w-48 h-4" />
          )}
          {!row.original.location_name &&
            locationName.data &&
            locationName.data}
        </span>
      );
    },
  },
];

// -----------------------------------------------------------------------------
// Detailed Data Fetch

// const { isPending, isError, data, error, refetch } = useDetailedData({
//   expanded: row.getIsExpanded(),
//   measurement_id: row.original.id,
//   user_id: row.original.user_id,
//   device_id: row.original.device_id,
//   measurement_import_id: row.original.measurement_import_id,
// });

// -----------------------------------------------------------------------------
