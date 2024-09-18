import { Button } from "@mui/material";
import ButtonProperties from "../../types/ButtonProperties";

function ViewBlogButton({ onClick }: ButtonProperties) {
    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            View Blog
        </Button>
    );
}

export default ViewBlogButton;