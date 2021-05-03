import {
    LOAD_ORDERS,
    LOAD_CART,
    LOADING_CART,
    CLEAR_LOADING_CART,
    CLEAR_CURRENT_ORDER,
    LOAD_ORDER_STATS,
} from "../types";

const initialState = {
    orders: null,
    pagingInfo: null,
    filteredOrders: null,
    currentOrder: null,
    loading: false,
    stats: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_ORDERS:
            return {
                ...state,
                orders: action.payload.results,
                pagingInfo: action.payload.pageInfo,
            };
        case LOAD_ORDER_STATS:
            return {
                ...state,
                stats: action.payload,
            };
        case LOADING_CART:
            return {
                ...state,
                loading: true,
            };
        case LOAD_CART:
            return {
                ...state,
                laoding: false,
                currentOrder: action.payload,
            };
        case CLEAR_CURRENT_ORDER:
            return {
                ...state,
                loading: false,
                currentOrder: null,
            };
        case CLEAR_LOADING_CART:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}
