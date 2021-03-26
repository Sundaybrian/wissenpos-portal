import { LOAD_COMPANY, ADD_COMPANY, EDIT_COMPANY } from "../types";

const initialState = {
    company: null,
    currentCompany: null,
    authenticated: false,
};

const company = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COMPANY:
        case ADD_COMPANY:
            return {
                ...state,
                company: res.data,
            };
        case EDIT_COMPANY:
            return {
                ...state,
                compay: {
                    ...state.company,
                    ...res.data,
                },
            };

        default:
            return state;
    }
};

export default company;
