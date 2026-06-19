"use client";

import * as React from "react";
import { Autocomplete } from "@base-ui/react/autocomplete";
import { useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";

import Image from "next/image";
import { DUMMY_IMAGE } from "@/constants/dummy";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getProductsByQuery } from "../server/search.query";

type Product = Awaited<ReturnType<typeof getProductsByQuery>>[number];

export function ProductSearch() {
  const [query, setQuery] = React.useState("");
  const router = useRouter();

  const [debounced] = useDebounceValue(query, 300);

  const {
    data = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["products", debounced],
    queryFn: () => getProductsByQuery(debounced),
    enabled: debounced.length > 1,
  });

  return (
    <div className="w-full">
      <Autocomplete.Root<Product>
        items={data}
        value={query}
        onValueChange={setQuery}
        itemToStringValue={(item) => item.name}
        filter={null}
      >
        <div className="relative">
          <Autocomplete.Input
            placeholder="Search products..."
            className="h-10 w-full min-w-0 border border-transparent border-b-input bg-transparent py-1 text-base transition-[color,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-b-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-b-destructive md:text-sm dark:aria-invalid:border-b-destructive/50 px-7 "
          />
          <Search className="absolute left-1 top-2.5 size-4" />
          <X
            onClick={() => setQuery("")}
            className="absolute right-1 top-2.5 size-4"
          />
        </div>

        <Autocomplete.Portal
          className="z-100"
          hidden={query.length < 2 && !isPending && !error && data.length === 0}
        >
          <Autocomplete.Positioner sideOffset={4} className="outline-none">
            <Autocomplete.Popup className="w-(--anchor-width) overflow-hidden border bg-background shadow-md z-100">
              <div className="max-h-80 overflow-y-auto">
                {/* Loading */}
                {isPending && <SearchProductSkeleton count={5} />}

                {/* Error */}
                {error && (
                  <div className="p-3 text-sm text-destructive">
                    Failed to load products.
                  </div>
                )}

                {/* Empty */}
                {!isPending &&
                  !error &&
                  query.length > 1 &&
                  data.length === 0 && (
                    <div className="p-3 text-sm text-muted-foreground">
                      No products found.
                    </div>
                  )}

                <Autocomplete.List>
                  {(product) => (
                    <Autocomplete.Item
                      key={product.id}
                      value={product}
                      onClick={() => router.push(`/products/${product.id}`)}
                      className="
                        cursor-pointer
                        px-3
                        py-2
                        outline-none
                      "
                    >
                      <div className="flex flex-row gap-2 items-center justify-start">
                        <Image
                          src={product.images[0] || DUMMY_IMAGE}
                          height={30}
                          width={30}
                          className="size-8 object-cover"
                          alt="search-img"
                        />
                        <div className="flex items-start justify-center flex-col">
                          <span className="font-medium text-base truncate">
                            {product.name}
                          </span>
                          <span className="text-xs">
                            &#2547;{product.basePrice}
                          </span>
                        </div>
                      </div>
                    </Autocomplete.Item>
                  )}
                </Autocomplete.List>
              </div>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
    </div>
  );
}

export function SearchProductSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3 w-full p-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex flex-row gap-2 items-center justify-start"
        >
          <Skeleton className="size-8  shrink-0" />
          <div className="flex flex-col gap-1 w-full">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
