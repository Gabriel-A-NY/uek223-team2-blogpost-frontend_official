import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import BlogPostService from "../../Services/BlogPostService";
import {BlogProperties} from "../../types/BlogProperties";
import {Button, Grid, Typography} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import ViewBlogButton from "../atoms/ViewBlogButton";
import AddBlogPostButton from "../atoms/AddBlogButton";
import UpdateBlogButton from "../atoms/UpdateBlogButton";
import DeleteBlogButton from "../atoms/DeleteBlogButton";

export default function HomePage() {
    const [blogposts, setBlogposts] = useState<BlogProperties[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await BlogPostService.getBlogPosts();
                setBlogposts(response);
            } catch (error) {
                console.error("Error fetching blog posts:", error);
            }
        };
        fetchBlogPosts();
    }, []);

    const handleShowBlog = (id: string) => {
        console.log("Navigating to blog with ID:", id);
        navigate(`/blogposts/${id}`);
    };

    const handleAddBlog = () => {
        navigate(`/blogposts/add`)
    }

    const handleUpdateBlog = (id: string) => {
        navigate(`/blogposts/update/${id}`);
    }

    const handleDeleteBlogPost = async (blogId: string) => {
        try {
            await BlogPostService.deleteBlogPost(blogId);
            const updatedBlogPost = blogposts.filter((blogposts) => blogposts.id !== blogId);
            setBlogposts(updatedBlogPost);
        } catch (error) {
            alert("Error");
        }
    };

    return (
        <Grid container spacing={2}>
            {blogposts.map((blog) => (
                <Grid item xs={12} key={blog.id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                {blog.title}
                            </Typography>
                            <Typography variant="body2">
                                {blog.text}
                            </Typography>
                            <Typography variant="body2">
                                {blog.author.firstName} {blog.author.lastName}
                            </Typography>
                            <ViewBlogButton onClick={() => handleShowBlog(blog.id)}/>
                            <AddBlogPostButton onClick={() => handleAddBlog()}/>
                            <UpdateBlogButton onClick={() => handleUpdateBlog(blog.id)}/>
                            <DeleteBlogButton onClick={() => handleDeleteBlogPost(blog.id)}/>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>

    );
}