"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UploadContextType {
  upload: (file: File) => Promise<void>;

  cancelUpload: () => void;

  isUploading: boolean;

  uploadProgress: number;

  uploadFileName: string;

  uploadFileSize: string;
}

const UploadContext =
  createContext<UploadContextType | null>(
    null,
  );

export function UploadProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const [isUploading, setIsUploading] =
    useState(false);

  const [uploadProgress, setUploadProgress] =
    useState(0);

  const [uploadFileName, setUploadFileName] =
    useState("");

  const [uploadFileSize, setUploadFileSize] =
    useState("");

  async function upload(file: File) {
    try {
      setIsUploading(true);

      setUploadProgress(10);

      setUploadFileName(file.name);

      setUploadFileSize(
        `${(
          file.size /
          1024 /
          1024
        ).toFixed(2)} MB`,
      );

      const formData =
        new FormData();

      formData.append(
        "file",
        file,
      );

      setUploadProgress(30);

      const res = await fetch(
        "/api/files",
        {
          method: "POST",
          body: formData,
        },
      );

      setUploadProgress(80);

      if (!res.ok) {
        toast.error("Unable to upload the document. Please try again.");

        throw new Error(
          "Upload failed.",
        );
      }

      setUploadProgress(100);

      toast.success("Document uploaded successfully.");

      router.refresh();
    } catch (error) {
      console.error(error);

     toast.error("Unable to upload the document. Please try again.");
    } finally {
      setTimeout(() => {
        cancelUpload();
      }, 500);
    }
  }

  function cancelUpload() {
    setIsUploading(false);

    setUploadProgress(0);

    setUploadFileName("");

    setUploadFileSize("");
  }

  return (
    <UploadContext.Provider
      value={{
        upload,

        cancelUpload,

        isUploading,

        uploadProgress,

        uploadFileName,

        uploadFileSize,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  const context =
    useContext(UploadContext);

  if (!context) {
    throw new Error(
      "useUpload must be used inside UploadProvider.",
    );
  }

  return context;
}