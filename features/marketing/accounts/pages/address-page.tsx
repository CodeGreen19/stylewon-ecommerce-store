import { Suspense } from "react";
import { AccountHeader } from "../components/account-header";
import { AddressInfo } from "../components/address-info";
import { AddressSkeleton } from "../components/address-skeleton";
import { getAddress } from "../server/address.query";

export function AddressPage() {
  return (
    <div>
      <AccountHeader
        label="Address"
        descriptions="View or edit you billing and shipping address"
      />
      <Suspense fallback={<AddressSkeleton />}>
        <AddressSection />
      </Suspense>
    </div>
  );
}

async function AddressSection() {
  const address = await getAddress();
  return <AddressInfo address={address.data} />;
}
