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

// General method for fetching paginated blog posts
const getBlogPosts = async (page?: string | number) => {
    try {
        const response = await api.get("/blogposts", {
            params: { page }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        throw error;
    }
};

const createBlogPost = async (blogPostData: BlogPost) => {
    try {
        const response = await api.post("/blogposts", blogPostData);
        return response.data;
    } catch (error) {
        console.error("Error creating blog post:", error);
        throw error;
    }
};

const getBlogPostById = async (id: string | undefined) => {
    try {
        const response = await api.get(`/blogposts/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching blog post:", error);
        throw error;
    }
};

const updateBlogPost = async (id: string, updatedBlogPost: BlogPost) => {
    try {
        const response = await api.put(`/blogposts/${id}`, updatedBlogPost);
        return response.data;
    } catch (error) {
        console.error("Error updating blog post:", error);
        throw error;
    }
};

const deleteBlogPost = async (id: string) => {
    try {
        const response = await api.delete(`/blogposts/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting blog post:", error);
        throw error;
    }
};

const BlogPostService = {
    getBlogPosts,
    createBlogPost,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
};

export default BlogPostService;
