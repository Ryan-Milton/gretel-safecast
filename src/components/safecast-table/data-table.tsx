import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MeasurementData } from "./columns";
import { useState } from "react";
import { Button } from "../ui/button";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface DataTableProps {
  columns: ColumnDef<MeasurementData>[];
  // data: MeasurementData[];
  // isPending: boolean;
  // isError: boolean;
  // error: any;
}

export function DataTable({ columns }: DataTableProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 25,
  });

  const fetchMeasurements = async (page: number) => {
    const response = await fetch(
      `api/measurements?api_key=${
        import.meta.env.VITE_SAFECAST_API_KEY
      }&format=json&page=${page + 1}` // Adjust for 0-indexed page
    );
    const data = await response.json();
    return data;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["data", pagination],
    queryFn: () => fetchMeasurements(pagination.pageIndex),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });

  console.log(data);

  const table = useReactTable({
    data: data || [],
    columns,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true, //we're doing manual "server-side" pagination
    debugTable: true,
    state: {
      pagination,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="py-0" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={pagination.pageIndex <= 1}
        >
          Previous
        </Button>
        <Button variant="ghost" size="sm" className="hover:cursor-default">
          {pagination.pageIndex}
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
