import {
    SET_ERRORS,
    LOADING_UI,
    CLEAR_ERRORS,
    SET_SUCCESS,
    LOADING_DATA,
    LOAD_ORDERS,
} from "../types";
import axios from "axios";
import ActionButton from "../../Components/Controls/ActionButton";

//load orders
export const loadOrders = ({
    companyId,
    nextPage = "",
    limit = 30,
    order_status = "New",
    purchase_status = "paid",
}) => (dispatch) => {
    dispatch({ type: LOADING_DATA });

    axios
        .get(
            `/company/${companyId}/company-orders?nextPage=${nextPage}&limit=${limit}&order_status=${order_status}&purchase_status=${purchase_status}`
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
