import React from "react";
import MenuSidebar from "./MenuSidebar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MealForm from "./MealForm";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    mealForm: {
        display: "flex",
        flexDirection: "column",
    },
}));

function AddMealSideBar(props) {
    const { title, setAddMeal, addMealCategory, menuID, companyID } = props;
    const classes = useStyles();
    const { pathname } = useLocation();
    const [categoryID] = pathname.split("/").slice(-1); // splitting and destructuring last item

    const handleMealSubmit = (values, action) => {
        const mealData = {
            ...values,
            category_id: parseInt(categoryID),
        };

        addMealCategory(companyID, menuID, parseInt(categoryID), mealData);
        setAddMeal(null);
        // handleClose();
    };

    return (
        <MenuSidebar title={title}>
            <div className={classes.mealForm}>
                <MealForm
                    handleMealSubmit={handleMealSubmit}
                    setAddMeal={setAddMeal}
                />
            </div>
        </MenuSidebar>
    );
}

export default AddMealSideBar;
