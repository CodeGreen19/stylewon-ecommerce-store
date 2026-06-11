"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductCard } from "../../shared/components/product-card";
import React from "react";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "../server/products.action";

export function ProductsPage() {
  return (
    <div className="max-w-7xl m-auto ">
      <div className="flex ">
        <ProductsFilter />
        <ProductsListings />
      </div>
    </div>
  );
}
function ProductsFilter() {
  return <div className="w-56 border hidden md:block">filter </div>;
}
function ProductsListings() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (status === "pending") return null;
  if (status === "error") {
    return (
      <p className="p-8 text-xs text-neutral-400">
        Error: {(error as Error).message}
      </p>
    );
  }

  // Prevent runtime error if data or data.pages is undefined
  const pages = data?.pages ?? [];

  return (
    <div className="flex-1 px-4">
      <h1 className="py-5 text-2xl font-bold">Products </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </React.Fragment>
        ))}
        <div className="mt-20 flex justify-center py-4 text-[10px] tracking-widest uppercase text-neutral-400">
          {hasNextPage ? (
            <Button onClick={() => fetchNextPage()}>Load more</Button>
          ) : isFetchingNextPage ? (
            <span className="animate-pulse">Loading</span>
          ) : (
            !hasNextPage && (
              <span className="opacity-50">End of Collection</span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
