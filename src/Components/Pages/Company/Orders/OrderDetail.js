import React from "react";
import SummaryCard from "../../../Base/SummaryCard";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "red",
        width: "340px",
        flexShrink: 0,
        height: "100vh",
    },
}));

function OrderDetail(props) {
    const { currentOrder: cart, loading } = props;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <SummaryCard title={cart.cart_id} />;
        </div>
    );
}

export default OrderDetail;
