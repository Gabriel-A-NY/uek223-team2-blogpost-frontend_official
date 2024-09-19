import { Button } from "@mui/material";
import ButtonProperties from "../../types/ButtonProperties";

function AddBlogPostButton({ onClick, id }: ButtonProperties) {
    return (
        <Button variant="contained" color="primary" onClick={onClick} id={id}>
            +
        </Button>
    );
}

export default AddBlogPostButton;
