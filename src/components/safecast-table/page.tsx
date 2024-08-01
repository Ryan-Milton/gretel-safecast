import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function DemoPage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["measurements"],
    queryFn: () =>
      fetch(
        `api/measurements?api_key=${
          import.meta.env.VITE_SAFECAST_API_KEY
        }&format=json`
      ).then((res) => res.json()),
  });

  // TODO: Move pending over to the table and add Skeletons

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        isPending={isPending}
        isError={isError}
        error={error}
      />
    </div>
  );
}
