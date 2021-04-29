import React from "react";
import PropTypes from "prop-types";
import Content from "../../../Layout/Content/Content";
import OrderTable from "./OrderTable";
import OrderDetail from "./OrderDetail";

import { connect } from "react-redux";
//mui
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({}));

function Orders(props) {
    const {
        order: { loading, currentOrder },
    } = props;

    return (
        <Content>
            <OrderTable />
            {currentOrder && (
                <OrderDetail currentOrder={currentOrder} loading={loading} />
            )}
        </Content>
    );
}

const mapStateToProps = (state) => ({
    order: state.order,
});

const mapActionsToProps = {};

Orders.propTypes = {
    order: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapActionsToProps)(Orders);
