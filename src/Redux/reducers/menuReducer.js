import {
    LOAD_MENU,
    ADD_MENU,
    RENAME_MENU,
    DELETE_MENU,
    ADD_CATEGORY,
    SET_CURRENT_CATEGORY,
    ADD_MEAL,
    CLEAR_CURRENT_MEAL,
} from "../types";

const initialState = {
    menu: null,
    currentMenu: null,
    currentCategory: {
        items: [],
    },
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
        case ADD_CATEGORY:
            return {
                ...state,
                menu: {
                    ...state.menu,
                    categories: state.menu.categories.concat(action.payload),
                },
            };

        case ADD_MEAL:
            return {
                ...state,
                currentCategory: {
                    ...state.currentCategory,
                    items: state.currentCategory.items.concat(action.payload),
                },
            };
        case CLEAR_CURRENT_MEAL:
            return {
                ...state,
                currentCategory: {
                    items: [],
                },
            };
        case SET_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.payload,
            };

        default:
            return state;
    }
};

export default company;
