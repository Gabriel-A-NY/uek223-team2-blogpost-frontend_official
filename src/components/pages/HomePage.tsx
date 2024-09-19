import { useEffect, useState } from "react";
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

    const handleShowBlog = (id: string) => {
        navigate(`/blogposts/${id}`);
    };

    const handleUpdateBlog = (id: string) => {
        setSelectedBlogId(id);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedBlogId(null);
    };

    const handleDeleteBlogPost = async (blogId: string) => {
        try {
            await BlogPostService.deleteBlogPost(blogId);
            const updatedBlogPosts = blogposts.filter((blog) => blog.id !== blogId);
            setBlogposts(updatedBlogPosts);
        } catch (error) {
            alert("Error deleting blog post.");
        }
    };

    const handleBlogUpdate = async (updatedBlog: BlogProperties) => {
        setBlogposts((prev) =>
            prev.map((blog) =>
                blog.id === updatedBlog.id ? updatedBlog : blog
            )
        );
    };

    const handleNextPage = () => {
        navigate(`/blogposts?page=${page + 1}`);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
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
                                <ViewBlogButton onClick={() => handleShowBlog(blog.id)} />
                                <UpdateBlogButton onClick={() => handleUpdateBlog(blog.id)} />
                                <DeleteBlogButton onClick={() => handleDeleteBlogPost(blog.id)} />
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

            {/* Update Blog Dialog */}
            {selectedBlogId && (
                <UpdateBlogPostDialog
                    open={isDialogOpen}
                    blogId={selectedBlogId}
                    onClose={handleDialogClose}
                    onBlogUpdate={handleBlogUpdate}
                />
            )}
            <AddBlogDialog />
        </>
    );
}
