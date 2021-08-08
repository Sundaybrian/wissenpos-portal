import React, { useEffect, useState } from "react";
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
import { loadOrders, fetchCart } from "../../../../Redux/actions/orderAction";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },

    grow: {
        flexGrow: 0.6,
        flexShrink: 0.6,
    },
    deleteButton: {
        marginLeft: theme.spacing(1),
    },
}));

const headCells = [
    {
        id: "#order",
        numeric: true,
        disablePadding: false,
        label: "#order",
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

    {
        id: "Actions",
        numeric: false,
        disablePadding: true,
        label: "Actions",
    },
];

function OrderTable(props) {
    const classes = useStyles();

    const {
        ui,
        order: { orders },
        company,
        loadOrders,
        fetchCart,
    } = props;

    useEffect(() => {
        loadOrders({
            companyId: company.id,
            nextPage: undefined,
            limit: undefined,
            order_status: undefined,
            purchase_status: undefined,
        });
    }, []);

    /* eslint-disable no-unused-vars */
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });

    const {
        selected,
        setSelected,
        selectTableRow,
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = useTable(orders, orders, headCells, filterFn);

    const [snackOpen, setSnackOpen] = React.useState(false);
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        message: "",
    });

    // TODO: USE WITH ACTIONS EG..DISPATCH ORDER, CANCEL ORDERS ETC
    // const onDelete = (ids) => {
    //     // deleted selected proposals
    //     handleDelete(ids, job_id);
    // };

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const snackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackOpen(false);
    };

    if (orders == null) {
        return <SummaryCard title="No orders found" />;
    }

    return (
        <>
            <div className={classes.root}>
                <Toolbar>
                    <div edge="start" className={classes.grow} />

                    {selected.length > 0 && (
                        <div>
                            {/* <DeletePeopleDialog
                                ids={selected}
                                onSave={() => {
                                    // delete user
                                    onDelete(selected);

                                    setSnackOpen(
                                        `${selected.length} User${
                                            selected.length > 1 ? "s" : ""
                                        } Deleted`
                                    );
                                    setSelected([]);
                                }}
                                render={(open) => (
                                    <Button
                                        className={classes.deleteButton}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        onClick={open}
                                    >
                                        {" "}
                                        Delete {selected.length} selected
                                    </Button>
                                )}
                            /> */}
                        </div>
                    )}
                </Toolbar>
                <SummaryCard
                    title={"Orders"}
                    value={
                        <>
                            <TblContainer>
                                <TblHead />

                                <TableBody>
                                    {recordsAfterPagingAndSorting().map(
                                        (row, index) => {
                                            const isItemSelected = isSelected(
                                                row.id
                                            );
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={
                                                        isItemSelected
                                                    }
                                                    tabIndex={-1}
                                                    onClick={(e) => {
                                                        if (
                                                            e.target.type ===
                                                                "checkbox" ||
                                                            e.target.className.indexOf(
                                                                "Checkbox"
                                                            ) > 0
                                                        ) {
                                                            return;
                                                        }
                                                        fetchCart({
                                                            companyID:
                                                                company.id,
                                                            cartID: row.cart_id,
                                                        }); // to open order details card
                                                    }}
                                                    key={`order-${row.id}`}
                                                    selected={isItemSelected}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <TableCell
                                                        padding="checkbox"
                                                        onClick={(e) => {
                                                            selectTableRow(
                                                                row.id
                                                            );
                                                        }}
                                                    >
                                                        <Checkbox
                                                            checked={
                                                                isItemSelected
                                                            }
                                                            inputProps={{
                                                                "aria-labelledby": labelId,
                                                            }}
                                                            onChange={(e) => {
                                                                selectTableRow(
                                                                    row.id
                                                                );
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        // padding="none"
                                                    >
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        customer name
                                                    </TableCell>
                                                    <TableCell
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.purchase_status}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.order_status}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.created_at}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.subtotal}
                                                    </TableCell>
                                                    <TableCell>
                                                        Actions here
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        }
                                    )}
                                </TableBody>
                            </TblContainer>
                            <TblPagination />
                        </>
                    }
                />

                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    ui: state.ui,
    order: state.order,
    company: state.company.company[0],
});

const mapActionsToProps = {
    loadOrders,
    fetchCart,
};

OrderTable.propTypes = {
    loadOrders: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    company: PropTypes.object.isRequired,
    fetchCart: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(OrderTable);
