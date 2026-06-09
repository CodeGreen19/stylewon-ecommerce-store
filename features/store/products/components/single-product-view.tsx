"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { format } from "date-fns";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import {
  Boxes,
  DollarSign,
  Package,
  Weight,
  Warehouse,
  Edit,
} from "lucide-react";
import { getSingleProduct } from "../server/products.action";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Product = Awaited<ReturnType<typeof getSingleProduct>>[number];

export function SingleProductView({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] ?? "");

  const totalStock = useMemo(
    () => product.productVariants.reduce((acc, item) => acc + item.stock, 0),
    [product.productVariants],
  );

  const totalInventoryValue = useMemo(
    () =>
      product.productVariants.reduce(
        (acc, item) => acc + (product.basePrice + item.priceDiff) * item.stock,
        0,
      ),
    [product.productVariants, product.basePrice],
  );

  return (
    <div className="max-w-7xl m-auto space-y-6">
      {/* Header */}
      <Card className="p-0 md:ring-0 bg-background">
        <CardHeader className="p-4 md:p-0">
          <CardTitle className="text-2xl font-bold truncate">
            {product.name}
          </CardTitle>
          <CardDescription>
            single product description is here..
          </CardDescription>
          <CardAction>
            <Button
              nativeButton={false}
              render={<Link href={`/store/products/${product.id}/update`} />}
            >
              Update
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <CardTitle></CardTitle>

              <CardDescription
                dangerouslySetInnerHTML={{
                  __html: product.description || <div>No description !</div>,
                }}
              ></CardDescription>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.onSale && (
                <Badge variant="destructive">
                  {product.discountInPercent}% OFF
                </Badge>
              )}

              {product.trackInventory && (
                <Badge variant="secondary">Inventory Tracking</Badge>
              )}

              {product.manageOnOptions && (
                <Badge variant="outline">Managed By Options</Badge>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Gallery + Details */}

      <div className="grid gap-6 lg:grid-cols-[450px_1fr]">
        {/* Gallery */}

        <Card className="h-fit">
          <CardContent className="p-4">
            {product.images?.length ? (
              <div className="space-y-4">
                <AspectRatio ratio={1}>
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </AspectRatio>

                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image) => (
                    <button key={image} onClick={() => setSelectedImage(image)}>
                      <AspectRatio ratio={1}>
                        <Image
                          src={image}
                          alt="product-img"
                          fill
                          className={` border object-cover ${
                            image === selectedImage ? "ring-2 ring-primary" : ""
                          }`}
                        />
                      </AspectRatio>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <AspectRatio ratio={1}>
                <div className="flex h-full items-center justify-center  border border-dashed">
                  No Images
                </div>
              </AspectRatio>
            )}
          </CardContent>
        </Card>

        {/* Right Side */}

        <div className="space-y-6">
          {/* Pricing */}

          <Card>
            <CardHeader>
              <CardTitle>Pricing Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className=" border p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="size-4" />

                    <span className="text-sm text-muted-foreground">
                      Base Price
                    </span>
                  </div>

                  <p className="mt-2 text-3xl font-bold">
                    ৳{product.basePrice}
                  </p>
                </div>

                <div className=" border p-4">
                  <div className="flex items-center gap-2">
                    <Package className="size-4" />

                    <span className="text-sm text-muted-foreground">
                      Discount
                    </span>
                  </div>

                  <p className="mt-2 text-3xl font-bold">
                    {product.discountInPercent}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}

          <Card>
            <CardHeader>
              <CardTitle>Inventory Summary</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className=" border p-4">
                  <Boxes className="mb-2 size-5" />

                  <p className="text-sm text-muted-foreground">Variants</p>

                  <p className="text-2xl font-bold">
                    {product.productVariants.length}
                  </p>
                </div>

                <div className=" border p-4">
                  <Warehouse className="mb-2 size-5" />

                  <p className="text-sm text-muted-foreground">Total Stock</p>

                  <p className="text-2xl font-bold">{totalStock}</p>
                </div>

                <div className=" border p-4">
                  <DollarSign className="mb-2 size-5" />

                  <p className="text-sm text-muted-foreground">
                    Inventory Value
                  </p>

                  <p className="text-2xl font-bold">
                    ৳{totalInventoryValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Options */}

          <Card>
            <CardHeader>
              <CardTitle>Product Options</CardTitle>
            </CardHeader>

            <CardContent>
              {product.productOptions.length ? (
                <div className="space-y-5">
                  {product.productOptions.map((option) => (
                    <div key={option.id}>
                      <h4 className="font-medium">{option.title}</h4>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {option.values.map((value) => (
                          <Badge key={value.id} variant="outline">
                            {value.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No options configured</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Variants */}

      <Card>
        <CardHeader>
          <CardTitle>Product Variants</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Desktop */}

          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Variant</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price Diff</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>COGS</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {product.productVariants.map((variant) => (
                  <TableRow key={variant.id}>
                    <TableCell>{variant.label}</TableCell>

                    <TableCell>{variant.sku ?? "-"}</TableCell>

                    <TableCell>{variant.stock}</TableCell>

                    <TableCell>
                      +৳
                      {variant.priceDiff}
                    </TableCell>

                    <TableCell>
                      {variant.shippingWeight}
                      kg
                    </TableCell>

                    <TableCell>৳{variant.costOfGoods}</TableCell>

                    <TableCell>
                      <Badge variant={variant.active ? "default" : "secondary"}>
                        {variant.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile */}

          <div className="grid gap-3 lg:hidden">
            {product.productVariants.map((variant) => (
              <Card key={variant.id}>
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{variant.label}</h4>

                    <Badge>
                      {variant.stock}
                      Stock
                    </Badge>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>SKU: {variant.sku ?? "-"}</div>

                    <div>
                      Weight: {variant.shippingWeight}
                      kg
                    </div>

                    <div>
                      Price: +৳
                      {variant.priceDiff}
                    </div>

                    <div>COGS: ৳{variant.costOfGoods}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metadata */}

      <Card>
        <CardHeader>
          <CardTitle>Product Metadata</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Product ID</p>

              <p>{product.id}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Created At</p>

              <p>{format(product.createdAt, "PPP p")}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Updated At</p>

              <p>{format(product.updatedAt, "PPP p")}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Manage On Options</p>

              <p>{product.manageOnOptions ? "Enabled" : "Disabled"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
