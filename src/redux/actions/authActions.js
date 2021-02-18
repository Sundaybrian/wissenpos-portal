import { SET_ERRORS, SET_USER, LOADING_UI, CLEAR_ERRORS } from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });

    axios
        .post("/accounts/login", userData)
        .then((res) => {
            const token = `Bearer ${res.data.token}`;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;

            dispatch(setUserData(res.data.user));
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

const setUserData = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};
