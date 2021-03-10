import React from "react";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "320px",
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#fb3",
    },
}));

function MenuSidebar(props) {
    const { title, children } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h5">{title}</Typography>
            <div>{children}</div>
        </div>
    );
}

export default MenuSidebar;
