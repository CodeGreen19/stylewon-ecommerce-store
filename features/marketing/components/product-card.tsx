"use client";

import { Badge } from "@/components/ui/badge";
import { Rating } from "react-simple-star-rating";
import Image from "next/image";
import Link from "next/link";
import { calculatePrice } from "@/helpers/caculations";
import { getProducts } from "../home/server/home.query";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductCardProps {
  product: Awaited<ReturnType<typeof getProducts>>[number];
}

export function ProductCard({ product }: ProductCardProps) {
  const imageSrc =
    product.images.length > 0 ? product.images[0] : "/svgs/empty-picture.svg";

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group z-10">
        <div className="overflow-hidden">
          <div
            className={`aspect-3/4 w-full transition-transform duration-300 group-hover:scale-105 bg-muted`}
          >
            <Image
              src={imageSrc}
              height={400}
              width={400}
              alt="product-img"
              className="h-full w-full object-cover "
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-base font-semibold md:text-lg truncate">
            {product.name}
          </h3>

          <ProductRating rating={5} />

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-bold md:text-2xl">
              &#2547;
              {calculatePrice(product.basePrice, product.discountInPercent, 0)}
            </span>

            {product.onSale && (
              <>
                <span className="text-base font-bold text-black/20 line-through md:text-xl">
                  &#2547;{product.basePrice}
                </span>

                <Badge variant={"destructive"} className="p-3 text-sm">
                  -{product.discountInPercent}%
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

interface ProductRatingProps {
  rating: number;
}

export function ProductRating({ rating }: ProductRatingProps) {
  return (
    <div className="flex items-center gap-2">
      <Rating
        SVGclassName="inline-block"
        size={20}
        iconsCount={1}
        initialValue={rating / 5}
        allowFraction
        readonly
      />
      <span className="text-sm text-black/60 translate-y-0.5">{rating}/5</span>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div>
      <div className="overflow-hidden">
        <Skeleton className="aspect-3/4 w-full bg-white" />
      </div>

      <div className="mt-4 space-y-2">
        <Skeleton className="h-6 w-3/4 bg-white" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-24 bg-white" />
          <Skeleton className="h-4 w-10 bg-white" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-8 w-24 bg-white" />

          <Skeleton className="h-8 w-20 bg-white" />

          <Skeleton className="h-7 w-14 rounded-md bg-white" />
        </div>
      </div>
    </div>
  );
}
