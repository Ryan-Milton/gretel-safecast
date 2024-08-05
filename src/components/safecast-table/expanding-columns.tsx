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
import useDetailedData, { fetchLocationName } from "@/lib/data";
import dayjs from "dayjs";
import { useEffect } from "react";
import DetailedView from "./detailed-view";
import { useQuery } from "@tanstack/react-query";
import { CalendarClock, ChartSpline, Earth, PencilRuler } from "lucide-react";
import Header from "./header";

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
    id: "expander",
    header: ({ table }) => (
      <div className="flex w-full flex-row items-center">
        <div className="w-1/3">
          <Header name="Captured At" icon={<CalendarClock size={16} />} />
        </div>
        <div className="w-1/3">
          <Header name="Value" icon={<ChartSpline size={16} />} />
        </div>
        <div className="w-1/3">
          <Header name="Unit of Measure" icon={<PencilRuler size={16} />} />
        </div>
        <div className="w-40">
          <Header name="Location" icon={<Earth size={16} />} />
        </div>
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
      const { isPending, isError, data, error, refetch } = useDetailedData({
        expanded: row.getIsExpanded(),
        measurement_id: row.original.id,
        user_id: row.original.user_id,
        device_id: row.original.device_id,
        measurement_import_id: row.original.measurement_import_id,
      });

      useEffect(() => {
        if (row.getIsExpanded()) {
          refetch();
        }
      }, [row.getIsExpanded(), refetch]);

      const handleToggleExpanded = () => {
        row.toggleExpanded();
      };

      const locationName = fetchLocationName(
        row.original.latitude,
        row.original.longitude
      );

      return (
        <Accordion
          key={row.id}
          type="single"
          collapsible
          value={row.getIsExpanded() ? "expanded" : ""}
        >
          <AccordionItem value="expanded" className="border-b-0">
            <AccordionTrigger
              onClick={handleToggleExpanded}
              className="hover:no-underline pr-4"
            >
              <div className="flex w-full flex-row items-center justify-between">
                <span className="w-1/3">
                  {dayjs(String(row.original.captured_at)).format(
                    "MM/DD/YYYY h:mm A"
                  )}
                </span>
                <span className="w-1/3">{String(row.original.value)}</span>
                <span className="w-1/3">{String(row.original.unit)}</span>
                <span className="w-52 truncate">
                  {row.original.location_name && row.original.location_name}
                  {!row.original.location_name && locationName.isPending && (
                    <Skeleton className="w-48 h-4" />
                  )}
                  {!row.original.location_name &&
                    locationName.data &&
                    locationName.data}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {isPending ? (
                <div className="flex flex-row gap-4 w-full p-4">
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
                <DetailedView data={data} />
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    },
  },
];
