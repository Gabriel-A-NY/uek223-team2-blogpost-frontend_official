import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import BlogPostService from "../../../Services/BlogPostService";

export default function AddBlogDialog() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const blogPostData = {
            title,
            text,
            category,
            author,
        };

        try {
            const response = await BlogPostService.createBlogPost(blogPostData);
            console.log("Blog post created:", response);
        } catch (error) {
            console.error("Error creating blog post:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Create a New Blog Post</Typography>
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        multiline
                        rows={4}
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Author ID"
                        value={author.id}
                        onChange={(e) => setAuthor({ ...author, id: e.target.value })}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="First Name"
                        value={author.firstName}
                        onChange={(e) => setAuthor({ ...author, firstName: e.target.value })}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        value={author.lastName}
                        onChange={(e) => setAuthor({ ...author, lastName: e.target.value })}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        value={author.email}
                        onChange={(e) => setAuthor({ ...author, email: e.target.value })}
                        type="email"
                        required
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Create Blog Post
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}