import React, { useState } from "react";
import PropTypes from "prop-types";
import Content from "../../../Layout/Content/Content";
import Grid from "@material-ui/core/Grid/Grid";
import { makeStyles } from "@material-ui/core/styles";
import PeopleDialog from "../../../Base/People/PeopleDialog";
import { Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CompanyForm from "./CompanyForm";
import CompanyCard from "./CompanyCard";
import UserCard from "./UserCard";
import SummaryCard from "../../../Base/SummaryCard";
//
import { connect } from "react-redux";
import { updateUserProfile } from "../../../../Redux/actions/authActions";
import UserCardForm from "./UserCardForm";

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
    const [editUser, setEditUser] = useState(false);
    const {
        company: { company },
        user,
        loading,
        updateUserProfile,
    } = props;

    const handleUserUpdate = (values, actions, imageUrl) => {
        const userData = {
            ...values,
            image_url: imageUrl ? imageUrl : user.image_url,
        };

        updateUserProfile({ userID: user.id, userData });
        setEditUser(false);
    };

    return (
        <Content>
            <div className={classes.headerContainer}>
                <div className={classes.header}>
                    <Typography variant={"h5"}>Hi, {user.firstName}</Typography>
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
                                    disabled={
                                        company !== null && company.length > 0
                                            ? true
                                            : false
                                    }
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
                    {company !== null && company.length > 0 ? (
                        <SummaryCard
                            title="Company Info"
                            component={<CompanyCard company={company[0]} />}
                        />
                    ) : (
                        <SummaryCard title="You dont have any compay, please create one" />
                    )}
                </Grid>
                <Grid item xs={6}>
                    {editUser ? (
                        <SummaryCard
                            title="User Info"
                            component={
                                <UserCardForm
                                    user={user}
                                    loading={loading}
                                    setEditUser={setEditUser}
                                    handleUserUpdate={handleUserUpdate}
                                />
                            }
                        />
                    ) : (
                        <SummaryCard
                            title="User Info"
                            component={<UserCard user={user} />}
                        />
                    )}
                </Grid>
            </Grid>
        </Content>
    );
}
const mapStateToProps = (state) => ({
    company: state.company,
    user: state.auth.user,
    loading: state.ui.loading,
});

const mapActionsToProps = {
    updateUserProfile,
};

Profile.propTypes = {
    updateUserProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
