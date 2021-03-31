import React, { useState, useEffect } from "react";
import MenuSidebar from "./MenuSidebar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Grid from "@material-ui/core/Grid";
import MenuCategoriesList from "./MenuCategoriesList";
import MealPreview from "./MealPreview";
import AddMealSideBar from "./AddMealSideBar";
import { useRouteMatch } from "react-router-dom";
import { drawerWidth } from "../../../Layout/AppBarAndDrawer/AppBarAndDrawer";

import { connect } from "react-redux";
import FormikDialog from "../../../Base/FormikDialog";
import MenuForm from "./MenuForm";
import {
    createMenu,
    loadMenu,
    addCategoryMenu,
    editMealCategory,
    addMealCategory,
} from "../../../../Redux/actions/menuActions";
import Loader from "../../../Base/Loader";

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
        ui: { loading },
        Menu: { menu: companyMenu },
        company: { company },
        createMenu,
        loadMenu,
        addCategoryMenu,
        addMealCategory,
        editMealCategory,
    } = props;
    const [addMeal, setAddMeal] = useState(null); // controls the add meal sidebar & preview
    const [editMeal, setEditMeal] = useState(null); // controls the meal on edit
    const { url } = useRouteMatch();
    const [dualPanel, setDualPanel] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [meal, setMeal] = useState(null); // controls current meal on preview

    const toggleDualPanel = () => {
        setDualPanel(!dualPanel);
    };

    // submitting menu creation
    const handleMenuSubmit = (values, actions) => {
        const menuData = {
            ...values,
        };

        createMenu(company[0].id, menuData);
        actions.resetForm();
        setOpenPopup(false);
    };

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
            {addMeal == null ? (
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
                                    setDualPanel={setDualPanel}
                                    setMeal={setMeal}
                                    setAddMeal={setAddMeal}
                                    url={url}
                                />
                            )}
                        </div>
                    </div>
                </MenuSidebar>
            ) : (
                <AddMealSideBar
                    title={company[0].name}
                    addOREditMeal={addMeal}
                    setAddMeal={setAddMeal}
                    companyID={company[0].id}
                    menuID={companyMenu.id}
                    addMealCategory={addMealCategory}
                    editMealCategory={editMealCategory}
                />
            )}

            <div className={classes.content}>
                {/* for add meal & meal edit preview */}
                <div>
                    {addMeal && (
                        <MealPreview
                            meal={addMeal}
                            setAddMeal={setAddMeal}
                            setMeal={setMeal}
                        />
                    )}
                </div>
                {/* for clicked meal preview */}
                <div>
                    {meal && (
                        <MealPreview
                            meal={meal}
                            setAddMeal={setAddMeal}
                            setMeal={setMeal}
                        />
                    )}
                </div>
            </div>
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
    createMenu,
    loadMenu,
    addCategoryMenu,
    addMealCategory,
    editMealCategory,
};

export default connect(mapStateToProps, mapActionsToProps)(CompanyMenu);
