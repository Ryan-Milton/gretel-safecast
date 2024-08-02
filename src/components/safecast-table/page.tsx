import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Page() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} />
    </div>
  );
}
