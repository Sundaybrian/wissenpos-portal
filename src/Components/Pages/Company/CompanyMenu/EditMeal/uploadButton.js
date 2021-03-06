import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        "& > *": {
            margin: theme.spacing(0),
        },
    },
    input: {
        display: "none",
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
