import {Button} from "@mui/material";
import React from "react";
import ButtonProperties from "../../types/ButtonProperties";

export default function CancelButton({ onClick }: ButtonProperties) {
    return (
        <Button type="submit" variant="contained" color="primary">
            Cancel
        </Button>
    )
}
