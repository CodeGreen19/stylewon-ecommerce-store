"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { calculatePrice } from "@/helpers/caculations";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  createSelectionColumn,
  ShortableHeaderButton,
} from "../../shared/components/shared-column";
import { getAllInventory } from "../server/inventory.query";

export type InventoryColumnType = Awaited<
  ReturnType<typeof getAllInventory>
>[number];

export const inventoryColumn: ColumnDef<InventoryColumnType>[] = [
  createSelectionColumn<InventoryColumnType>(),
  {
    accessorKey: "product.name",
    header: (ctx) => <ShortableHeaderButton context={ctx} title="Name" />,

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
          <div>
            <div className="truncate">{row.original.product.name}</div>
            <div className="text-muted-foreground">{row.original.label}</div>
          </div>
        </div>
      );
    },
  },
  {
    id: "price",
    accessorFn: (row) => {
      const { basePrice, discountInPercent } = row.product;
      return basePrice * (1 - discountInPercent / 100) + row.priceDiff;
    },
    header: (ctx) => <ShortableHeaderButton context={ctx} title="Price" />,

    cell: ({ row }) => {
      const { basePrice, discountInPercent } = row.original.product;
      return (
        <div>
          {calculatePrice(basePrice, discountInPercent, row.original.priceDiff)}
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: (ctx) => <ShortableHeaderButton context={ctx} title="SKU" />,
  },
  {
    accessorKey: "stock",
    header: (ctx) => <ShortableHeaderButton context={ctx} title="Stock" />,

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
