import { generateVariants } from "@/features/store/products/helpers/generate-variants";
import {
  ProductOptionType,
  ProductType,
  ProductVariantType,
} from "@/features/store/products/schemas/product.schema";
import { faker } from "@faker-js/faker";
type ProductTemplate = {
  category: string;
  names: string[];
  options: ProductOptionType[];
};

const IMAGE_PLACEHOLDERS = [
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1780629954/photo-1777793299588-8055f47cd20e_uuv0j4.jpg",
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1779496760/stylewon/irqodyvikf64c0nhjre7.png",
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1778419513/rqnrphn0no4vjltbnuvo.jpg",
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1768388660/cgg1o7sgjjk5bbzqmrtf.webp",
  "https://res.cloudinary.com/ddyrlplxn/image/upload/v1768388661/t5rtqslr1hfo5uzf2y2b.webp",
];
function generateImages(count: number): string[] {
  // 1. Clone and shuffle the array using the Fisher-Yates algorithm
  const shuffled = [...IMAGE_PLACEHOLDERS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // 2. Generate the requested count using the shuffled items
  return Array.from({ length: count }, (_, i) => {
    // Uses modulo (%) to safely repeat images if count exceeds array length
    return shuffled[i % shuffled.length];
  });
}
export function generateDescription(): string {
  const adjective1 = faker.commerce.productAdjective();
  const productName = faker.commerce.productName();
  const perfAdj = faker.word.adjective();
  const durabilityAdj = faker.word.adjective();
  const material = faker.commerce.productMaterial();
  const description = faker.commerce.productDescription();
  const words = faker.word.words(5);

  return (
    `<h2>${adjective1} Product</h2>` +
    `<p><strong>${productName}</strong> is designed for <em>${perfAdj}</em> performance and <u>${durabilityAdj}</u> durability.</p>` +
    `<ul><li>${material}</li><li>${description}</li><li>${words}</li></ul>` +
    `<ol><li>Premium Build Quality</li><li>Reliable Performance</li><li>Long Lasting Usage</li></ol>`
  );
}
export const PRODUCT_TEMPLATES: ProductTemplate[] = [
  {
    category: "Clothing",
    names: [
      "Premium Cotton T-Shirt",
      "Oversized Hoodie",
      "Slim Fit Jeans",
      "Sports Jacket",
      "Polo Shirt",
    ],
    options: [
      {
        title: "Color",
        valueType: "color",
        values: [
          { label: "Black", color: "#000000" },
          { label: "White", color: "#FFFFFF" },
          { label: "Blue", color: "#2563EB" },
        ],
      },
      {
        title: "Size",
        valueType: "text",
        values: [
          { label: "S" },
          { label: "M" },
          { label: "L" },
          { label: "XL" },
        ],
      },
    ],
  },

  {
    category: "Mobile",
    names: ["SmartPhone X", "Galaxy Ultra", "Pixel Pro", "iPhone Max"],
    options: [
      {
        title: "Storage",
        valueType: "text",
        values: [{ label: "128GB" }, { label: "256GB" }, { label: "512GB" }],
      },
      {
        title: "Color",
        valueType: "color",
        values: [
          { label: "Black", color: "#000000" },
          { label: "Silver", color: "#C0C0C0" },
          { label: "Blue", color: "#2563EB" },
        ],
      },
    ],
  },

  {
    category: "Rice",
    names: ["Premium Basmati Rice", "Organic Rice", "Jasmine Rice"],
    options: [
      {
        title: "Weight",
        valueType: "text",
        values: [{ label: "1kg" }, { label: "5kg" }, { label: "25kg" }],
      },
    ],
  },

  {
    category: "Laptop",
    names: ["Gaming Laptop", "Business Laptop", "Ultrabook Pro"],
    options: [
      {
        title: "RAM",
        valueType: "text",
        values: [{ label: "8GB" }, { label: "16GB" }, { label: "32GB" }],
      },
      {
        title: "Storage",
        valueType: "text",
        values: [
          { label: "256GB SSD" },
          { label: "512GB SSD" },
          { label: "1TB SSD" },
        ],
      },
      {
        title: "Color",
        valueType: "color",
        values: [
          { label: "Silver", color: "#C0C0C0" },
          { label: "Space Gray", color: "#4B5563" },
        ],
      },
    ],
  },
];

function populateVariants(
  variants: ProductVariantType[],
  trackInventory: boolean,
): ProductVariantType[] {
  return variants.map((variant) => ({
    ...variant,

    sku: faker.string.alphanumeric(10).toUpperCase(),

    priceDiff: faker.number.int({
      min: -10,
      max: 50,
    }),

    costOfGoods: faker.number.int({
      min: 5,
      max: 500,
    }),

    shippingWeight: faker.number.int({
      min: 100,
      max: 1000,
    }),

    stock: trackInventory
      ? faker.number.int({
          min: 0,
          max: 500,
        })
      : 0,

    active: faker.datatype.boolean({
      probability: 0.95,
    }),
  }));
}

export function generateFakeProduct(): ProductType {
  const template = faker.helpers.arrayElement(PRODUCT_TEMPLATES);

  const complexity = faker.helpers.arrayElement([
    "simple",
    "medium",
    "advanced",
    "complex",
  ]);

  const trackInventory = faker.datatype.boolean();
  const onSale = faker.datatype.boolean();

  const basePrice = faker.number.int({
    min: 10,
    max: 5000,
  });

  let options: ProductOptionType[] = [];
  let manageOnOptions = false;

  switch (complexity) {
    case "simple":
      options = [];
      manageOnOptions = false;
      break;

    case "medium":
      options = template.options.slice(0, 1);
      manageOnOptions = true;
      break;

    case "advanced":
      options = template.options.slice(0, Math.min(2, template.options.length));
      manageOnOptions = true;
      break;

    case "complex":
      options = template.options;
      manageOnOptions = true;
      break;
  }

  let variants: ProductVariantType[];

  if (manageOnOptions) {
    variants = populateVariants(generateVariants(options), trackInventory);
  } else {
    variants = [
      {
        label: "Default",
        sku: faker.string.alphanumeric(10).toUpperCase(),
        stock: trackInventory
          ? faker.number.int({
              min: 0,
              max: 500,
            })
          : 0,
        priceDiff: 0,
        costOfGoods: faker.number.int({
          min: 1,
          max: basePrice,
        }),
        shippingWeight: faker.number.int({
          min: 100,
          max: 1000,
        }),
        active: true,
      },
    ];
  }

  return {
    name: faker.helpers.arrayElement(template.names),

    description: generateDescription(),

    images: generateImages(
      faker.number.int({
        min: 1,
        max: 5,
      }),
    ),

    basePrice,

    onSale,

    discountInPercent: onSale
      ? faker.number.int({
          min: 5,
          max: 70,
        })
      : 0,

    trackInventory,

    manageOnOptions,

    productOptions: options,

    productVariants: variants,
  };
}
