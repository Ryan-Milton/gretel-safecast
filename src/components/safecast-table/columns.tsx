import { ColumnDef } from "@tanstack/react-table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
      <Button
        {...{
          onClick: table.getToggleAllRowsExpandedHandler(),
        }}
        variant="ghost"
      >
        {table.getIsAllRowsExpanded() ? <ChevronUp /> : <ChevronDown />}
      </Button>
    ),
    cell: ({ row }) => (
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
            <div>Sub Content</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
];
