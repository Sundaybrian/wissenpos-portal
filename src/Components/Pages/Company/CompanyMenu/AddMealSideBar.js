import React from "react";
import MenuSidebar from "./MenuSidebar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MealForm from "./MealForm";

const useStyles = makeStyles((theme) => ({
    mealForm: {
        display: "flex",
        flexDirection: "column",
    },
}));

function AddMealSideBar(props) {
    const { title, setAddMeal, menuID, companyID } = props;
    const classes = useStyles();

    const handleMealSubmit = (values, action) => {
        // const categoryData = {
        //     ...values,
        //     menu_id: menuID,
        // };
        setAddMeal(null); // addCategoryMenu(companyID, menuID, categoryData);
        // handleClose();
    };

    return (
        <MenuSidebar title={title}>
            <div className={classes.mealForm}>
                <MealForm handleMealSubmit={handleMealSubmit} />
            </div>
        </MenuSidebar>
    );
}

export default AddMealSideBar;
