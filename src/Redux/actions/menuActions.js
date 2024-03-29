import {
    SET_ERRORS,
    LOADING_UI,
    CLEAR_ERRORS,
    LOAD_MENU,
    // ADD_MENU,
    RENAME_MENU,
    DELETE_MENU,
    SET_SUCCESS,
    ADD_CATEGORY,
    RENAME_CATEGORY,
    DELETE_CATEGORY,
    SET_CURRENT_CATEGORY,
    ADD_MEAL,
    EDIT_MEAL,
    DELETE_MEAL,
    SET_CURRENT_MEAL,
    CLEAR_CURRENT_MEAL,
} from "../types";
import axios from "axios";
import { setErrors } from "./staffManagementActions";

export const loadMenu = (companyID) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .get(`/company/${companyID}/menu`)
        .then((res) => {
            dispatch({ type: LOAD_MENU, payload: res.data });
            dispatch({
                type: SET_SUCCESS,
                payload: `menu fetched successfully`,
            });

            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            dispatch(setErrors(err));
        });
};

export const loadMenuByID = (companyID, menuID) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .get(`/company/${companyID}/menu/${menuID}`)
        .then((res) => {
            dispatch({ type: LOAD_MENU, payload: res.data });
            dispatch({
                type: SET_SUCCESS,
                payload: `menu fetched successfully`,
            });

            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            dispatch(setErrors(err));
        });
};

// create a menu
export const createMenu = (companyID, menuData) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .post(`/company/${companyID}/menu`, menuData)
        .then((res) => {
            dispatch(loadMenuByID(companyID, res.data.id));
            // dispatch({ type: ADD_MENU, payload: res.data });
            dispatch({
                type: SET_SUCCESS,
                payload: `${menuData.name} created successfully`,
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            dispatch(setErrors(err));
        });
};

// update menu
export const updateMenu = (id, companyID, menuData) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .patch(`/company/${companyID}/menu/${id}`, menuData)
        .then((res) => {
            dispatch({ type: RENAME_MENU, payload: res.data });
            dispatch({
                type: SET_SUCCESS,
                payload: `${res.data.name} updated successfully`,
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            dispatch(setErrors(err));
        });
};

// delte a menu

export const deleteMenu = (companyID, menuID, setOpenPopUp) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .delete(`/company/${companyID}/menu/${menuID}`)
        .then((res) => {
            dispatch({ type: DELETE_MENU, payload: res.data });
            dispatch({
                type: SET_SUCCESS,
                payload: "menu deleted updated successfully",
            });
            setOpenPopUp(false); // if it was successfull delete
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            setOpenPopUp(false);
            dispatch(setErrors(err));
        });
};

// add category to a menu
export const addCategoryMenu =
    (companyID, menuID, categoryData) => (dispatch) => {
        dispatch({ type: LOADING_UI });

        axios
            .post(`/company/${companyID}/menu/${menuID}/category`, categoryData)
            .then((res) => {
                dispatch({ type: ADD_CATEGORY, payload: res.data });
                dispatch({
                    type: SET_SUCCESS,
                    payload: `${res.data.name} created successfully`,
                });
                dispatch({ type: CLEAR_ERRORS });
            })
            .catch((err) => {
                dispatch(setErrors(err));
            });
    };

// rename category
export const renameCategoryMenu =
    ({ companyID, menuID, categoryData, categoryID }) =>
    (dispatch) => {
        dispatch({ type: LOADING_UI });

        axios
            .patch(
                `/company/${companyID}/menu/${menuID}/category/${categoryID}`,
                categoryData
            )
            .then((res) => {
                dispatch({ type: RENAME_CATEGORY, payload: res.data });
                dispatch({
                    type: SET_SUCCESS,
                    payload: `${res.data.name} updated successfully`,
                });
                dispatch({ type: CLEAR_ERRORS });
            })
            .catch((err) => {
                dispatch(setErrors(err));
            });
    };

// delete category
export const deleteCategoryMenu =
    ({ companyID, menuID, categoryID, history }) =>
    (dispatch) => {
        dispatch({ type: LOADING_UI });

        axios
            .delete(
                `/company/${companyID}/menu/${menuID}/category/${categoryID}`
            )
            .then((res) => {
                dispatch({ type: DELETE_CATEGORY, payload: res.data });
                dispatch({
                    type: SET_SUCCESS,
                    payload: `category deleted successfully`,
                });
                dispatch({ type: CLEAR_ERRORS });
                history.goBack();
            })
            .catch((err) => {
                dispatch(setErrors(err));
            });
    };

// create meal for a given category
export const addMealCategory =
    (companyID, menuID, categoryID, mealData) => (dispatch) => {
        dispatch({ type: LOADING_UI });

        axios
            .post(
                `/company/${companyID}/menu/${menuID}/category/${categoryID}/item`,
                mealData
            )
            .then((res) => {
                dispatch({ type: ADD_MEAL, payload: res.data });
                dispatch({
                    type: SET_SUCCESS,
                    payload: `${res.data.name} created successfully`,
                });
                dispatch({ type: CLEAR_ERRORS });
            })
            .catch((err) => {
                dispatch(setErrors(err));
            });
    };

//edit meal
export const editMealCategory =
    (companyID, menuID, categoryID, mealID, mealData) => (dispatch) => {
        dispatch({ type: LOADING_UI });

        axios
            .patch(
                `/company/${companyID}/menu/${menuID}/category/${categoryID}/item/${mealID}`,
                mealData
            )
            .then((res) => {
                dispatch({ type: EDIT_MEAL, payload: res.data });
                dispatch({
                    type: SET_SUCCESS,
                    payload: `${res.data.name} updated successfully`,
                });
                dispatch(clearCurrentMeal()); // remove current meal from state
                dispatch({ type: CLEAR_ERRORS });
            })
            .catch((err) => {
                dispatch(setErrors(err));
            });
    };

// load meals for a selected category
export const fetchMealsByCategory =
    (companyID, menuID, categoryID) => (dispatch) => {
        dispatch({ type: LOADING_UI });

        axios
            .get(`/company/${companyID}/menu/${menuID}/category/${categoryID}`)
            .then((res) => {
                dispatch({ type: SET_CURRENT_CATEGORY, payload: res.data });
                dispatch({
                    type: SET_SUCCESS,
                    payload: `${res.data.name} meals fetched successfully`,
                });

                dispatch({ type: CLEAR_ERRORS });
            })
            .catch((err) => {
                dispatch(setErrors(err));
            });
    };

// delte a meal

export const deleteMeal =
    ({ companyID, menuID, categoryID, itemID, setDeleteOpen, setMeal }) =>
    (dispatch) => {
        dispatch({ type: LOADING_UI });

        axios
            .delete(
                `/company/${companyID}/menu/${menuID}/category/${categoryID}/item/${itemID}`
            )
            .then((res) => {
                dispatch({ type: DELETE_MEAL, payload: res.data });
                dispatch({
                    type: SET_SUCCESS,
                    payload: "meal deleted updated successfully",
                });
                setMeal(null);
                setDeleteOpen(false); // if it was successfull delete
                dispatch({ type: CLEAR_ERRORS });
            })
            .catch((err) => {
                setDeleteOpen(false);
                dispatch(setErrors(err));
            });
    };

// set current meal
export const setCurrentMeal = (meal) => (dispatch) => {
    dispatch({
        type: SET_CURRENT_MEAL,
        payload: meal,
    });
};

// CLEAR current meal
export const clearCurrentMeal = () => (dispatch) => {
    dispatch({
        type: CLEAR_CURRENT_MEAL,
    });
};
