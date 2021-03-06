import axios from "axios";
import {
    ADD_STAFF,
    CLEAR_CURRENT,
    LOAD_STAFF,
    SET_CURRENT,
    SET_STAFF,
    DELETE_STAFF,
    STAFF_ERROR,
    LOADING_UI,
    CLEAR_ERRORS,
    SET_ERRORS,
    LOADING_DATA,
} from "../types";

//addstaff
export const addStaff = (staffData) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .post("/account/create-staff", staffData)
        .then((res) => {
            const staff = res.data;
            dispatch({ type: ADD_STAFF, payload: staff });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};
// fetch staff

export const fetchStaff = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get("/");
};

// get staff by id
// delete staff
//addstaff
export const deleteStaff = (staffData) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .post("/account/delete-staff", staffData)
        .then((res) => {
            const staff = res.data;
            dispatch({ type: DELETE_STAFF, payload: staffData });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};
// edit staff
