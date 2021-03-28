import React from "react";
import MenuSidebar from "./MenuSidebar";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    mealForm: {
        display: "flex",
        flexDirection: "column",
    },
}));

function AddMealSideBar(props) {
    const { title } = props;
    const classes = useStyles();
    return (
        <MenuSidebar title={title}>
            <div className={classes.mealForm}></div>
        </MenuSidebar>
    );
}

export default AddMealSideBar;
