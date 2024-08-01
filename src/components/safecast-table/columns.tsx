import { ColumnDef } from "@tanstack/react-table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import useDetailedData from "@/lib/data";

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
  devicetype_id: number | null;
  sensor_id: number | null;
  station_id: number | null;
  channel_id: number | null;
  latitude: number | null;
  longitude: number | null;
  subRows: MeasurementData[];
};

export const columns: ColumnDef<MeasurementData>[] = [
  {
    id: "expander",
    header: ({ table }) => (
      <div className="flex w-full flex-row items-center">
        <span className="w-1/3">Captured At</span>
        <span className="w-1/3">Value</span>
        <span className="w-1/3">Unit</span>
        <span className="">Location</span>
        <Button
          {...{
            onClick: table.getToggleAllRowsExpandedHandler(),
          }}
          variant="ghost"
        >
          {table.getIsAllRowsExpanded() ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const { isPending, isError, data, error } = useDetailedData({
        expanded: row.getIsExpanded(),
        measurement_id: row.original.id,
        user_id: row.original.user_id,
        device_id: row.original.device_id,
        measurement_import_id: row.original.measurement_import_id,
      });

      console.log(row.original);
      console.log({ isPending, isError, data, error });

      return (
        <Accordion
          key={row.id}
          type="single"
          collapsible
          value={row.getIsExpanded()}
        >
          <AccordionItem value={row.getIsExpanded()} className="border-b-0">
            <AccordionTrigger
              onClick={() => row.toggleExpanded()}
              className="hover:no-underline"
            >
              <div className="flex w-full flex-row items-center justify-between">
                <span className="w-48">{String(row.original.captured_at)}</span>
                <span className="w-48">{String(row.original.value)}</span>
                <span className="w-48">{String(row.original.unit)}</span>
                <span className="w-48">
                  {String(
                    row.original.location_name ||
                      `${row.original.latitude}, ${row.original.longitude}`
                  )}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {isPending ? (
                <div className="flex flex-row gap-4 w-full">
                  <div className="flex flex-col w-1/3 h-40 gap-4">
                    <Skeleton className="w-1/2 h-4" />
                    <Skeleton className="w-2/3 h-4" />
                    <Skeleton className="w-1/4 h-4" />
                    <Skeleton className="w-1/4 h-4" />
                  </div>
                  <div className="flex flex-col w-1/3 h-40 gap-4">
                    <Skeleton className="w-1/4 h-4" />
                    <Skeleton className="w-1/2 h-4" />
                    <Skeleton className="w-1/4 h-4" />
                    <Skeleton className="w-2/3 h-4" />
                  </div>
                  <Skeleton className="w-1/3 h-40" />
                </div>
              ) : isError ? (
                <span>Error: {error.message}</span>
              ) : (
                <div className="flex flex-row gap-4 w-full">
                  {/* this contasins user data, device data, and bgeigie import data */}
                  <div className="w-2/3 flex flex-row gap-4">
                    <div className="w-1/2">
                      <p></p>
                    </div>
                    <div className="w-1/2"></div>
                  </div>
                  {/* This is where the Map will go */}
                  <div className="w-1/3 flex flex-col">
                    <p>Location Name</p>
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    },
  },
];
