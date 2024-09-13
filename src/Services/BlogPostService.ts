import api from "../config/Api";

const getBlogPosts = async () => {
    try {
        const response = await api.get("/blogposts")
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const createBlogPost = async (blogId: string,
                              text: string,
                              title: string,
                              category: string,
                              author: string) => {
    try {
        const data = {author};
        const response = await api.post("/blogposts", data);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}

const getBlogPostById  = async (id: string) => {
    try {
        const response = await api.get(`${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const updateBlogPost = async (id: string, text: string, title: string, category: string, author: string) => {
    try {
        const data = {author}
        const response = await api.put(`${id}`, data);
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