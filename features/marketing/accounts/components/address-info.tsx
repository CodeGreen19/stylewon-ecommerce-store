"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditIcon, Plus } from "lucide-react";
import { getAddress } from "../server/address.query";
import { useState } from "react";
import { AddressForm } from "./address-form";

export type AddressDBType = {
  address: Awaited<ReturnType<typeof getAddress>>["data"];
};

export function AddressInfo({ address }: AddressDBType) {
  const [onEdit, setOnEdit] = useState(false);
  return onEdit ? (
    <Card>
      <CardContent>
        <AddressForm
          address={address}
          onCancel={() => setOnEdit(false)}
          onSuccess={() => setOnEdit(false)}
        />
      </CardContent>
    </Card>
  ) : (
    <AddressView address={address} onEdit={() => setOnEdit(true)} />
  );
}

function AddressView({
  address,
  onEdit,
}: AddressDBType & { onEdit: () => void }) {
  if (!address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No address provided</CardTitle>
          <CardAction>
            <Button onClick={onEdit}>
              <Plus /> Add Address
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    );
  }
  return (
    <Card className="rounded-none">
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <Item label="Full Name" value={address.fullName} />

          <Item label="Phone" value={address.phone} />

          <Item label="District" value={address.district} />

          <Item label="Thana" value={address.thana} />

          <Item label="Postal Code" value={address.postalCode} />

          <Item label="Location" value={address.receivingLocation} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onEdit}>
          Edit <EditIcon />
        </Button>
      </CardFooter>
    </Card>
  );
}

function Item({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}
