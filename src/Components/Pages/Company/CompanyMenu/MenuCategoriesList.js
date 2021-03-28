import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
    Link,
    Route,
    useLocation,
    useHistory,
    useRouteMatch,
} from "react-router-dom";
import CategoryModal from "./CategoryModal";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        // maxWidth: 360,
        display: "flex",
        flexDirection: "row",
        backgroundColor: theme.palette.background.paper,
    },

    categoriesList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflowY: "auto",
        flex: "auto",
    },
    mealList: {
        display: "flex",
        flexDirection: "column",
        marginTop: "15px",
        overflowY: "auto",
        flex: "auto",
    },
}));

// 003
function MealItem(props) {
    // holds the meal item
    // holds a single category
    const { item, setMeal, setAddMeal, setDualPanel } = props;

    const history = useHistory();
    const { pathname } = useRouteMatch();
    // load meals

    return (
        <>
            <ListItem
                button
                onClick={() => {
                    console.log("clicked");
                    setDualPanel(true);
                    setMeal(item);
                }}
            >
                <ListItemText primary={item.name} />
            </ListItem>
            <ListItem button onClick={() => setAddMeal(item)}>
                <ListItemText primary="Add Meal+" />
            </ListItem>
        </>
    );
}

//002
export function MenuCategory(props) {
    // holds a single category
    const { category, to } = props;
    const { pathname } = useLocation();
    return (
        <ListItem
            button
            to={to}
            component={Link}
            selected={pathname === `${to}`}
        >
            <ListItemText primary={category.name} />
        </ListItem>
    );
}

// 001
function MenuCategoriesList(props) {
    const classes = useStyles();
    const {
        categories,
        setDualPanel,
        menuID,
        companyID,
        setMeal,
        setAddMeal, // used to trigger add recipe sidebar
        url,
        addCategoryMenu,
    } = props;

    const meals = [
        {
            id: 1,
            name: "Boiled meat",
            price: 200,
            description: "Best meat to salivate over",
            category_id: 1,
        },
        {
            id: 2,
            name: "Boiled meat 2",
            price: 200,
            description: "Best meat to salivate over",
            category_id: 1,
        },
    ];

    return (
        <div className={classes.root}>
            <div className={classes.categoriesList}>
                {/* category list */}
                <List component="nav" aria-label="secondary mailbox folders">
                    {categories.map((category, index) => (
                        <MenuCategory
                            category={category}
                            key={index}
                            to={`${url}/category/${category.id}`}
                        />
                    ))}
                </List>

                <CategoryModal
                    title="Add Category"
                    addCategoryMenu={addCategoryMenu}
                    companyID={companyID}
                    menuID={menuID}
                    render={(open) => (
                        <ListItem button onClick={open}>
                            <ListItemText primary="Add Category" />
                        </ListItem>
                    )}
                />
            </div>

            {/* ******************meal list *********************/}
            <div className={classes.mealList}>
                <Route
                    path={`${url}/category/:catId`}
                    render={({ match }) => {
                        const item = categories.find(
                            (r) => r.id == match.params.catId
                        );

                        console.log(item);

                        return (
                            <MealItem
                                item={item}
                                setMeal={setMeal}
                                setAddMeal={setAddMeal}
                                setDualPanel={setDualPanel}
                            />
                        );
                    }}
                />
            </div>
        </div>
    );
}

export default MenuCategoriesList;
