import { ColumnDef } from "@tanstack/react-table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

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
      const [isExpanded, setIsExpanded] = useState(false);

      // fetch measurement details and user details
      const { isPending, isError, data, error } = useQuery({
        queryKey: ["measurement_details"],
        queryFn: async () => {
          const measurement_data = await fetch(
            `${import.meta.env.VITE_MEASUREMENT_BASE_URL}/${
              row.original.id
            }?api_key=${import.meta.env.VITE_SAFECAST_API_KEY}&format=json&id=${
              row.original.id
            }`
          ).then((res) => res.json());
          const user_data = await fetch(
            `${import.meta.env.VITE_USER_BASE_URL}/${
              row.original.user_id
            }?api_key=${import.meta.env.VITE_SAFECAST_API_KEY}&format=json&id=${
              row.original.user_id
            }`
          ).then((res) => res.json());
          return { measurement_data, user_data };
        },
        enabled: isExpanded,
      });

      const handleToggleExpanded = () => {
        setIsExpanded(!isExpanded);
        row.toggleExpanded();
      };

      console.log("isExpanded", isExpanded);
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
              onClick={() => handleToggleExpanded()}
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
              <div>Sub Content</div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    },
  },
];
