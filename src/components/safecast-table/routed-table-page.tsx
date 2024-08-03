import { columns } from "./routed-columns";
import { DataTable } from "./data-table";

export default function RoutedTablePage() {
  return (
    <div className="container mx-auto pb-4">
      <h1 className="text-3xl font-semibold mb-4">Safecast Data</h1>
      <DataTable columns={columns} />
    </div>
  );
}
