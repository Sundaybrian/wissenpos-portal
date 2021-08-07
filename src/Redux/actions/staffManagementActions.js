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
    SET_SUCCESS,
} from "../types";

//addstaff
export const addStaff =
    ({ staffData, closeModal }) =>
    (dispatch) => {
        console.log(staffData.company_id);
        dispatch({ type: LOADING_UI });

        const url = `/company/${staffData.company_id}/accounts`;

        axios
            .post(url, staffData)
            .then((res) => {
                const staff = res.data;
                closeModal();
                dispatch({ type: ADD_STAFF, payload: staff });
                dispatch({
                    type: SET_SUCCESS,
                    payload: `${staffData.user.firstName} created successfully`,
                });
            })
            .catch((err) => {
                console.log(err, "Staff create error");
                dispatch(setErrors(err));
            });
    };

// fetch staff
export const fetchStaff = (company_id) => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    const url = `/company/${company_id}/accounts`;

    axios
        .get(url)
        .then((res) => {
            const payload = res.data;
            dispatch({ type: LOAD_STAFF, payload });
            dispatch({
                type: SET_SUCCESS,
                payload: `Accounts fetched successfully`,
            });
        })
        .catch((err) => {
            dispatch(setErrors(err));
        });
};

// get staff by id

// edit staff
export const editStaff = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get("/");
};

// delete staff
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
            dispatch(setErrors(err));
        });
};

// helper function
export const setErrors = (err) => (dispatch) => {
    if (err.response) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data,
        });
    } else {
        dispatch({
            type: SET_ERRORS,
            payload: err,
        });
    }
};
