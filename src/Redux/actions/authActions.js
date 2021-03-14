import { SET_ERRORS, SET_USER, LOADING_UI, CLEAR_ERRORS } from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .post("/accounts/login", userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);

            setUserData(res.data.user);
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
            dispatch({ type: CLEAR_ERRORS });
            history.push("/dashboard");
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
