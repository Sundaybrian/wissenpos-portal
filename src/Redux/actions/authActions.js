import {
    SET_ERRORS,
    SET_UNAUTHENTICATED,
    SET_SUCCESS,
    SET_USER,
    LOADING_UI,
    CLEAR_ERRORS,
} from "../types";
import axios from "axios";
import { loadCompany } from "./companyActions";

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .post("/accounts/login", userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);

            dispatch(setUserData(res.data.user));
            dispatch(loadCompany()); // fetch user's company
            dispatch({
                type: SET_SUCCESS,
                payload: `account ${res.data.user.email} welcome back`,
            });
            dispatch({ type: CLEAR_ERRORS });
            history.push("/dashboard");
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

export const registerUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .post("/accounts/register-owner", userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);

            setUserData(res.data.user);
            dispatch({
                type: SET_SUCCESS,
                payload: `account ${res.data.user.email} created successfully`,
            });
            dispatch({ type: CLEAR_ERRORS });
            history.push("/company-registration");
        })
        .catch((err) => {
            return dispatch({
                type: SET_ERRORS,
                payload: err.response.data,
            });
        });
};

const setUserData = (user) => (dispatch) => {
    dispatch({
        type: SET_USER,
        payload: user,
    });
};

const setAuthorizationHeader = (token) => {
    const _token = `Bearer ${token}`;
    localStorage.setItem("token", _token);
    axios.defaults.headers.common["Authorization"] = _token;
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: SET_UNAUTHENTICATED });
    window.location.href = "/login";
};
