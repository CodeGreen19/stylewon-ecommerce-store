"use client";

import { Button } from "@/components/ui/button";
import { ComponentProps, useEffect, useRef } from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

type Props = {
  onInsert?: (assets: any[]) => void;
} & ComponentProps<typeof Button>;

export function MediaLibraryButtonWrapper({
  onInsert,
  children,
  ...props
}: Props) {
  const initialized = useRef(false);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (!window.cloudinary || initialized.current) return;

    initialized.current = true;

    widgetRef.current = window.cloudinary.createMediaLibrary(
      {
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        button_class: "hidden",
        multiple: true,
        max_files: 20,
        insert_caption: "Select",
        inline_container: undefined,
        remove_header: false,
      },
      {
        insertHandler: (data: any) => {
          onInsert?.(data.assets);
        },
      },
    );
  }, [onInsert]);

  const openWidget = () => {
    widgetRef.current?.show();
  };

  return (
    <Button variant={"secondary"} onClick={openWidget} {...props}>
      {children}
    </Button>
  );
}
