import { Button } from "@mui/material";
import ButtonProperties from "../../types/ButtonProperties";

function AddBlogPostButton({ onClick }: ButtonProperties) {
    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            Add Blog
        </Button>
    );
}

export default AddBlogPostButton;
