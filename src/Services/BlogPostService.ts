import api from "../config/Api";

interface BlogPost {
    title: string;
    text: string;
    category: string;
    author: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}

const getBlogPosts = async () => {
    try {
        const response = await api.get("/blogposts");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const createBlogPost = async (blogPostData: BlogPost) => {
    try {
        const response = await api.post("/blogposts", blogPostData);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const getBlogPostById = async (id: string | undefined) => {
    try {
        const response = await api.get(`/blogposts/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const updateBlogPost = async (id: string, updatedBlogPost: BlogPost) => {
    try {
        const response = await api.put(`/blogposts/${id}`, updatedBlogPost);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteBlogPost = async (id: string) => {
    try {
        const response = await api.delete(`/blogposts/${id}`);  // Corrected the URL
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const BlogPostService = {
    getBlogPosts,
    createBlogPost,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost
}

export default BlogPostService;
