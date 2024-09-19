import { Button } from "@mui/material";
import ButtonProperties from "../../types/ButtonProperties";

function UpdateBlogButton({ onClick }: ButtonProperties) {
    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            Update Blog
        </Button>
    );
}

export default UpdateBlogButton;