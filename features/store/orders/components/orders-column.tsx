"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  createSelectionColumn,
  ShortableHeaderButton,
} from "../../shared/components/shared-column";
import { getOrders } from "../server/orders.query";
import { useState } from "react";
import { ViewDetailsSheet } from "./view-details-sheet";
import { UpdateStatusDialog } from "./update-status-dialog";

export type OrdersColumnType = Awaited<ReturnType<typeof getOrders>>[number];

export const ordersColumn: ColumnDef<OrdersColumnType>[] = [
  createSelectionColumn<OrdersColumnType>(),
  {
    accessorKey: "fullName",
    header: (ctx) => (
      <ShortableHeaderButton context={ctx} title="Customer Name" />
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: (ctx) => (
      <ShortableHeaderButton context={ctx} title="Phone Number" />
    ),
  },
  {
    accessorKey: "status",
    header: (ctx) => <ShortableHeaderButton context={ctx} title="Status" />,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return <ColumnDropdownMenu row={row} />;
    },
  },
];

function ColumnDropdownMenu({ row }: { row: Row<OrdersColumnType> }) {
  const [updateStatus, setUpdateStatus] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          }
        ></DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setUpdateStatus(true)}>
              Update Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setViewDetails(true)}>
              View Details
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ViewDetailsSheet
        orderId={row.original.id}
        open={viewDetails}
        setOpen={setViewDetails}
      />
      <UpdateStatusDialog
        open={updateStatus}
        setOpen={setUpdateStatus}
        orderId={row.original.id}
      />
    </div>
  );
}
