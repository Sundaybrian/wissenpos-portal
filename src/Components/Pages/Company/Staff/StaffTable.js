import React, { useState } from "react";
import PropTypes from "prop-types";
// mui
import Checkbox from "@material-ui/core/Checkbox";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// component
import SummaryCard from "../../../Base/SummaryCard";
import useTable from "../../../Base/Table/useTable";
import Loader from "../../../Base/Loader";
import DeletePeopleDialog, {
    DeletePopUpDialog as ConfirmDialog,
} from "../../../Base/DeleteDialog";
// import Content from "../../../Container/Content";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import DriverActions from "./DriverActions";
import PeopleDialog from "../../../Base/People/PeopleDialog";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import DriverCreate from "./DriverCreate";

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
        id: "avatar",
        numeric: false,
        disablePadding: true,
        label: "",
    },
    {
        id: "",
        numeric: false,
        disablePadding: true,
        label: "Driver ID",
    },
    {
        id: "fullName",
        numeric: false,
        disablePadding: true,
        label: "Full Name",
    },

    // {
    //     id: "subscriptionStatus",
    //     numeric: false,
    //     disablePadding: true,
    //     label: "subscription status",
    // },
    {
        id: "email",
        numeric: false,
        disablePadding: true,
        label: "Email",
    },

    // { id: "email", numeric: false, disablePadding: false, label: "Email" },
    {
        id: "phoneNumber",
        numeric: false,
        disablePadding: false,
        label: "PhoneNumber",
    },
    {
        id: "isActive",
        numeric: false,
        disablePadding: false,
        label: "Account Status",
    },
    // {
    //     id: "category",
    //     numeric: false,
    //     disablePadding: false,
    //     label: "Vehicle Category",
    // },
    {
        id: "numberPlate",
        numeric: false,
        disablePadding: false,
        label: "Vehicle Registration",
    },

    {
        id: "Actions",
        numeric: false,
        disablePadding: true,
        label: "Actions",
    },
];

function StaffTable(props) {
    const classes = useStyles();

    const { drivers, openInPopup, onDelete, confirmDialog, setConfirmDialog } =
        props;

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
    } = useTable(drivers, drivers, headCells, filterFn);

    const [snackOpen, setSnackOpen] = React.useState(false);

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const snackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackOpen(false);
    };

    if (!isLoaded(drivers)) {
        return <Loader />;
    }

    if (isEmpty(drivers)) {
        return <SummaryCard title="No riders found" />;
    }

    return (
        <>
            <Snackbar
                open={snackOpen}
                autoHideDuration={2000}
                onClose={snackClose}
            >
                <Alert onClose={snackClose} severity="success">
                    {snackOpen}
                </Alert>
            </Snackbar>
            <div className={classes.root}>
                <Toolbar>
                    <div edge="start" className={classes.grow} />
                    <PeopleDialog
                        title="Create Rider"
                        edge="end"
                        onSave={() => {
                            setSnackOpen("Person added");
                        }}
                        render={(open) => (
                            <Button
                                edge="end"
                                color="primary"
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={open}
                            >
                                Add Person
                            </Button>
                        )}
                    >
                        <DriverCreate />
                    </PeopleDialog>
                    {selected.length > 0 && (
                        <div>
                            <DeletePeopleDialog
                                ids={selected}
                                onSave={() => {
                                    // delete user
                                    onDelete(selected);

                                    setSnackOpen(
                                        `${selected.length} Driver${
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
                            />
                        </div>
                    )}
                </Toolbar>
                <SummaryCard
                    title={"Riders"}
                    value={
                        <>
                            <TblContainer>
                                <TblHead />

                                <TableBody>
                                    {recordsAfterPagingAndSorting().map(
                                        (row, index) => {
                                            const isItemSelected = isSelected(
                                                row.key
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
                                                    }}
                                                    key={`person-${row.key}`}
                                                    selected={isItemSelected}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <TableCell
                                                        padding="checkbox"
                                                        onClick={(e) => {
                                                            selectTableRow(
                                                                row.key
                                                            );
                                                        }}
                                                    >
                                                        <Checkbox
                                                            checked={
                                                                isItemSelected
                                                            }
                                                            inputProps={{
                                                                "aria-labelledby":
                                                                    labelId,
                                                            }}
                                                            onChange={(e) => {
                                                                selectTableRow(
                                                                    row.id
                                                                );
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <Avatar
                                                            alt={row.value.name}
                                                            src={
                                                                row.value
                                                                    .profileImage
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.value.id_number}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        padding="none"
                                                    >
                                                        {row.value.first_name}
                                                        {""}
                                                        {row.value.last_name}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        padding="none"
                                                    >
                                                        {row.value.email}
                                                    </TableCell>
                                                    {/* <TableCell
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {
                                                            row.value
                                                                .subscriptionStatus
                                                        }
                                                    </TableCell> */}
                                                    <TableCell>
                                                        {row.value.phone_number}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.value.is_active
                                                            ? "Active"
                                                            : "Suspended"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.value.number_plate}
                                                    </TableCell>

                                                    <TableCell padding="none">
                                                        <DriverActions
                                                            viewRider={() =>
                                                                openInPopup(row)
                                                            }
                                                        />
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

const mapStateToProps = (state) => {
    console.log(state.firebase, "kwa drivers tables");
    return { drivers: state.firebase.ordered["All Riders"] };
};

const mapActionsToProps = {};

StaffTable.propTypes = {
    ui: PropTypes.object.isRequired,
    openInPopup: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

const enhance = compose(
    connect(mapStateToProps, mapActionsToProps),
    firebaseConnect(["All Riders"])
);

export default enhance(StaffTable);
