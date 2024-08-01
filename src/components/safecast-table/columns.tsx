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
        <AccordionItem value={row.getIsExpanded()}>
          <AccordionTrigger
            onClick={() => row.toggleExpanded()}
          ></AccordionTrigger>
          <AccordionContent>
            <div>Sub Content</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    accessorKey: "captured_at",
    header: "Date and Time",
  },
  {
    accessorKey: "value",
    header: "Measurement",
  },
  {
    accessorKey: "unit",
    header: "Type",
  },
  {
    accessorFn: (row) =>
      row.location_name || `${row.latitude}, ${row.longitude}`,
    header: "Location",
  },
];
