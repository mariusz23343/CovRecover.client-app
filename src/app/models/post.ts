export interface Post {
    id: string;
    title: string;
    summary: string;
    content: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
}