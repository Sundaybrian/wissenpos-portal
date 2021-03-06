import { LOAD_COMPANY, ADD_COMPANY, EDIT_COMPANY } from "../types";

const initialState = {
    company: null,
    currentCompany: null,
};

const company = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COMPANY:
        case ADD_COMPANY:
            return {
                ...state,
                company: action.payload,
            };
        case EDIT_COMPANY:
            return {
                ...state,
                company: state.company.map((company) =>
                    company.id == action.payload.id
                        ? { ...company, ...action.payload }
                        : company
                ),
            };

        default:
            return state;
    }
};

export default company;
