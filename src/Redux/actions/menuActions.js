import {
    SET_ERRORS,
    LOADING_UI,
    CLEAR_ERRORS,
    LOAD_MENU,
    ADD_MENU,
    RENAME_MENU,
    DELETE_MENU,
    SET_SUCCESS,
    ADD_CATEGORY,
} from "../types";
import axios from "axios";

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
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
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
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

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
            return dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
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
            return dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const addCategoryMenu = (companyID, menuID, categoryData) => (
    dispatch
) => {
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
            return dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};
// set current
// clear current
// delete company soon enough

// get menu by id
// get all menus
// get meals by category id

// delete menu

// delete category
// delete meal
