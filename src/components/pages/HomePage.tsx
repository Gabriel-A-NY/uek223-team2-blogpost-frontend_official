import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BlogPostService from "../../Services/BlogPostService";
import { BlogProperties } from "../../types/BlogProperties";
import { Button, Grid, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import ViewBlogButton from "../atoms/ViewBlogButton";
import UpdateBlogButton from "../atoms/UpdateBlogButton";
import DeleteBlogButton from "../atoms/DeleteBlogButton";
import UpdateBlogPostDialog from "../molecules/UpdateBlogDialog/UpdateBlogDialog";
import AddBlogDialog from "../molecules/AddBlogDialog/AddBlogDialog";
import activeUserContext from "../../Contexts/ActiveUserContext";

export default function HomePage() {
    const [blogposts, setBlogposts] = useState<BlogProperties[]>([]);
    const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const page = parseInt(searchParams.get('page') || '1');

    const fetchBlogPosts = async () => {
        try {
            const response = await BlogPostService.getBlogPosts(page); // Fetch posts for the current page
            setBlogposts(response);
        } catch (error) {
            console.error("Error fetching blog posts:", error);
        }
    };

    useEffect(() => {
        fetchBlogPosts();
    }, [page]);

    const handleLogin = () => {
        navigate(`/login`)
    }

    const handleNextPage = () => {
        navigate(`/blogposts?page=${page + 1}`);
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            navigate(`/blogposts?page=${page - 1}`);
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
                                <Typography variant="body2">
                                    author: {blog.author.firstName} {blog.author.lastName}
                                </Typography>
                                <Typography variant="body2">category: {blog.category}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination Buttons */}
            <Button onClick={handlePreviousPage} disabled={page <= 1}>
                Previous
            </Button>
            <Button onClick={handleNextPage}>
                Next
            </Button>
            <Button onClick={handleLogin}>
                login
            </Button>
        </>
    );
}
