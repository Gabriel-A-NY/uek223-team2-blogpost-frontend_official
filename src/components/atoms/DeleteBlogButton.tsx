import { Button } from "@mui/material";
import ButtonProperties from "../../types/ButtonProperties";

function DeleteBlogButton({ onClick }: ButtonProperties) {
    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            Delete Blog
        </Button>
    );
}

export default DeleteBlogButton;