import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const createSelectionColumn = <TData,>(): ColumnDef<TData> => ({
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      indeterminate={table.getIsSomePageRowsSelected()}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
});

import { HeaderContext } from "@tanstack/react-table";
interface ShortableHeaderButtonProps<TData, TValue> {
  context: HeaderContext<TData, TValue>;
  title: string;
}

export const ShortableHeaderButton = <TData, TValue>({
  context,
  title,
}: ShortableHeaderButtonProps<TData, TValue>) => {
  const { column } = context;

  return (
    <Button
      className="pl-0"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};
