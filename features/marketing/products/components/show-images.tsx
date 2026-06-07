"use client";

import Image from "next/image";
import { useState } from "react";

export function ShowImages({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string>(
    images.length > 0 ? images[0] : "/svgs/empty-picture.svg",
  );

  return (
    <div className="flex flex-col gap-4 md:flex-row-reverse md:items-start md:justify-end max-w-2xl">
      <div className="overflow-hidden rounded-lg border flex items-center justify-center p-2">
        <Image
          src={selectedImage}
          height={400}
          width={400}
          alt="Selected product image"
          className="object-contain h-auto max-w-full aspect-square"
        />
      </div>

      <div className="flex flex-row gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-x-visible md:pb-0">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setSelectedImage(img)}
            className={`relative shrink-0 overflow-hidden rounded-md border transition-all duration-200 p-1 bg-white
              ${selectedImage === img ? "border-black scale-95" : "border-gray-200 hover:border-gray-400"}`}
          >
            <Image
              src={img}
              height={48}
              width={48}
              alt="Product thumbnail"
              className="object-cover rounded aspect-square"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
