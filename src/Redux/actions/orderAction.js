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

//  fetch cart
export const fetchCart = ({ cartID, companyID }) => (dispatch) => {
    dispatch({ type: LOADING_CART });

    const url = `/company${companyID}/order/${cartID}`;

    axios
        .get(url)
        .then((res) => {
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
