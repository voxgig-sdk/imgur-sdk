export interface Image {
    created_at?: string;
    description?: string;
    height?: number;
    id?: string;
    size?: number;
    title?: string;
    type?: string;
    url?: string;
    views?: number;
    width?: number;
}
export interface ImageLoadMatch {
    id: string;
}
export interface PostMeta {
    count?: number;
    id?: string;
    type?: string;
}
export interface PostMetaListMatch {
    id: string;
    include?: string;
}
