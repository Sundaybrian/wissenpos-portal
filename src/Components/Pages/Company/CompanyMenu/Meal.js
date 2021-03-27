import { Paper } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));
// will hold the menu name and menu items
function Meal(props) {
    const { meal } = props;

    console.log(meal, "8888888888888888888888888");
    const classes = useStyles();
    return <Paper className={classes.paper}>{meal.name}</Paper>;
}

export default Meal;
