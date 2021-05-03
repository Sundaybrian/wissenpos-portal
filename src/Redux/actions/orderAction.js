import {
    SET_ERRORS,
    LOADING_UI,
    CLEAR_ERRORS,
    SET_SUCCESS,
    LOADING_DATA,
    LOAD_ORDERS,
    LOAD_CART,
    LOADING_CART,
    CLEAR_LOADING_CART,
    CLEAR_CURRENT_ORDER,
    STOP_LOADING_DATA,
} from "../types";
import axios from "axios";

//load orders
export const loadOrders = ({
    companyId,
    nextPage = "",
    limit = 30,
    order_status = "New",
    purchase_status = "unpaid",
}) => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    axios
        .get(
            `/company/${companyId}/order/company-orders?nextPage=${nextPage}&limit=${limit}&order_status=${order_status}&purchase_status=${purchase_status}`
        )
        .then((res) => {
            dispatch({
                type: LOAD_ORDERS,
                payload: res.data,
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((error) => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data,
            });
        });
};

// load order stats
export const loadOrderStats = ({ companyID }) => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    const url = `/company/${companyID}/order/orderStats`;
    axios
        .get(url)
        .then((res) => {
            dispatch({
                type: LOAD_ORDER_STATS,
                payload: res.data,
            });

            dispatch({ type: STOP_LOADING_DATA });
        })
        .catch((error) => {
            dispatch({ type: STOP_LOADING_DATA });
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data,
            });
        });
};

//  fetch cart
export const fetchCart = ({ cartID, companyID }) => (dispatch) => {
    dispatch({ type: LOADING_CART });

    const url = `/company/${companyID}/order/${cartID}`;

    axios
        .get(url)
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: LOAD_CART,
                payload: res.data,
            });

            dispatch({ type: CLEAR_LOADING_CART });
        })
        .catch((error) => {
            dispatch({ type: CLEAR_LOADING_CART });
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data,
            });
        });
};

// set current order to null
export const clearCurrentOrder = () => (dispatch) => {
    dispatch({
        type: CLEAR_CURRENT_ORDER,
    });
};
