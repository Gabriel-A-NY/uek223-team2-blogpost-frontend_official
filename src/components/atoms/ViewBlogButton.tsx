import {Button} from "@mui/material";

interface ViewBlogButtonProps {
    onClick?: () => void
}

function ViewBlogButton({onClick}: ViewBlogButtonProps) {
    return (
        <Button variant="contained" color="primary">
            View Blog
        </Button>
    );
}

export default ViewBlogButton;