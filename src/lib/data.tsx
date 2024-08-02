import { useQuery } from "@tanstack/react-query";

const useDetailedData = ({
  expanded,
  measurement_id,
  user_id,
  device_id,
  measurement_import_id,
}: {
  expanded: boolean;
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
