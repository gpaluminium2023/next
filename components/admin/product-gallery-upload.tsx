"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import type { ProductImage } from "@/lib/store/types";

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

interface ProductGalleryUploadProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
}

export function ProductGalleryUpload({ images, onChange }: ProductGalleryUploadProps) {
  function addImage(url: string, publicId: string) {
    onChange([...images, { url, publicId, alt: "" }]);
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  function updateAlt(index: number, alt: string) {
    onChange(images.map((img, i) => (i === index ? { ...img, alt } : img)));
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <div key={img.publicId || img.url} className="space-y-1.5">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted">
              <Image src={img.url} alt={img.alt || "Product image"} fill className="object-cover" sizes="200px" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1.5 right-1.5 rounded-full bg-background/80 p-1 backdrop-blur-sm transition-colors hover:bg-background"
              >
                <X className="h-3.5 w-3.5" />
                <span className="sr-only">Remove image</span>
              </button>
            </div>
            <Input
              value={img.alt}
              onChange={(e) => updateAlt(i, e.target.value)}
              placeholder="Alt text"
              className="h-7 text-xs"
            />
          </div>
        ))}

        <CldUploadWidget
          signatureEndpoint="/api/cloudinary/sign"
          options={{
            folder: "gpa-store",
            multiple: true,
            resourceType: "image",
            maxFileSize: 8_000_000, // 8 MB
          }}
          onSuccess={(result) => {
            const info = result.info as CloudinaryUploadResult;
            addImage(info.secure_url, info.public_id);
          }}
          onClose={() => {
            // Safety net: cloudinary-community/next-cloudinary#470 — the widget
            // sometimes leaves <body> stuck at overflow: hidden after closing.
            document.body.style.overflow = "auto";
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 text-xs text-muted-foreground transition-colors hover:bg-muted"
            >
              <ImagePlus className="h-6 w-6 opacity-50" />
              <span>Add image</span>
            </button>
          )}
        </CldUploadWidget>
      </div>
      <p className="text-xs text-muted-foreground">
        PNG, JPG, WebP · max 8 MB each · first image is used as the primary product photo
      </p>
    </div>
  );
}
