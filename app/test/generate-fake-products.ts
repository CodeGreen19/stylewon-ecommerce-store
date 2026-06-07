import { generateVariants } from "@/features/store/products/helpers/generate-variants";
import {
  ProductType,
  ProductOptionType,
  ProductVariantType,
  defaultProductVariant,
} from "@/features/store/products/schemas/product.schema";

const PRODUCT_NAMES = [
  "Premium Cotton T-Shirt",
  "Athletic Running Shoes",
  "Slim Fit Jeans",
  "Wireless Headphones",
  "Leather Wallet",
  "Sports Jacket",
  "Smart Watch",
  "Travel Backpack",
  "Casual Hoodie",
  "Gaming Mouse",
];

const DESCRIPTIONS = [
  "High-quality product designed for everyday use.",
  "Durable and comfortable with premium materials.",
  "Built for performance and long-lasting reliability.",
  "Modern design with excellent functionality.",
];

const IMAGE_PLACEHOLDERS = [
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1780629954/photo-1777793299588-8055f47cd20e_uuv0j4.jpg",
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1779496760/stylewon/irqodyvikf64c0nhjre7.png",
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1778419513/rqnrphn0no4vjltbnuvo.jpg",
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1768388660/cgg1o7sgjjk5bbzqmrtf.webp",
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1768388661/t5rtqslr1hfo5uzf2y2b.webp",
];

const COLORS = [
  { label: "Black", color: "#000000" },
  { label: "White", color: "#FFFFFF" },
  { label: "Blue", color: "#2563EB" },
  { label: "Red", color: "#DC2626" },
];

const SIZES = [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }];

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[random(0, arr.length - 1)];
}

function randomBool(percent = 50) {
  return Math.random() * 100 < percent;
}

function createRandomOptions(): ProductOptionType[] {
  const options: ProductOptionType[] = [];

  if (randomBool(70)) {
    options.push({
      name: "Color",
      type: "color",
      values: COLORS.slice(0, random(2, 4)),
    });
  }

  if (randomBool(70)) {
    options.push({
      name: "Size",
      type: "text",
      values: SIZES.slice(0, random(2, 4)),
    });
  }

  return options;
}

function createVariants(
  options: ProductOptionType[],
  basePrice: number,
  trackInventory: boolean,
): ProductVariantType[] {
  const generated = generateVariants(options);

  return generated.map((variant, index) => ({
    ...variant,
    priceDiff: random(-5, 20),
    costOfGoods: Number((basePrice * 0.5).toFixed(2)),
    shippingWeight: random(100, 1500),
    stock: trackInventory ? random(0, 500) : random(0, 1),
    sku: `SKU-${Date.now()}-${index}`,
    active: true,
  }));
}

export function generateFakeProducts(count: number): ProductType[] {
  return Array.from({ length: count }, (_, index) => {
    const name = `${pick(PRODUCT_NAMES)} ${index + 1}`;

    const basePrice = random(100, 5000);

    const onSale = randomBool(40);

    const trackInventory = randomBool(70);

    const manageOnOptions = randomBool(60);

    let productOptions: ProductOptionType[] = [];
    let productVariants: ProductVariantType[] = [];

    if (manageOnOptions) {
      productOptions = createRandomOptions();

      if (productOptions.length > 0) {
        productVariants = createVariants(
          productOptions,
          basePrice,
          trackInventory,
        );
      }
    }

    // Rule:
    // If no variants generated -> use default variant
    if (productVariants.length === 0) {
      productVariants = [
        {
          ...defaultProductVariant,
          stock: trackInventory ? random(0, 500) : random(0, 1),
          costOfGoods: Math.round(Number(basePrice * 0.5)),
          shippingWeight: random(100, 1500),
          sku: `SKU-${Date.now()}-${index}`,
        },
      ];
    }

    return {
      name,
      description: pick(DESCRIPTIONS),

      images: [pick(IMAGE_PLACEHOLDERS), pick(IMAGE_PLACEHOLDERS)],

      basePrice,

      onSale,

      discountInPercent: onSale ? random(5, 50) : 0,

      trackInventory,

      manageOnOptions,

      productOptions,

      productVariants,
    };
  });
}
