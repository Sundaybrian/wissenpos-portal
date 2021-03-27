import { LOAD_MENU, ADD_MENU, RENAME_MENU, DELETE_MENU } from "../types";

const initialState = {
    menu: null,
    currentMenu: null,
};

const company = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_MENU:
        case ADD_MENU:
            return {
                ...state,
                menu: action.payload,
            };
        case RENAME_MENU:
            return {
                ...state,
                menu: {
                    ...state.menu,
                    ...action.payload,
                },
            };

        default:
            return state;
    }
};

export default company;
