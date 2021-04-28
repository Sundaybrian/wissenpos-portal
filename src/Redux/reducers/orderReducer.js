import { LOAD_ORDERS } from "../types";

const initialState = {
    orders: null,
    pagingInfo: null,
    filteredOrders: null,
    currentOrder: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_ORDERS:
            return {
                ...state,
                orders: action.payload.results,
                pagingInfo: action.payload.pageInfo,
            };
        default:
            return state;
    }
}
