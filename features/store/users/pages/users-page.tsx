import React, { Suspense } from "react";
import { getUsers } from "../server/user.server";

export function UsersPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShowUsers />
      </Suspense>
    </div>
  );
}

async function ShowUsers() {
  const { users } = await getUsers();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="p-2 border">
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
        </div>
      ))}
    </div>
  );
}
