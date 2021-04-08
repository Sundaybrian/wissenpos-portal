import React, { useState } from "react";
import MenuSidebar from "../MenuSidebar";
import Button from "@material-ui/core/Button";
import FormikDialog from "../../../../Base/FormikDialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddIcon from "@material-ui/icons/Add";
import MenuForm from "../MenuForm";
import MenuCategoriesList from "./MenuCategoriesList";
import MealPreview from "../MealPreview";
import MenuButton from "./MenuButton";

import {
    createMenu,
    addCategoryMenu,
} from "../../../../../Redux/actions/menuActions";
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
}));

function ViewMenuContainer(props) {
    const classes = useStyles();
    const {
        company,
        companyMenu,
        url,
        toggleMenuView,
        setToogleMenuView,
        // local
        createMenu,
        addCategoryMenu,
        ui: { loading },
    } = props;
    const [openPopup, setOpenPopup] = useState(false);
    const [meal, setMeal] = useState(null); // controls the add meal sidebar &

    // submitting menu creation
    const handleMenuSubmit = (values, actions) => {
        const menuData = {
            ...values,
        };

        createMenu(company[0].id, menuData);
        actions.resetForm();
        setOpenPopup(false);
    };

    return (
        <>
            <MenuSidebar title={company[0].name}>
                <div>
                    {companyMenu !== null ? (
                        <MenuButton companyMenu={companyMenu} />
                    ) : (
                        <FormikDialog
                            title="Create Menu"
                            openPopup={openPopup}
                            setOpenPopup={setOpenPopup}
                            render={(open) => (
                                <Button
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<AddIcon />}
                                    fullWidth
                                    onClick={open}
                                >
                                    Create New Menu
                                </Button>
                            )}
                        >
                            <MenuForm
                                handleMenuSubmit={handleMenuSubmit}
                                loading={loading}
                            />
                        </FormikDialog>
                    )}
                    <div className={classes.dualPanel}>
                        {companyMenu && (
                            <MenuCategoriesList
                                companyID={company[0].id}
                                addCategoryMenu={addCategoryMenu}
                                menuID={companyMenu.id}
                                categories={companyMenu.categories || []}
                                setMeal={setMeal}
                                setToogleMenuView={setToogleMenuView}
                                url={url}
                            />
                        )}
                    </div>
                </div>
            </MenuSidebar>

            <div className={classes.content}>
                {/* for clicked meal preview */}
                <div>
                    {meal && !toggleMenuView && (
                        <MealPreview
                            meal={meal}
                            setToogleMenuView={setToogleMenuView}
                            toggleMenuView={toggleMenuView}
                            // setAddMeal={setAddMeal}
                            setMeal={setMeal}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    ui: state.ui,
});

const mapActionsToProps = {
    createMenu,
    addCategoryMenu,
};

export default connect(mapStateToProps, mapActionsToProps)(ViewMenuContainer);
