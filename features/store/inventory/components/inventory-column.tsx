"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { getAllInventory } from "../server/inventory.query";

export type InventoryColumnType = Awaited<
  ReturnType<typeof getAllInventory>
>[number];

export const inventoryColumn: ColumnDef<InventoryColumnType>[] = [
  {
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
  },
  {
    accessorKey: "product.name", // Added accessorKey so TanStack Table knows how to sort this column
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-start gap-2">
          <Image
            height={40}
            width={40}
            className="rounded-lg object-cover size-10"
            src={
              (row.original.product.images && row.original.product.images[0]) ||
              "/images/dummy-img.jpg"
            }
            alt={"product img"}
          />
          <div className="truncate">
            <div>{row.original.product.name}</div>
            <div className="text-muted-foreground">{row.original.label}</div>
          </div>
        </div>
      );
    },
  },
  {
    id: "price", // Explicit ID for columns using custom sorting logic
    accessorFn: (row) => {
      // Added accessorFn so TanStack Table can calculate and sort by the final calculated price
      const { basePrice, discountInPercent } = row.product;
      return basePrice * (1 - discountInPercent / 100) + row.priceDiff;
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const { basePrice, discountInPercent } = row.original.product;
      return (
        <div>
          {basePrice * (1 - discountInPercent / 100) + row.original.priceDiff}
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0"
        >
          SKU
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "stock", // Added accessorKey to make the stock numeric value sortable
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0"
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const stock = row.original.stock;
      const trackInventory = row.original.product.trackInventory;
      return (
        <div>
          {!trackInventory ? (
            <Badge variant={stock === 0 ? "destructive" : "default"}>
              {stock > 0 ? "In stock" : "Out of stock"}
            </Badge>
          ) : stock > 0 ? (
            stock
          ) : (
            <Badge variant={"destructive"}>{"Out of stock"}</Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ColumnDropdownMenu row={row} />;
    },
  },
];

function ColumnDropdownMenu({ row }: { row: Row<InventoryColumnType> }) {
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
            <DropdownMenuItem
              render={
                <Link
                  href={`/store/products/${row.original.product.id}/update`}
                />
              }
            >
              Update product
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
