import React from "react";
import { TextField, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import BlogPostService from "../../../Services/BlogPostService";
import AddBlogButton from "../../atoms/AddBlogButton";
import CreateBlogButton from "../../atoms/CreateBlogButton";
import CancelButton from "../../atoms/CancelButton";

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

const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    text: Yup.string().required("Text is required"),
    category: Yup.string().required("Category is required"),
    author: Yup.object({
        id: Yup.string().required("Author ID is required"),
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required")
    }).required()
});

export default function AddBlogDialog() {
    const [open, setOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            title: "",
            text: "",
            category: "",
            author: {
                id: "",
                firstName: "",
                lastName: "",
                email: ""
            }
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log("Sending blog post data:", values);

            try {
                const response = await BlogPostService.createBlogPost(values as BlogPostDTO);
                console.log("Blog post created:", response);
                alert("Blog post created successfully!");
                handleClose();
            } catch (error: any) {
                console.error("Error creating blog post:", error.response ? error.response.data : error.message);
            }
        }
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <AddBlogButton onClick={handleOpen} />
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>Create a New Blog Post</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Text"
                                    name="text"
                                    value={formik.values.text}
                                    onChange={formik.handleChange}
                                    multiline
                                    rows={4}
                                    error={formik.touched.text && Boolean(formik.errors.text)}
                                    helperText={formik.touched.text && formik.errors.text}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Category"
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    error={formik.touched.category && Boolean(formik.errors.category)}
                                    helperText={formik.touched.category && formik.errors.category}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Author ID"
                                    name="author.id"
                                    value={formik.values.author.id}
                                    onChange={formik.handleChange}
                                    error={formik.touched.author?.id && Boolean(formik.errors.author?.id)}
                                    helperText={formik.touched.author?.id && formik.errors.author?.id}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    name="author.firstName"
                                    value={formik.values.author.firstName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.author?.firstName && Boolean(formik.errors.author?.firstName)}
                                    helperText={formik.touched.author?.firstName && formik.errors.author?.firstName}
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    name="author.lastName"
                                    value={formik.values.author.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.author?.lastName && Boolean(formik.errors.author?.lastName)}
                                    helperText={formik.touched.author?.lastName && formik.errors.author?.lastName}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="author.email"
                                    value={formik.values.author.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.author?.email && Boolean(formik.errors.author?.email)}
                                    helperText={formik.touched.author?.email && formik.errors.author?.email}
                                    required
                                    type="email"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <CancelButton onClick={handleClose} />
                        <CreateBlogButton onClick={formik.handleSubmit} />
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}
