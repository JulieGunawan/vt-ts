
export type Blog = {
    id?:number;
    slug:string;
    image?:string;
    title:string;
    content:string;
    published_at?:Date | null;
    deleted_at?:Date | null;
}
