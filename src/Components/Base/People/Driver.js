import React from "react";
import { useParams } from "react-router-dom";
import Content from "../../Layout/Content/Content";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import DriveIcon from "@material-ui/icons/DriveEta";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
// import VehiclePie from "./VehiclePie";
// import RevenueLine from "./RevenueLine";
import PeopleDialog from "./PeopleDialog";
import { useSelector } from "react-redux";
// import { selectPeople } from "../ReduxTable/peopleSlice";
// import ExpensesTable from "../Dashboard/ExpensesTable";

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        position: "relative",
        height: "100px",
    },
    header: {
        display: "flex",
        position: "absolute",
        width: "calc(100%)",
        top: "-70px",
        alignItems: "flex-end",
        "& > *": {
            margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
        },
    },
    spacer: {
        flexGrow: "1",
    },
    avatar: {
        border: `3px solid white`,
        width: theme.spacing(13),
        height: theme.spacing(13),
        boxShadow: theme.shadows[3],
    },
    actionGroup: {
        display: "flex",
        width: "330px",
        justifyContent: "space-between",
        marginRight: 0,
    },
    summaryCards: {
        display: "flex",
        flexWrap: "wrap",
    },
    summaryCard: {
        margin: theme.spacing(1),
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    tripCard: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
    },
}));

export function SummaryCard({ title, value, component }) {
    const classes = useStyles();
    return (
        <Paper elevation={2} className={classes.summaryCard}>
            <Typography color={"textSecondary"} variant="h5" gutterBottom>
                {title}
            </Typography>
            {component || (
                <Typography color={"primary"} variant="h3">
                    {value}
                </Typography>
            )}
        </Paper>
    );
}
