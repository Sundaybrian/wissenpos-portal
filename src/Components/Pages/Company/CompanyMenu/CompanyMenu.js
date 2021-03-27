import React, { useState, useEffect } from "react";
import Content, { Content2 } from "../../../Layout/Content/Content";
import MenuSidebar from "./MenuSidebar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Grid from "@material-ui/core/Grid";
import MenuCategoriesList from "./MenuCategoriesList";
import Meal from "./Meal";
import { useRouteMatch } from "react-router-dom";
import { drawerWidth } from "../../../Layout/AppBarAndDrawer/AppBarAndDrawer";

import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    dualPanel: {
        display: "flex",
        flexDirection: "row",
    },
    content: {
        flexGrow: 1,
        backgroundColor: "red",
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
    const {
        auth,
        ui,
        Menu: { menu: companyMenu },
        company: { company },
    } = props;
    const [menuItem, setMenuItem] = useState(null);
    const { url } = useRouteMatch();
    const [dualPanel, setDualPanel] = useState(false);
    const [meal, setMeal] = useState(null);
    const [menu, setMenu] = useState({
        id: 1,
        name: "Special Menu",
        cover_url: "https://storage.bucket@firebase.com",
        description: "menu so good, you have to bring you wife",
        company: 1,
        active: false,
        categories: [
            {
                id: 1,
                name: "Lunch",
                menu_id: 1,
                created_at: "2021-01-15T02:01:42.813Z",
                updated_at: "2021-01-15T02:01:42.813Z",
            },
            {
                id: 2,
                name: "BreakFast",
                menu_id: 1,
                created_at: "2021-01-15T02:01:42.813Z",
                updated_at: "2021-01-15T02:01:42.813Z",
            },
            {
                id: 3,
                name: "Lunch",
                menu_id: 1,
                created_at: "2021-01-15T02:01:42.813Z",
                updated_at: "2021-01-15T02:01:42.813Z",
            },
            {
                id: 4,
                name: "BreakFast",
                menu_id: 1,
                created_at: "2021-01-15T02:01:42.813Z",
                updated_at: "2021-01-15T02:01:42.813Z",
            },
            {
                id: 5,
                name: "Lunch",
                menu_id: 1,
                created_at: "2021-01-15T02:01:42.813Z",
                updated_at: "2021-01-15T02:01:42.813Z",
            },
            {
                id: 6,
                name: "BreakFast",
                menu_id: 1,
                created_at: "2021-01-15T02:01:42.813Z",
                updated_at: "2021-01-15T02:01:42.813Z",
            },
            {
                id: 7,
                name: "Lunch",
                menu_id: 1,
                created_at: "2021-01-15T02:01:42.813Z",
                updated_at: "2021-01-15T02:01:42.813Z",
            },
            {
                id: 8,
                name: "BreakFast8",
                menu_id: 1,
                created_at: "2021-01-15T02:01:42.813Z",
                updated_at: "2021-01-15T02:01:42.813Z",
            },
        ],
    });

    const toggleDualPanel = () => {
        setDualPanel(!dualPanel);
    };

    return (
        <div className={classes.menuContainer}>
            <MenuSidebar title={company[0].name}>
                <div className={classes.dualPanelContent}>
                    {companyMenu !== null ? (
                        <Button
                            color="secondary"
                            className={classes.button}
                            endIcon={<ArrowDropDownIcon />}
                            fullWidth
                        >
                            {companyMenu.name}
                        </Button>
                    ) : (
                        <Button
                            color="secondary"
                            className={classes.button}
                            endIcon={<AddIcon />}
                            fullWidth
                        >
                            Create New Menu
                        </Button>
                    )}
                    <div className={classes.dualPanel}>
                        <MenuCategoriesList
                            menuID={menu.id}
                            categories={menu.categories}
                            setDualPanel={setDualPanel}
                            setMeal={setMeal}
                            url={url}
                        />
                    </div>
                </div>
            </MenuSidebar>

            <Grid container className={classes.content}>
                <Grid item xs={12} md={7} lg={8}>
                    {dualPanel && <Meal meal={meal} />}
                </Grid>
            </Grid>
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    ui: state.ui,
    company: state.company,
    Menu: state.menu,
});

export default connect(mapStateToProps)(CompanyMenu);
