import React from "react";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        width: "560px",
        maxWidth: "460px",
        height: "100%",
        backgroundColor: "#fb3",
    },
    children: {
        overflowY: "scroll",
        height: "100%",
    },
    header: {
        height: "80px",
        flex: "none",
        padding: theme.spacing(2),
        alignSelf: "center",
    },
}));

function MenuSidebar(props) {
    const { title, children } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h5" component="h4">
                    {" "}
                    {title}
                </Typography>
            </div>
            <div className={classes.children}>{children}</div>
        </div>
    );
}

export default MenuSidebar;
