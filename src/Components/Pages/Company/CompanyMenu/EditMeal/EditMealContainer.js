import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    editMealCategory,
    addMealCategory,
} from "../../../../../Redux/actions/menuActions";
import MenuSidebar from "../MenuSidebar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MealPreview from "../MealPreview";
import MealForm from "./MealForm";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    dualPanel: {
        display: "flex",
        flexDirection: "row",
    },
    content: {
        flexGrow: 1,
        backgroundColor: "red",
    },
    mealForm: {
        display: "flex",
        flexDirection: "column",
    },
}));

function EditMealContainer(props) {
    const classes = useStyles();

    const [addMeal, setAddMeal] = useState(null);

    const {
        companyID,
        menuID,
        addMealCategory,
        editMealCategory,
        toggleMenuView,
        setToogleMenuView,
        menu: { currentMeal },
        title,
    } = props;
    const { pathname } = useLocation();
    const [categoryID] = pathname.split("/").slice(-1);

    useEffect(() => {
        if (currentMeal !== null) {
            setAddMeal(currentMeal);
        } else {
            setAddMeal(null);
        }
    }, []);

    const handleMealSubmit = (values, action) => {
        const mealData = {
            ...values,
            category_id: parseInt(categoryID),
        };

        addMealCategory(companyID, menuID, parseInt(categoryID), mealData);
        setToogleMenuView(false);
        // handleClose();
    };

    const handleMealEdit = (values, action) => {
        const mealData = {
            ...values,
            category_id: currentMeal.category_id,
        };

        editMealCategory(
            companyID,
            menuID,
            currentMeal.category_id,
            currentMeal.id,
            mealData
        );
        setAddMeal(null);
        setToogleMenuView(false);
    };

    return (
        <>
            <MenuSidebar title={title}>
                <div className={classes.mealForm}>
                    <MealForm
                        handleMealSubmit={handleMealSubmit}
                        handleMealEdit={handleMealEdit}
                        setAddMeal={setAddMeal}
                        currentMeal={currentMeal}
                        setToogleMenuView={setToogleMenuView}
                    />
                </div>
            </MenuSidebar>

            <div className={classes.content}>
                {/* for add meal & meal edit preview */}
                <div>
                    {addMeal && (
                        <MealPreview
                            meal={addMeal}
                            toggleMenuView={toggleMenuView}
                            setAddMeal={setAddMeal}
                            // setMeal={setMeal}
                            setToogleMenuView={setToogleMenuView}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    ui: state.ui,
    menu: state.menu,
});

const mapActionsToProps = {
    editMealCategory,
    addMealCategory,
};

export default connect(mapStateToProps, mapActionsToProps)(EditMealContainer);
