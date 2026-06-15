import { Button } from "@/components/ui/button";
import { FilterIcon, SlidersVertical } from "lucide-react";
import React from "react";

export function ProductsFilter() {
  return (
    <div className="">
      <div className="md:hidden">
        <MobileFilter />
      </div>
      <div className="hidden md:block md:mt-12">
        <DesktopFilter />
      </div>
    </div>
  );
}

function MobileFilter() {
  return (
    <Button className={"fixed bottom-17 right-4 z-10"}>
      Filter <SlidersVertical className="size-4" />
    </Button>
  );
}

function DesktopFilter() {
  return (
    <div className="md:w-75 w-full p-4 bg-white border self-start">
      <div className="flex items-center justify-between ">
        <span>Filter</span>
        <SlidersVertical className="size-4" />
      </div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore impedit
      voluptatem quasi dolorum animi numquam est iusto harum pariatur temporibus
      corporis illum nobis error ullam, adipisci aperiam fugit! Animi, sequi.
    </div>
  );
}
