import {
    SET_ERRORS,
    SET_USER,
    LOADING_UI,
    SET_AUTHENTICATED,
    SET_UAUTHENTICATED,
} from "../types";

const initialState = {
    user: null,
    authenticated: false,
};

const auth = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
            };
        case SET_UAUTHENTICATED:
            return initialState;
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
