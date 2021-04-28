import React, { useEffect } from "react";
import PropTypes from "prop-types";
// mui
import Checkbox from "@material-ui/core/Checkbox";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// component
import SummaryCard from "../../../Base/SummaryCard";
import useTable from "../../../Base/Table/useTable";
import { DeletePopUpDialog as ConfirmDialog } from "../../../Base/DeleteDialog";
// redux
import { connect } from "react-redux";
import { loadOrders } from "../../../../Redux/actions/orderAction";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },

    grow: {
        flexGrow: 1,
    },
    deleteButton: {
        marginLeft: theme.spacing(1),
    },
}));

const headCells = [
    {
        id: "order#",
        numeric: true,
        disablePadding: false,
        label: "#order",
    },
    {
        id: "avatar",
        numeric: false,
        disablePadding: true,
        label: "",
    },
    {
        id: "customer",
        numeric: false,
        disablePadding: true,
        label: "customer",
    },

    {
        id: "payment status",
        numeric: false,
        disablePadding: true,
        label: "payment",
    },
    {
        id: "order status",
        numeric: false,
        disablePadding: true,
        label: "order status",
    },

    // { id: "email", numeric: false, disablePadding: false, label: "Email" },
    // {
    //     id: "phoneNumber",
    //     numeric: false,
    //     disablePadding: false,
    //     label: "PhoneNumber",
    // },
    {
        id: "date created",
        numeric: false,
        disablePadding: false,
        label: "date created",
    },
    { id: "subtotal", numeric: true, disablePadding: false, label: "subtotal" },
];

function OrderTable() {
    return <div></div>;
}

const mapStateToProps = (state) => ({
    ui: state.ui,
    order: state.order,
});

const mapActionsToProps = {
    loadOrders,
};

OrderTable.propTypes = {
    loadOrders: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(OrderTable);
