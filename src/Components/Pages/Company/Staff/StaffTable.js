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
import { connect } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import StaffActions from "./StaffActions";
import PeopleDialog from "../../../Base/People/PeopleDialog";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import StaffCreate from "./StaffCreate";

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
        label: "Staff ID",
    },
    {
        id: "fullName",
        numeric: false,
        disablePadding: true,
        label: "Full Name",
    },

    {
        id: "email",
        numeric: false,
        disablePadding: true,
        label: "Email",
    },

    {
        id: "role",
        numeric: false,
        disablePadding: false,
        label: "role",
    },
    {
        id: "isActive",
        numeric: false,
        disablePadding: false,
        label: "Account Status",
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

    const {
        staff,
        openInPopup,
        onDelete,
        confirmDialog,
        setConfirmDialog,
        handleCreateStaff,
    } = props;

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
    } = useTable(staff, staff, headCells, filterFn);

    const [snackOpen, setSnackOpen] = React.useState(false);

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const snackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackOpen(false);
    };

    if (!isLoaded(staff)) {
        return <Loader />;
    }

    if (isEmpty(staff)) {
        return <SummaryCard title="No staff found, create one" />;
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
                        title="Create Staff"
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
                        <StaffCreate handleCreateStaff={handleCreateStaff} />
                    </PeopleDialog>
                    {selected.length > 0 && (
                        <div>
                            <DeletePeopleDialog
                                ids={selected}
                                onSave={() => {
                                    // delete user
                                    onDelete(selected);

                                    setSnackOpen(
                                        `${selected.length} Staff${
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
                    title={"Staff"}
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
                                                    }}
                                                    key={`person-${row.id}`}
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
                                                            alt={row.firstName}
                                                            src={""}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        padding="none"
                                                    >
                                                        {row.firstName}
                                                        {""}
                                                        {row.lastName}
                                                    </TableCell>
                                                    <TableCell
                                                        align="left"
                                                        padding="none"
                                                    >
                                                        {row.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.role}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.is_active
                                                            ? "Active"
                                                            : "Suspended"}
                                                    </TableCell>

                                                    <TableCell padding="none">
                                                        <StaffActions
                                                            viewStaff={() =>
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
    return { staff: state.staffManagement.staff };
};

const mapActionsToProps = {};

StaffTable.propTypes = {
    ui: PropTypes.object.isRequired,
    openInPopup: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    confirmDialog: PropTypes.object.isRequired,
    setConfirmDialog: PropTypes.func.isRequired,
    handleCreateStaff: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(StaffTable);
