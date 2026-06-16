"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { getUsers } from "../server/user.server";
import {
  createSelectionColumn,
  ShortableHeaderButton,
} from "../../shared/components/shared-column";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

type UserType = Awaited<ReturnType<typeof getUsers>>[number];

export const userColumn: ColumnDef<UserType>[] = [
  createSelectionColumn<UserType>(),
  {
    accessorKey: "name",
    header: (ctx) => <ShortableHeaderButton context={ctx} title="Name" />,
  },
  {
    accessorKey: "email",
    header: (ctx) => <ShortableHeaderButton context={ctx} title="Email" />,
  },
  {
    accessorKey: "emailVerified",
    header: (ctx) => (
      <ShortableHeaderButton context={ctx} title="Email Status" />
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return <ColumnDropdownMenu row={row} />;
    },
  },
];

function ColumnDropdownMenu({ row }: { row: Row<UserType> }) {
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
            <DropdownMenuItem>Activity</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
