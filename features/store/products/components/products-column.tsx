"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { getAllProducts } from "../server/products.query";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { DeleteProductDialog } from "./delete-product-dialog";

export type ProductColumnType = Awaited<
  ReturnType<typeof getAllProducts>
>[number];

export const productsColumn: ColumnDef<ProductColumnType>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className={"pl-0"}
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
            className=" object-cover size-10"
            src={
              (row.original.images && row.original.images[0]) ||
              "/images/dummy-img.jpg"
            }
            alt={"product img"}
          />
          <div>
            <div className="truncate">{row.original.name}</div>
            {row.original.productVariants.length > 0 &&
              !row.original.productVariants.some(
                (v) => v.label === "default",
              ) && (
                <div className="text-muted-foreground">
                  {row.original.productVariants.length} variants
                </div>
              )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "basePrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={"pl-0"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.basePrice}</div>;
    },
  },
  {
    id: "stock",
    // 1. Calculate stock totals so TanStack knows how to evaluate numeric values
    accessorFn: (row) =>
      row.productVariants.reduce((prev, curr) => prev + curr.stock, 0),
    // 2. Wrap the header with your layout sorting button
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={"pl-0"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // 3. Render the markup using the pre-calculated value from step 1
    cell: ({ getValue, row }) => {
      const stock = getValue<number>();
      const trackInventory = row.original.trackInventory;
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

function ColumnDropdownMenu({ row }: { row: Row<ProductColumnType> }) {
  const [deleteProduct, setDeleteProduct] = useState<ProductColumnType | null>(
    null,
  );
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
              render={<Link href={`/store/products/${row.original.id}/view`} />}
            >
              View in details
            </DropdownMenuItem>
            <DropdownMenuItem
              render={
                <Link href={`/store/products/${row.original.id}/update`} />
              }
            >
              Update
            </DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setDeleteProduct(row.original)}
              variant="destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteProductDialog
        deleteProduct={deleteProduct}
        closeDialog={() => setDeleteProduct(null)}
      />
    </div>
  );
}
