import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0.5),
    },
    label: {
        textTransform: "capitalize",
    },
}));

function Button(props) {
    const classes = useStyles();
    const { size, color, variant, text, onClick, ...rest } = props;
    return (
        <MuiButton
            size={size || "large"}
            color={color || "primary"}
            variant={variant || "contained"}
            {...rest}
            onClick={onClick}
            classes={{
                root: classes.root,
                label: classes.label,
            }}
        >
            {text}
        </MuiButton>
    );
}

export default Button;
