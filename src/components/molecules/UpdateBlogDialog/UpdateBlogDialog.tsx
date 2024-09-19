import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import BlogPostService from "../../../Services/BlogPostService";
import { BlogProperties } from "../../../types/BlogProperties";

interface UpdateBlogPostDialogProps {
    open: boolean;
    blogId: string;
    onClose: () => void;
    onBlogUpdate: (updatedBlog: BlogProperties) => Promise<void>;
}

const UpdateBlogPostDialog: React.FC<UpdateBlogPostDialogProps> = ({ open, blogId, onClose, onBlogUpdate }) => {
    const [title, setTitle] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [author, setAuthor] = useState({ id: "", firstName: "", lastName: "", email: "" });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch the blog post details when the dialog opens
    useEffect(() => {
        const fetchBlogPost = async () => {
            setLoading(true);
            try {
                const response: BlogProperties = await BlogPostService.getBlogPostById(blogId);
                setTitle(response.title);
                setCategory(response.category);
                setText(response.text);
                setAuthor(response.author);
            } catch (error) {
                setError("Error fetching blog post. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (blogId && open) {
            fetchBlogPost();
        }
    }, [blogId, open]);

    // Handle updating the blog post
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
            const updatedBlog = await BlogPostService.updateBlogPost(blogId, updatedBlogPost);
            await onBlogUpdate(updatedBlog); // Notify parent component of the updated blog
            setError(null);
            onClose(); // Close the dialog after successful update
        } catch (error) {
            setError("Failed to update blog post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle changes in author fields
    const handleAuthorChange = (field: keyof typeof author, value: string) => {
        setAuthor((prevAuthor) => ({
            ...prevAuthor,
            [field]: value
        }));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Update Blog Post</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={2}>
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
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleUpdateBlog} color="primary" variant="contained" disabled={loading}>
                    {loading ? "Updating..." : "Update"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateBlogPostDialog;
