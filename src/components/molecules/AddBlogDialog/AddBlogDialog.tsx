import React, { useState } from "react";
import { TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import BlogPostService from "../../../Services/BlogPostService";

interface Author {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface BlogPostDTO {
    title: string;
    text: string;
    category: string;
    author: Author;
}

export default function AddBlogDialog() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [author, setAuthor] = useState<Author>({
        id: "",
        firstName: "",
        lastName: "",
        email: ""
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const blogPostDTO: BlogPostDTO = {
            title,
            text,
            category,
            author,
        };

        console.log("Sending blog post data:", blogPostDTO);

        try {
            const response = await BlogPostService.createBlogPost(blogPostDTO);
            console.log("Blog post created:", response);
            handleClose();
        } catch (error: any) {
            console.error("Error creating blog post:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add Blog Post
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>Create a New Blog Post</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
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
                                    required
                                    type="email"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">Cancel</Button>
                        <Button type="submit" variant="contained" color="primary">
                            Create Blog Post
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
