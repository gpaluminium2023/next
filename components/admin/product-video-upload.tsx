"use client";

import { CldUploadWidget } from "next-cloudinary";
import { VideoIcon, X } from "lucide-react";

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
}

interface ProductVideoUploadProps {
  value: string | null;
  publicId: string | null;
  onChange: (url: string, publicId: string) => void;
  onRemove: () => void;
}

export function ProductVideoUpload({ value, publicId, onChange, onRemove }: ProductVideoUploadProps) {
  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-border bg-muted">
          <video src={value} controls className="aspect-video w-full" />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 rounded-full bg-background/80 p-1 backdrop-blur-sm transition-colors hover:bg-background"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove video</span>
          </button>
        </div>
      ) : (
        <CldUploadWidget
          signatureEndpoint="/api/cloudinary/sign"
          options={{
            folder: "gpa-store",
            multiple: false,
            resourceType: "video",
            maxFileSize: 100_000_000, // 100 MB
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
              className="flex w-full max-w-md flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 py-8 text-sm text-muted-foreground transition-colors hover:bg-muted"
            >
              <VideoIcon className="h-8 w-8 opacity-50" />
              <span>Click to upload a sample video</span>
              <span className="text-xs opacity-60">MP4, MOV, WebM · max 100 MB</span>
            </button>
          )}
        </CldUploadWidget>
      )}
      {publicId && <p className="truncate text-xs text-muted-foreground">Public ID: {publicId}</p>}
    </div>
  );
}
