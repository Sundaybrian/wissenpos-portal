import {
    SET_USER,
    LOADING_UI,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
} from "../types";

const initialState = {
    user: {},
    authenticated: false,
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
            };
        case SET_UNAUTHENTICATED:
            return {
                user: {},
                authenticated: false,
            };
        case SET_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default auth;
