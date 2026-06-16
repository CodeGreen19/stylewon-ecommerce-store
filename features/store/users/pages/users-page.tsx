import React, { Suspense } from "react";
import { getUsers } from "../server/user.server";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { DataTable } from "@/components/table/data-table";
import { userColumn } from "../components/users-column";
import { StorePageHeader } from "../../shared/components/store-page-header";

export function UsersPage() {
  return (
    <div className="space-y-3">
      <StorePageHeader title="Users" description=" Your registered users" />
      <Suspense fallback={<DataTableSkeleton />}>
        <ShowUsers />
      </Suspense>
    </div>
  );
}

async function ShowUsers() {
  const users = await getUsers();

  return <DataTable columns={userColumn} data={users} />;
}
