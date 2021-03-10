import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
    },
    mealList: {
        display: "flex",
        flexDirection: "column",
        marginTop: "15px",
    },
}));

function Meal(props) {
    // holds the meal item
    // holds a single category
    const { meal } = props;
    return (
        <ListItem button={true}>
            <ListItemText primary={meal.name} />
        </ListItem>
    );
}

export function MenuCategory(props) {
    // holds a single category
    const { category, onClick } = props;
    return (
        <ListItem button={true} onClick={() => onClick(category.id)}>
            <ListItemText primary={category.name} />
        </ListItem>
    );
}

function MenuCategoriesList(props) {
    const { categories, dualPanel, menuID } = props;
    const classes = useStyles();

    const [menuState, setMenuState] = useState({
        currentMenuId: menuID, // eg first menu id
        currentMenuCategoryID: null, // eg lunch id
        currentMealID: null, // eg boiled meat id
        meals: [], // eg array for lunch items
    });

    const findMenuCategoryItems = (categoryId) => {
        // searches and returns
        console.log("clicked");
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
                name: "Boiled meat",
                price: 200,
                description: "Best meat to salivate over",
                category_id: 1,
            },
        ];

        setMenuState({
            ...menuState,
            currentMenuCategoryID: categoryId,
            currentMealID: meals[0].id,
            meals: meals,
        });
    };

    return (
        <div className={classes.root}>
            <div className={classes.categoriesList}>
                <List component="nav" aria-label="secondary mailbox folders">
                    {categories.map((category, i) => (
                        <MenuCategory
                            category={category}
                            key={i}
                            onClick={() => findMenuCategoryItems(category.id)}
                        />
                    ))}
                </List>
                <ListItem button>
                    <ListItemText primary="Add Category" />
                </ListItem>
            </div>
            {/* meal list */}
            <div className={classes.mealList}>
                <List component="nav" aria-label="secondary mailbox folders">
                    {menuState.meals.map((meal, i) => (
                        <Meal meal={meal} key={i} />
                    ))}
                </List>
                <ListItem button>
                    <ListItemText primary="Add Category" />
                </ListItem>
            </div>
        </div>
    );
}

export default MenuCategoriesList;
