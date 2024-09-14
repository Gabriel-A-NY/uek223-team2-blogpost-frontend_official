export interface BlogProperties {
    id: string;
    text: string;
    title: string;
    category: string;
    author: string;
}

export interface Blogs {
    blog: BlogProperties[];
}