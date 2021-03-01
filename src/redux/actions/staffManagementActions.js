import axios from "axios";
import {
    ADD_STAFF,
    CLEAR_CURRENT,
    LOAD_STAFF,
    SET_CURRENT,
    CLEAR_CURRENT,
    SET_STAFF,
    DELETE_STAFF,
    STAFF_ERROR,
    LOADING_UI,
    CLEAR_ERRORS,
    SET_ERRORS,
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

// get staff by id
// delete staff
// edit staff
// fetch staff
