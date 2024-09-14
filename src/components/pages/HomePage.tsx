import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogPostService from "../../Services/BlogPostService";
import {BlogProperties} from "../../types/BlogProperties";
import {Button, Grid, Typography} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

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
                                Author: {blog.author.firstName}
                            </Typography>
                            <Button onClick={() => handleShowBlog(blog.id)}>
                                View Blog
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}