import React, { useEffect } from "react";
import { connect } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { fetchMealsByCategory } from "../../../../../Redux/actions/menuActions";

// 003
function MealsList(props) {
    // holds the meal item
    // holds a single category
    const {
        category,
        setMeal,
        setToogleMenuView,
        fetchMealsByCategory,
        company,
        menu: { menu, currentCategory },
    } = props;

    useEffect(() => {
        // fetch meals based on category
        fetchMealsByCategory(company[0].id, menu.id, category.id);
        setMeal(null);
    }, [category.id]);

    return (
        <>
            {currentCategory.items.length > 0 &&
                currentCategory.items.map((m, index) => (
                    <ListItem
                        button
                        onClick={() => {
                            setMeal(m);
                        }}
                        key={index}
                    >
                        <ListItemText primary={m.name} />
                    </ListItem>
                ))}
            <ListItem
                button
                onClick={() => {
                    setToogleMenuView(true); // launches edit/add container
                }}
            >
                <ListItemText primary="Add Meal+" />
            </ListItem>
        </>
    );
}

const mapStateToProps = (state) => ({
    company: state.company.company,
    menu: state.menu,
});

const mapActionsToProps = {
    fetchMealsByCategory,
};

export default connect(mapStateToProps, mapActionsToProps)(MealsList);
