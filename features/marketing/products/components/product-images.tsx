"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductImages({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string>(
    images.length > 0 ? images[0] : "/svgs/empty-picture.svg",
  );

  return (
    <div className="flex flex-col gap-4 md:flex-row-reverse md:items-start md:justify-end max-w-2xl md:pr-10">
      <div className="overflow-hidden  border flex items-center justify-center bg-secondary w-full">
        <Image
          src={selectedImage}
          height={400}
          width={400}
          alt="Selected product image"
          className="object-contain h-auto w-full aspect-square"
        />
      </div>

      <div className="flex flex-row gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-x-visible md:pb-0">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setSelectedImage(img)}
            className={`relative shrink-0 overflow-hidden border transition-all duration-200  bg-white
              ${selectedImage === img ? "border-black scale-95" : "border-gray-200 hover:border-gray-400"}`}
          >
            <Image
              src={img}
              height={48}
              width={48}
              alt="Product thumbnail"
              className="object-cover aspect-square"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
