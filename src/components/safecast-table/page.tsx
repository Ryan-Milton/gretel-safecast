import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function DemoPage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      fetch(
        "https://api.safecast.org/en-US/measurements?api_key=nNokrY8XFpbUJ2ELwqXQ&format=json"
      ).then((res) => res.json()),
  });

  console.log(data);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
