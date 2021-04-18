import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useRouteMatch } from "react-router-dom";
import { drawerWidth } from "../../../Layout/AppBarAndDrawer/AppBarAndDrawer";
import { connect } from "react-redux";

import {
    loadMenu,
    editMealCategory,
    addMealCategory,
} from "../../../../Redux/actions/menuActions";
import Loader from "../../../Base/Loader";
import ViewMenuContainer from "./ViewMeal/ViewMenuContainer";
import EditMenuContainer from "./EditMeal/EditMealContainer";

const useStyles = makeStyles((theme) => ({
    dualPanel: {
        display: "flex",
        flexDirection: "row",
    },
    content: {
        flexGrow: 1,
    },
    menuContainer: {
        height: "100vh",
        display: "flex",
        // position: "fixed",
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        position: "relative",
    },
}));

function CompanyMenu(props) {
    const classes = useStyles();
    const [toggleMenuView, setToogleMenuView] = useState(false);

    const {
        auth,
        ui: { loading },
        loadMenu,
        Menu: { menu: companyMenu },
        company: { company },
    } = props;

    const { url } = useRouteMatch();

    useEffect(() => {
        if (companyMenu == null) {
            loadMenu(company[0].id);
        } else {
            return;
        }
    }, []);

    if (loading) {
        <Loader />;
    }

    return (
        <div className={classes.menuContainer}>
            {toggleMenuView == true ? (
                <EditMenuContainer
                    title={company[0].name}
                    companyID={company[0].id}
                    menuID={companyMenu.id}
                    setToogleMenuView={setToogleMenuView}
                />
            ) : (
                <ViewMenuContainer
                    company={company}
                    companyMenu={companyMenu}
                    url={url}
                    toggleMenuView={toggleMenuView}
                    setToogleMenuView={setToogleMenuView}
                />
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    ui: state.ui,
    company: state.company,
    Menu: state.menu,
});

const mapActionsToProps = {
    loadMenu,
    addMealCategory,
    editMealCategory,
};

export default connect(mapStateToProps, mapActionsToProps)(CompanyMenu);
