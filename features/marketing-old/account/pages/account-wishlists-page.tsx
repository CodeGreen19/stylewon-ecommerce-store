import { Button } from "@/components/ui/button";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Heart, ShoppingCart } from "lucide-react";

const wishlistItems = [
  {
    id: 1,
    name: "Minimal Sneakers",
    price: "$120",
  },
  {
    id: 2,
    name: "Oversized Hoodie",
    price: "$65",
  },
  {
    id: 3,
    name: "Classic Watch",
    price: "$240",
  },
];

export function AccountWishlistPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Wishlist</h1>

        <p className="text-muted-foreground text-sm">
          Products you saved for later.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="bg-muted aspect-square" />

            <CardContent className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-medium">{item.name}</h2>

                  <p className="text-muted-foreground text-sm">{item.price}</p>
                </div>

                <button className="text-muted-foreground transition-colors hover:text-red-500">
                  <Heart className="size-5 fill-current" />
                </button>
              </div>
            </CardContent>

            <CardFooter className="gap-2 p-4 pt-0">
              <Button className="flex-1">
                <ShoppingCart className="mr-2 size-4" />
                Add to Cart
              </Button>

              <Button variant="outline">Remove</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
