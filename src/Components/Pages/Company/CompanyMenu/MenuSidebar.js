import React from "react";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { drawerWidth } from "../../../Layout/AppBarAndDrawer/AppBarAndDrawer";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "300px",
        height: "100vh",
        backgroundColor: "#fb3",
        position: "fixed",
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        position: "relative",
    },
    children: {
        overflowY: "scroll",
        height: "100%",
    },
}));

function MenuSidebar(props) {
    const { title, children } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <div className={classes.children}>{children}</div>
        </div>
    );
}

export default MenuSidebar;
