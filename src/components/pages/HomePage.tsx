import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogPostService from "../../Services/BlogPostService";
import { BlogProperties } from "../../types/BlogProperties";
import { Button, Grid, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import AddBlogDialog from "../molecules/AddBlogDialog/AddBlogDialog";

export default function HomePage() {
    const [blogposts, setBlogposts] = useState<BlogProperties[]>([]);
    const navigate = useNavigate();

    const fetchBlogPosts = async () => {
        try {
            const response = await BlogPostService.getBlogPosts();
            setBlogposts(response);
        } catch (error) {
            console.error("Error fetching blog posts:", error);
        }
    };

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    const handleShowBlog = (id: string) => {
        navigate(`/blogposts/${id}`);
    };

    const handleUpdateBlog = (id: string) => {
        navigate(`/blogposts/update/${id}`);
    };

    const handleDeleteBlogPost = async (blogId: string) => {
        try {
            await BlogPostService.deleteBlogPost(blogId);
            const updatedBlogPost = blogposts.filter((blog) => blog.id !== blogId);
            setBlogposts(updatedBlogPost);
        } catch (error) {
            alert("Error");
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                {blogposts.map((blog) => (
                    <Grid item xs={12} key={blog.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{blog.title}</Typography>
                                <Typography variant="body2">{blog.text}</Typography>
                                <Typography variant="body2">{blog.id}</Typography>
                                <Button onClick={() => handleShowBlog(blog.id)}>View Blog</Button>
                                <Button onClick={() => handleUpdateBlog(blog.id)}>Update Blog</Button>
                                <Button onClick={() => handleDeleteBlogPost(blog.id)}>Delete Blog</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <AddBlogDialog />
        </>
    );
}
