import React from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Icon, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
    },
}));

function DriverActions(props) {
    const { viewStaff } = props;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Icon onClick={viewStaff}>
                <VisibilityIcon />
            </Icon>
        </div>
    );
}

export default DriverActions;
