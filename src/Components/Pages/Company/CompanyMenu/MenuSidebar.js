import React from "react";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        height: "100vh",
        overflowX: "scroll",
        backgroundColor: "#fb3",
    },
}));

function MenuSidebar(props) {
    const { title, children } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="h5">{title}</Typography>
            <div>{children}</div>
        </div>
    );
}

export default MenuSidebar;
