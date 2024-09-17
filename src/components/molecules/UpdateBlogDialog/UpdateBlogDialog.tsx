import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import BlogPostService from "../../../Services/BlogPostService";
import { BlogProperties } from "../../../types/BlogProperties";

export default function UpdateBlogPostDialog() {
    const { id } = useParams<{ id: string }>(); // Get the blog post ID from the URL
    const [blogId, setBlogId] = useState<string>(""); // Store the blog's unique ID
    const [title, setTitle] = useState<string>(""); // Store the blog's title
    const [category, setCategory] = useState<string>(""); // Store the blog's category
    const [text, setText] = useState<string>(""); // Store the blog's text/content
    const [author, setAuthor] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: ""
    });
    const [loading, setLoading] = useState<boolean>(false); // Loading state for fetching/updating
    const [error, setError] = useState<string | null>(null); // Error handling

    // Fetch the blog post details when the component mounts
    useEffect(() => {
        const fetchBlogPost = async () => {
            setLoading(true);
            try {
                const response: BlogProperties = await BlogPostService.getBlogPostById(id); // Fetch the blog post by ID
                setBlogId(response.id); // Set blog ID
                setTitle(response.title); // Set title
                setCategory(response.category); // Set category
                setText(response.text); // Set text/content
                setAuthor(response.author); // Set the author object
            } catch (error) {
                setError("Error fetching blog post. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogPost();
    }, [id]);

    // Handle the blog post update when the form is submitted
    const handleUpdateBlog = async () => {
        const updatedBlogPost: BlogProperties = {
            id: blogId,
            title,
            category,
            text,
            author
        };

        try {
            setLoading(true);
            await BlogPostService.updateBlogPost(blogId, updatedBlogPost); // Send the update request
            console.log("Blog post updated successfully");
            setError(null); // Clear any previous error
        } catch (error) {
            console.error("Error updating blog post:", error);
            setError("Failed to update blog post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle author changes for firstName, lastName, and email
    const handleAuthorChange = (field: keyof typeof author, value: string) => {
        setAuthor((prevAuthor) => ({
            ...prevAuthor,
            [field]: value
        }));
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <form>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Update Blog Post</Typography>
                </Grid>

                {/* Blog Title */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Grid>

                {/* Blog Content */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Content"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        multiline
                        rows={4}
                        required
                    />
                </Grid>

                {/* Blog Category */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </Grid>

                {/* Author First Name */}
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Author First Name"
                        value={author.firstName}
                        onChange={(e) => handleAuthorChange("firstName", e.target.value)}
                        required
                    />
                </Grid>

                {/* Author Last Name */}
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Author Last Name"
                        value={author.lastName}
                        onChange={(e) => handleAuthorChange("lastName", e.target.value)}
                        required
                    />
                </Grid>

                {/* Author Email */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Author Email"
                        value={author.email}
                        onChange={(e) => handleAuthorChange("email", e.target.value)}
                        required
                    />
                </Grid>

                {/* Error Message */}
                {error && (
                    <Grid item xs={12}>
                        <Typography color="error">{error}</Typography>
                    </Grid>
                )}

                {/* Submit Button */}
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateBlog}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Blog Post"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
