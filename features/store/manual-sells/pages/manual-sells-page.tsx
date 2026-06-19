import React from "react";
import { StorePageHeader } from "../../shared/components/store-page-header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ManualSellsPage() {
  return (
    <div>
      <StorePageHeader
        title="Manual Sells"
        description="All physical stores sold product should be listed here."
        action={
          <div>
            <Button
              nativeButton={false}
              render={<Link href={"/store/manual-sells/new"} />}
            >
              Sell New <ArrowRight />
            </Button>
          </div>
        }
      />
    </div>
  );
}
