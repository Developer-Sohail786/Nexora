export interface Document {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  content: string | null
  createdAt: Date;
 }

export interface DocumentsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export interface UploadZoneProps {
  onUpload: (file: File) => void;
}

export interface UploadProgressProps {
  fileName: string;
  fileSize: string;
  progress: number;
  status: string;
  onCancel?: () => void;
}
export interface RecentDocumentsProps {
  files: Document[];
}

export interface FileActionsProps {
  file: Document;
}

export interface DocumentCardProps {
  file: Document;
  onPreview: (
    file: Document,
  ) => void;
}
