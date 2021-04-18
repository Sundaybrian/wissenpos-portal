import {
    LOAD_MENU,
    ADD_MENU,
    RENAME_MENU,
    DELETE_MENU,
    ADD_CATEGORY,
    RENAME_CATEGORY,
    DELETE_CATEGORY,
    SET_CURRENT_CATEGORY,
    ADD_MEAL,
    EDIT_MEAL,
    DELETE_MEAL,
    CLEAR_CURRENT_MEAL,
    SET_CURRENT_MEAL,
    CLEAR_CURRENT_CATEGORY,
} from "../types";

const initialState = {
    menu: null,
    currentMenu: null,
    currentMeal: null,
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
        case DELETE_MENU:
            return {
                ...state,
                menu: null,
                currentMenu: null,
                currentMeal: null,
                currentCategory: {
                    items: [],
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

        case RENAME_CATEGORY:
            return {
                ...state,
                currentCategory: {
                    ...state.currentCategory,
                    ...action.payload,
                },
                menu: {
                    ...state.menu,
                    categories: state.menu.categories.map((item, index) => {
                        return action.payload.id == item.id
                            ? { ...item, ...action.payload }
                            : item;
                    }),
                },
            };

        case DELETE_CATEGORY:
            return {
                ...state,
                currentCategory: {
                    items: [],
                },
                menu: {
                    ...state.menu,
                    categories: state.menu.categories.filter((item, index) => {
                        return action.payload.id !== item.id;
                    }),
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
        case DELETE_MEAL:
            return {
                ...state,
                currentCategory: {
                    ...state.currentCategory,
                    items: state.currentCategory.items.filter(
                        (item) => item.id !== action.payload.id
                    ),
                },
            };
        case EDIT_MEAL:
            return {
                ...state,
                currentCategory: {
                    ...state.currentCategory,
                    items: state.currentCategory.items.filter((item, index) => {
                        return action.payload.id == item.id
                            ? { ...item, ...action.payload }
                            : item;
                    }),
                },
            };
        case SET_CURRENT_MEAL:
            return {
                ...state,
                currentMeal: action.payload,
            };
        case CLEAR_CURRENT_MEAL:
            return {
                ...state,
                currentMeal: null,
            };
        case CLEAR_CURRENT_CATEGORY:
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
