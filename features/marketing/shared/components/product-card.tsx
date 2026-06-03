"use client";

import { Badge } from "@/components/ui/badge";
import { Rating } from "react-simple-star-rating";

export interface Product {
  id: number;
  title: string;
  rating: number;
  price: number;
  oldPrice?: number;
  discount?: number;
}

export const products: Product[] = [
  {
    id: 1,
    title: "T-shirt with Tape Details",
    rating: 4.5,
    price: 120,
  },
  {
    id: 2,
    title: "Skinny Fit Jeans",
    rating: 2.5,
    price: 240,
    oldPrice: 260,
    discount: 20,
  },
  {
    id: 3,
    title: "Checkered Shirt",
    rating: 4.5,
    price: 180,
  },
  {
    id: 4,
    title: "Sleeve Striped T-shirt",
    rating: 4.5,
    price: 130,
    oldPrice: 160,
    discount: 30,
  },
];

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <div className="overflow-hidden rounded-[20px]">
        <div
          className={`aspect-3/4 w-full transition-transform duration-300 group-hover:scale-105 bg-muted`}
        />
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-base font-semibold md:text-lg truncate">
          {product.title}
        </h3>

        <ProductRating rating={product.rating} />

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold md:text-2xl">
            ${product.price}
          </span>

          {product.oldPrice && (
            <>
              <span className="text-lg font-bold text-black/40 line-through md:text-2xl">
                ${product.oldPrice}
              </span>

              <Badge variant={"destructive"} className="p-3 text-sm">
                {product.discount}%
              </Badge>
            </>
          )}
        </div>
      </div>
    </div>
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
