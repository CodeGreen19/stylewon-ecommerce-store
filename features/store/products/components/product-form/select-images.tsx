"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStore } from "@tanstack/react-form";
import { Plus, Trash2 } from "lucide-react";

import { withForm } from "@/components/form/use-app-form";
import { MediaLibraryButtonWrapper } from "@/lib/media-library-button-wrapper";
import Image from "next/image";
import { productDefaultValues } from "../../schemas/product.schema";

export const SelectImages = withForm({
  defaultValues: productDefaultValues,

  render: function Render({ form }) {
    const images = useStore(form.store, (store) => store.values.images);

    return (
      <Card>
        <CardHeader>
          <CardTitle variant="form">Select Images</CardTitle>

          <CardAction>
            <form.AppField
              name="images"
              mode="array"
              children={(field) => (
                <MediaLibraryButtonWrapper
                  onInsert={(assets) => {
                    const uniqueImages = Array.from(
                      new Set([
                        ...field.state.value,
                        ...assets.map((a) => a.secure_url),
                      ]),
                    );

                    field.handleChange(uniqueImages);
                  }}
                >
                  Add Images <Plus />
                </MediaLibraryButtonWrapper>
              )}
            />
          </CardAction>
        </CardHeader>

        <CardContent>
          <form.AppField
            name="images"
            mode="array"
            children={(field) =>
              images.length === 0 ? (
                <div className="text-muted-foreground text-sm">
                  No image is selected !
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {images.map((src, index) => (
                    <div
                      key={src}
                      className="group bg-muted relative overflow-hidden rounded-xl border"
                    >
                      <div className="relative aspect-square">
                        <Image
                          fill
                          src={src}
                          alt={`product-image-${index}`}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-2 flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon-lg"
                          className="bg-white!"
                          onClick={() => {
                            field.handleChange(
                              field.state.value.filter(
                                (image) => image !== src,
                              ),
                            );
                          }}
                        >
                          <Trash2 className="size-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          />
        </CardContent>
      </Card>
    );
  },
});
