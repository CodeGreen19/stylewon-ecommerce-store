"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "../server/products.query";
import React from "react";
import {
  ProductCard,
  ProductCardSkeleton,
} from "../../components/product-card";
import { Button } from "@/components/ui/button";

export function ProductsListings() {
  return (
    <div>
      <div className="h-12 flex items-center justify-between">
        <h1 className="text-xl font-bold md:px-4">Category Name</h1>
      </div>
      <ProductsLists />
    </div>
  );
}

function ProductsLists() {
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

  if (status === "pending")
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-0 md:pl-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
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
    <div className="flex-1 md:pl-4 pl-0 ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </React.Fragment>
        ))}
      </div>
      <div className=" flex justify-center py-4 tracking-widest uppercase text-neutral-400">
        {hasNextPage ? (
          <Button onClick={() => fetchNextPage()}>Load more</Button>
        ) : isFetchingNextPage ? (
          <span className="animate-pulse">Loading</span>
        ) : (
          !hasNextPage && (
            <span className="opacity-50 text-sm">End of Collection</span>
          )
        )}
      </div>
    </div>
  );
}
