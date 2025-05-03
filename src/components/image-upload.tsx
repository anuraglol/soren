"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

type ImageUploadProps = {
  value?: File;
  onChange: (file: File) => void;
  error?: string;
};

export function ImageUpload({ value, onChange, error }: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Image</label>
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-gray-500 cursor-pointer transition hover:border-primary hover:text-primary",
          isDragActive ? "bg-muted" : "bg-background"
        )}
      >
        <input {...getInputProps()} />
        {value ? (
          <img
            src={URL.createObjectURL(value)}
            alt="Preview"
            className="h-40 object-cover rounded-md shadow-sm"
          />
        ) : (
          <p>Drag and drop an image here, or click to select one</p>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
