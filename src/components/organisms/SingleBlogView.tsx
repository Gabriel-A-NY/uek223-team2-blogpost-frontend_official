import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import BlogPostService from "../../Services/BlogPostService";
import {BlogProperties} from "../../types/BlogProperties";

const SingleBlogView = () => {
    const [blog, setBlog] = useState<BlogProperties | null>(null);
    const {id} = useParams();


    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const fetchedBlog = await BlogPostService.getBlogPostById(id);
                setBlog(fetchedBlog);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBlog();
    }, [id]);

    return (
        <>
            {blog ? (
                <div>
                    <h1>{blog.title}</h1>
                    <p>{blog.text}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default SingleBlogView;