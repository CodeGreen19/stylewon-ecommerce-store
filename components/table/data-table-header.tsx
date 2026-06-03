"use client";
import { type Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Filter, Search, SearchIcon, X } from "lucide-react";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTableHeader<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const [isSearch, setIsSearch] = useState(false);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-17.5 rounded-sm">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent
            alignItemWithTrigger={false}
            align="start"
            className="rounded-sm"
          >
            {[10, 20, 25, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          <Button
            variant={"secondary"}
            size={"icon-lg"}
            className={"rounded-sm"}
          >
            <Filter />
          </Button>
          <Button
            variant={"secondary"}
            size={"icon-lg"}
            className={"rounded-sm"}
            onClick={() => setIsSearch(true)}
          >
            <Search />
          </Button>
        </div>
      </div>
      {isSearch && (
        <InputGroup className="rounded-sm">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon
            onClick={() => setIsSearch(false)}
            align="inline-end"
            className="cursor-pointer"
          >
            <X />
          </InputGroupAddon>
        </InputGroup>
      )}
    </div>
  );
}
