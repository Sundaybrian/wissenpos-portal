import React, { useState } from "react";
import Content from "../../../Layout/Content/Content";
import MenuSidebar from "./MenuSidebar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Grid from "@material-ui/core/Grid";
import MenuCategoriesList from "./MenuCategoriesList";
import Meal from "./Meal";

const useStyles = makeStyles((theme) => ({
    dualPanel: {},
    dualPanelContent: {},
}));

function CompanyMenu() {
    const classes = useStyles();
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
        ],
    });

    console.log("company menu");

    const [dualPanel, setDualPane] = useState(false);
    const [mealCurrent, setMealCurrent] = useState(null);

    const toggleDualPanel = () => {
        setDualPane(!dualPanel);
    };

    const setMeal = (meal) => {
        console.log(meal);
        setMealCurrent(meal);
        setDualPane(true);
    };

    return (
        <Content>
            <Grid container>
                <Grid item xs={12} md={5} lg={4}>
                    <MenuSidebar title="Company x">
                        <div className={classes.dualPanelContent}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                endIcon={<ArrowDropDownIcon />}
                                fullWidth
                            >
                                {menu.name}
                            </Button>
                            <div className={classes.dualPanel}>
                                <MenuCategoriesList
                                    menuID={menu.id}
                                    categories={menu.categories}
                                    dualPanel={dualPanel}
                                    setMeal={setMeal}
                                />
                            </div>
                        </div>
                    </MenuSidebar>
                </Grid>
                <Grid item xs={12} md={7} lg={8}>
                    {dualPanel && <Meal meal={mealCurrent} />}
                </Grid>
            </Grid>
        </Content>
    );
}

export default CompanyMenu;
