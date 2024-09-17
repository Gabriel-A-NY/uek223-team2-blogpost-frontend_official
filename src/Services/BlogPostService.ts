import api from "../config/Api";

const getBlogPosts = async () => {
    try {
        const response = await api.get("/blogposts")
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const createBlogPost = async (blogPostData:any) => {
    try {
        const response = await api.post("/blogposts", blogPostData);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}

const getBlogPostById  = async (id: string | undefined) => {
    try {
        const response = await api.get(`/blogposts/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const updateBlogPost = async (id: string, updatedBlogPost: any) => {
    try {
        const response = await api.put(`/blogposts/${id}`, updatedBlogPost);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteBlogPost = async (id: string) => {
    try {
        const response = await api.delete(`${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
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