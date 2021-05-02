import React, { useState } from "react";
import PropTypes from "prop-types";
import Content from "../../../Layout/Content/Content";
import { makeStyles } from "@material-ui/core/styles";
import PeopleDialog from "../../../Base/People/PeopleDialog";
import { Avatar, Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CompanyForm from "./CompanyForm";
import CompanyCard from "./CompanyCard";
import UserCard from "./UserCard";
import SummaryCard from "../../../Base/SummaryCard";
//
import { connect } from "react-redux";
import { updateUserProfile } from "../../../../Redux/actions/authActions";
import { updateCompany } from "../../../../Redux/actions/companyActions";
import UserCardForm from "./UserCardForm";
import CompanyEditForm from "./CompanyEditForm";

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
    const [editCompany, setEditCompany] = useState(false);

    const {
        company: { company },
        user,
        loading,
        updateUserProfile,
        updateCompany,
    } = props;

    const handleUserUpdate = (values, actions, imageUrl) => {
        const userData = {
            ...values,
            image_url: imageUrl ? imageUrl : user.image_url,
        };

        updateUserProfile({ userID: user.id, userData });
        setEditUser(false);
    };

    const handleCompanyUpdate = (values, actions, imageUrl) => {
        console.log("clicked");
        const companyData = {
            ...values,
            logo_url: imageUrl ? imageUrl : company.logo_url,
        };

        updateCompany({ id: company[0].id, companyData });
        setEditCompany(false);
    };

    return (
        <Content>
            <div className={classes.headerContainer}>
                <div className={classes.header}>
                    <Avatar
                        alt={`${user.firstName}`}
                        src={`${user.image_url}`}
                        classes={{
                            root: classes.avatar,
                            circle: classes.circle,
                        }}
                    />
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

            <div className={classes.summaryCards}>
                <>
                    {editCompany ? (
                        <SummaryCard
                            title="Edit Company Info"
                            component={
                                <CompanyEditForm
                                    company={company[0]}
                                    handleCompanyUpdate={handleCompanyUpdate}
                                    setEditCompany={setEditCompany}
                                    loading={loading}
                                />
                            }
                        />
                    ) : (
                        <SummaryCard
                            title="Company Info"
                            component={
                                <CompanyCard
                                    company={company[0]}
                                    setEditCompany={setEditCompany}
                                />
                            }
                        />
                    )}
                </>
                <>
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
                            component={
                                <UserCard
                                    user={user}
                                    setEditUser={setEditUser}
                                />
                            }
                        />
                    )}
                </>
            </div>
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
    updateCompany,
};

Profile.propTypes = {
    updateUserProfile: PropTypes.func.isRequired,
    updateCompany: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
