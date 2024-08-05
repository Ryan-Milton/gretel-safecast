import { useQuery } from "@tanstack/react-query";

const useDetailedData = ({
  expanded = true,
  measurement_id,
  user_id,
  device_id,
  measurement_import_id,
}: {
  expanded?: boolean;
  measurement_id: number;
  user_id: number;
  device_id: number | null;
  measurement_import_id: number | null;
}) => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: [
      "measurement_details",
      measurement_id,
      user_id,
      device_id,
      measurement_import_id,
    ],
    queryFn: async () => {
      const measurement_data = await fetch(
        `api/measurements/${measurement_id}?api_key=${
          import.meta.env.VITE_SAFECAST_API_KEY
        }&format=json&id=${measurement_id}`
      ).then((res) => res.json());
      const user_data = await fetch(
        `api/users/${user_id}?api_key=${
          import.meta.env.VITE_SAFECAST_API_KEY
        }&format=json&id=${user_id}`
      ).then((res) => res.json());
      const bgeigie_import_data =
        measurement_import_id !== null
          ? await fetch(
              `api/bgeigie_imports/${measurement_import_id}?api_key=${
                import.meta.env.VITE_SAFECAST_API_KEY
              }&format=json&id=${measurement_import_id}`
            ).then((res) => res.json())
          : null;
      const device_data =
        device_id !== null
          ? await fetch(
              `api/devices/${device_id}?api_key=${
                import.meta.env.VITE_SAFECAST_API_KEY
              }&format=json&id=${device_id}`
            ).then((res) => res.json())
          : null;
      return { measurement_data, user_data, bgeigie_import_data, device_data };
    },
    enabled: expanded,
  });
  return { isPending, isError, data, error, refetch };
};

export default useDetailedData;

export const fetchLocationName = (
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

// using standard fetch because calling a hook (react-query) inside the loader breaks react
export const fetchMeasurementDetails = async (measurementId: string) => {
  const measurement_data = await fetch(
    `/api/measurements/${measurementId}?api_key=${
      import.meta.env.VITE_SAFECAST_API_KEY
    }&format=json&id=${measurementId}`
  ).then((res) => res.json());
  return measurement_data;
};

export const fetchDeviceData = async (deviceData: string) => {
  const device_data = await fetch(
    `/api/devices/${deviceData}?api_key=${
      import.meta.env.VITE_SAFECAST_API_KEY
    }&format=json&id=${deviceData}`
  ).then((res) => res.json());
  return device_data;
};

export const fetchUserData = async (userId: string) => {
  const user_data = await fetch(
    `/api/users/${userId}?api_key=${
      import.meta.env.VITE_SAFECAST_API_KEY
    }&format=json&id=${userId}`
  ).then((res) => res.json());
  return user_data;
};

export const fetchBgeigieImportData = async (measurementImportId: string) => {
  const bgeigie_import_data = await fetch(
    `/api/bgeigie_imports/${measurementImportId}?api_key=${
      import.meta.env.VITE_SAFECAST_API_KEY
    }&format=json&id=${measurementImportId}`
  ).then((res) => res.json());
  return bgeigie_import_data;
};
