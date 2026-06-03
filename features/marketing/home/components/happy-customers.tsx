"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { SectionTitle } from "../../shared/components/section-title";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Rating } from "react-simple-star-rating";
import { Badge } from "@/components/ui/badge";

interface CustomerType {
  id: number;
  name: string;
  rating: number;
  description: string;
}

export const happyCustomers: CustomerType[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    description:
      "Absolutely loved the experience. The product quality exceeded my expectations and the delivery was super fast.",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    description:
      "Very clean design and smooth user experience. Customer support was also responsive and helpful.",
  },
  {
    id: 3,
    name: "Ayesha Rahman",
    rating: 5,
    description:
      "Everything arrived perfectly packed. I would definitely recommend this to my friends and family.",
  },
  {
    id: 4,
    name: "Daniel Smith",
    rating: 5,
    description:
      "One of the best online shopping experiences I’ve had in a long time. Great service overall.",
  },
  {
    id: 5,
    name: "Priya Kapoor",
    rating: 4,
    description:
      "The interface is beautiful and easy to use. Product quality was excellent for the price.",
  },
  {
    id: 6,
    name: "James Wilson",
    rating: 5,
    description:
      "Fast checkout process, secure payment, and excellent communication throughout the order process.",
  },
  {
    id: 7,
    name: "Fatima Noor",
    rating: 5,
    description:
      "I’m really impressed by the attention to detail. Everything feels premium and thoughtfully designed.",
  },
  {
    id: 8,
    name: "Ethan Martinez",
    rating: 4,
    description:
      "Good value for money and the customer service team handled my questions professionally.",
  },
  {
    id: 9,
    name: "Nusrat Jahan",
    rating: 5,
    description:
      "The quality is amazing and the support team made the entire process simple and stress-free.",
  },
  {
    id: 10,
    name: "Olivia Brown",
    rating: 5,
    description:
      "Super satisfied with my purchase. Everything from browsing to delivery felt smooth and reliable.",
  },
];

export function HappyCustomers() {
  const [api, setApi] = React.useState<CarouselApi>();
  return (
    <div className="p-4 max-w-7xl m-auto space-y-5 my-16">
      <div className="flex items-center justify-between">
        <SectionTitle title="Happy customers" className="text-start mb-0" />
        <div className="flex gap-1">
          <Button
            onClick={() => api?.scrollPrev()}
            size={"icon-lg"}
            variant={"outline"}
          >
            <ArrowLeft />
          </Button>
          <Button
            onClick={() => api?.scrollNext()}
            size={"icon-lg"}
            variant={"outline"}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
      <Carousel opts={{ loop: true, align: "start" }} setApi={setApi}>
        <CarouselContent>
          {happyCustomers.map((data) => (
            <CarouselItem className="basis-1/2 md:basis-1/3" key={data.id}>
              <div className="p-1 h-full">
                <CustomerCard {...data} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

function CustomerCard(data: CustomerType) {
  return (
    <Card className="rounded-2xl h-full">
      <CardHeader>
        <CardTitle>
          <Rating
            readonly
            size={20}
            initialValue={data.rating}
            SVGclassName="inline-block"
          />
        </CardTitle>
        <CardDescription className="text-black">
          {data.name}{" "}
          <Button size={"icon-xs"}>
            <Check />
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{data.description}</p>
      </CardContent>
    </Card>
  );
}
