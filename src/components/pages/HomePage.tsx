import {CardMedia, Grid, Typography} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import {useEffect, useState} from "react";
import {BlogProperties} from "../../types/BlogProperties";
import BlogPostService from "../../Services/BlogPostService";

export default function HomePage() {
  const [blogposts, setBlogposts] = useState<BlogProperties[]>([]);

  useEffect(() => {
        BlogPostService
            .getBlogPosts()
            .then((response: any) => {
              console.log(response);
              if (response) {
                setBlogposts(response);

              }
            })
            .catch((error: any) => {
              console.log(error)
            })
      }, []
  )

  return (
      <>
        <Grid container spacing={2}>
          {blogposts.map((blog: BlogProperties) => (
              <Grid item xs={12} sm={6} md={4} key={blog.blogId}>
                <Card sx={{maxWidth: 345}}>
                  <CardMedia
                      sx={{height: 140}}
                      title={blog.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {blog.text}
                    </Typography>
                      <Typography variant="body2" color="text.secondary">
                          {blog.category}
                      </Typography>
                  </CardContent>
                </Card>
              </Grid>
          ))}
        </Grid>
      </>
  );
}
