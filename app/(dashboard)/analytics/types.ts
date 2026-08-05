import { LucideIcon } from "lucide-react";

export interface AnalyticsCardProps{
    title: string;
    value: string | number;
    subtitle: string;
    icon: LucideIcon
}

export interface AnalyticsCardsData{
    chats: number;
    documents: number;
    images: number;
    responses: number;
    storage: string;
    models: number;
}

export interface ActivityPoint{
    day: string;
    chats: number;
}

export interface ModelUsage{
    name: string;
    value: number;
}

export interface FileTypeUsage{
    type: string;
    files: number;
}

export interface RecentUsageItem{
    id: string;
    type: "chat" | "file" | "image";
    title: string;
    createdAt: Date;
}