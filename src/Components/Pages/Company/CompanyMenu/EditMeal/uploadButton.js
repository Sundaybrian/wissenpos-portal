import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import useStorage from "../../../../../Hooks/useStorage";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: "none",
    },

    progressBar: {
        height: "5px",
        background: theme.palette.primary,
        marginTop: "20px",
    },
}));

export default function UploadButton(props) {
    const classes = useStyles();
    const { imageChangeHandler, currentMeal } = props;

    return (
        <div className={classes.root}>
            <input
                name="image_url"
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                onChange={imageChangeHandler}
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button
                    variant="outlined"
                    color="default"
                    component="span"
                    startIcon={<PhotoCamera />}
                    fullWidth
                >
                    {currentMeal ? "Edit Image" : "Add Image"}
                </Button>
            </label>
        </div>
    );
}
