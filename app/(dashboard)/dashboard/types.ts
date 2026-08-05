export interface Activity {
    id: string;
    type: "chat" | "file" | "image";

    title: string;

    createdAt: Date;
}