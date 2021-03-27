import { SET_ERRORS, SET_SUCCESS, CLEAR_ERRORS, LOADING_UI } from "../types";

const initialState = {
    loading: false,
    errors: {},
    severity: null,
    loadingData: false,
};

const ui = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload,
                loading: false,
                severity: "error",
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null,
                severity: null,
                successMessage: null,
            };
        case LOADING_UI:
            return {
                ...state,
                loading: true,
            };
        case SET_SUCCESS:
            return {
                ...state,
                errors: {
                    message: action.payload,
                },
                severity: "success",
            };
        default:
            return state;
    }
};

export default ui;
