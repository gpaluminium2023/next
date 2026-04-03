"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

interface CoverImageUploadProps {
  value: string | null;
  publicId: string | null;
  onChange: (url: string, publicId: string) => void;
  onRemove: () => void;
}

export function CoverImageUpload({
  value,
  publicId,
  onChange,
  onRemove,
}: CoverImageUploadProps) {
  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-muted">
          <Image
            src={value}
            alt="Cover image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1 hover:bg-background transition-colors"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove image</span>
          </button>
        </div>
      ) : (
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{
            folder: "gpa-blog",
            multiple: false,
            resourceType: "image",
            maxFileSize: 5_000_000, // 5 MB
          }}
          onSuccess={(result) => {
            const info = result.info as CloudinaryUploadResult;
            onChange(info.secure_url, info.public_id);
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="flex flex-col items-center justify-center w-full aspect-video rounded-lg border border-dashed border-border bg-muted/40 hover:bg-muted transition-colors cursor-pointer gap-2 text-muted-foreground text-sm"
            >
              <ImagePlus className="h-8 w-8 opacity-50" />
              <span>Click to upload cover image</span>
              <span className="text-xs opacity-60">PNG, JPG, WebP · max 5 MB</span>
            </button>
          )}
        </CldUploadWidget>
      )}
      {publicId && (
        <p className="text-xs text-muted-foreground truncate">
          Public ID: {publicId}
        </p>
      )}
    </div>
  );
}
