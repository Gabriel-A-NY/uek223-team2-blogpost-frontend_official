import api from "../config/Api";

const getBlogPosts = async () => {
    try {
        const response = await api.get("/blogposts")
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


const BlogPostService = {
    getBlogPosts
}

export default BlogPostService;