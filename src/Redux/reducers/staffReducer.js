import {
    ADD_STAFF,
    CLEAR_CURRENT,
    LOAD_STAFF,
    SET_CURRENT,
    SET_STAFF,
    DELETE_STAFF,
    STAFF_ERROR,
    UPDATE_STAFF,
} from "../types";

const initialState = {
    staff: [
        {
            id: 1,
            department: "finance",
            firstName: "sunday",
            lastName: "brian",
            email: "sundaypriest@outlook.com",
            img: "https://media3.s-nbcnews.com/j/newscms/2019_41/3047866/191010-japan-stalker-mc-1121_06b4c20bbf96a51dc8663f334404a899.fit-760w.JPG",
        },
        {
            id: 2,
            department: "finance",
            firstName: "sunday",
            lastName: "brian",
            email: "sundaypriest@outlook.com",
            img: "https://media3.s-nbcnews.com/j/newscms/2019_41/3047866/191010-japan-stalker-mc-1121_06b4c20bbf96a51dc8663f334404a899.fit-760w.JPG",
        },
    ],

    currentStaff: null,
    loading: false,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_STAFF:
            return {
                ...state,
                loading: true,
            };
        case SET_STAFF:
            return {
                ...state,
                staff: action.payload,
                loading: false,
            };
        case ADD_STAFF:
            return {
                ...state,
                staff: [action.payload, ...state.staff],
            };
        case UPDATE_STAFF:
            return {
                ...state,
                staff: state.staff.map((staff) =>
                    staff.id == action.payload.id ? action.payload : staff
                ),
                loading: false,
            };
        case DELETE_STAFF:
            return {
                ...state,
                // staff: [
                //     ...state.staff.filter(
                //         (staff) => staff.id !== action.payload
                //     ),
                // ],

                staff: [
                    ...state.staff.filter((person) => {
                        return !action.payload.includes(person.id);
                    }),
                ],
                loading: false,
            };
        case SET_CURRENT:
            return {
                ...state,
                currentStaff: action.payload,
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                currentStaff: null,
            };
        case STAFF_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}
