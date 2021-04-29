import {
    LOAD_ORDERS,
    LOAD_CART,
    LOADING_CART,
    CLEAR_LOADING_CART,
} from "../types";

const initialState = {
    orders: null,
    pagingInfo: null,
    filteredOrders: null,
    currentOrder: null,
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_ORDERS:
            return {
                ...state,
                orders: action.payload.results,
                pagingInfo: action.payload.pageInfo,
            };
        case LOADING_CART:
            return {
                ...state,
                loading: true,
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
