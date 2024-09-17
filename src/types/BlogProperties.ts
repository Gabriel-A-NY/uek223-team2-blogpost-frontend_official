export interface Author {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface BlogProperties {
    id: string;
    text: string;
    title: string;
    category: string;
    author: Author;
}

export interface BlogList {
    blogs: BlogProperties[];
}
