import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    UPDATE_PROFILE,
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
        case UPDATE_PROFILE:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export default auth;
