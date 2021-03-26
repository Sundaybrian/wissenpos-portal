import React from "react";
import Content from "../../../Layout/Content/Content";
import Grid from "@material-ui/core/Grid/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PeopleDialog from "../../../Base/People/PeopleDialog";
import { Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CompanyForm from "./CompanyForm";

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        position: "relative",
        height: "100px",
        marginTop: theme.spacing(4),
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

function Profile(props) {
    const classes = useStyles();

    return (
        <Content>
            <div className={classes.headerContainer}>
                <div className={classes.header}>
                    <Typography variant={"h5"}>username</Typography>
                    <div className={classes.spacer} />
                    <div className={classes.actionGroup}>
                        <PeopleDialog
                            title="Create a company"
                            // data={driver}
                            render={(open) => (
                                <Button
                                    color="primary"
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={open}
                                >
                                    Create Company
                                </Button>
                            )}
                        >
                            <CompanyForm />
                        </PeopleDialog>
                    </div>
                </div>
            </div>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque aliquid sequi eveniet temporibus. Corporis voluptatum
                    veniam fugiat dolor similique dicta ad, sint beatae
                    voluptatem. Eligendi id deserunt error maxime quae?
                </Grid>
                <Grid item xs={6}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eaque aliquid sequi eveniet temporibus. Corporis voluptatum
                    veniam fugiat dolor similique dicta ad, sint beatae
                    voluptatem. Eligendi id deserunt error maxime quae?
                </Grid>
            </Grid>
        </Content>
    );
}

export default Profile;
