import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const style = {
    sideMenu: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "absolute",
        width: "240px",
        maxWidth: "240px",
        left: "0px",
        backgroundColor: "blue",
    },
};

export class Sidebar extends Component {
    render() {
        const { classes } = this.props;
        return <div className={classes.sideMenu}></div>;
    }
}

export default withStyles(style)(Sidebar);
