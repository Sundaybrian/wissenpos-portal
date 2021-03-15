import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
// mui
import Snackbar from "@material-ui/core/Snackbar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Content from "../Dashboard/Content";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableBody from "@material-ui/core/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
// component
import Alert from "../../../Base/Alert";
import DeletePeopleDialog from "../../../Base/People/DeletePeopleDialog";
import SummaryCard from "../../../Base/SummaryCard";
import Content from "../../../Layout/Content/Content";
import useTable from "../../../Base/Table/useTable";
// redux
import { useSelector, useDispatch, connect } from "react-redux";
import {
    addStaff,
    deleteStaff,
} from "../../../../Redux/actions/staffManagementActions";

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
        id: "avatar",
        numeric: false,
        disablePadding: true,
        label: "",
    },
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name",
    },
    { id: "id", numeric: true, disablePadding: false, label: "ID" },
    { id: "email", numeric: false, disablePadding: false, label: "Email" },
    {
        id: "phoneNumber",
        numeric: false,
        disablePadding: false,
        label: "PhoneNumber",
    },
];

const records = [
    {
        id: 1,
        department: "finance",
        firstName: "sunday",
        lastName: "brian",
        email: "sundaypriest@outlook.com",
        img:
            "https://media3.s-nbcnews.com/j/newscms/2019_41/3047866/191010-japan-stalker-mc-1121_06b4c20bbf96a51dc8663f334404a899.fit-760w.JPG",
    },
    {
        id: 2,
        department: "finance",
        firstName: "sunday",
        lastName: "brian",
        email: "sundaypriest@outlook.com",
        img:
            "https://media3.s-nbcnews.com/j/newscms/2019_41/3047866/191010-japan-stalker-mc-1121_06b4c20bbf96a51dc8663f334404a899.fit-760w.JPG",
    },
];

export default function Staff(props) {
    const classes = useStyles();

    const { staff, addStaff, deleteStaff } = props;

    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            return items;
        },
    });
    const {
        handleSelectAllClick,
        selected,
        selectTableRow,
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
    } = useTable(records, headCells, filterFn);
    const [snackOpen, setSnackOpen] = React.useState(false);

    const rows = [...records];
    const [loading, setLoading] = useState(false);
    const error = false;
    // todo with snacks
    const [snackOpen, setSnackOpen] = React.useState(false);
    const dispatch = useDispatch();

    let history = useHistory();

    if (loading) {
        return (
            <Content>
                <CircularProgress />
            </Content>
        );
    }

    if (error) return `Error! ${error.message}`;

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const snackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackOpen(false);
    };

    return (
        <Content>
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
                    {/* <PeopleDialog
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
                    /> */}
                    {selected.length > 0 && (
                        <Tooltip title={"Delete"}>
                            <DeletePeopleDialog
                                ids={selected}
                                onSave={() => {
                                    // delete user
                                    deleteStaff(selected);
                                    // dispatch(remove(selected));

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
                            />
                        </Tooltip>
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
                                                        history.push(
                                                            `/people/${row.id}`
                                                        );
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
                                                                "aria-labelledby": labelId,
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
                                                            src={row.img}
                                                        />
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.firstName}
                                                        {""}
                                                        {row.firstName}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.id}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {row.department}
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
            </div>
        </Content>
    );
}

Staff.propTypes = {
    addStaff: PropTypes.func.isRequired,
    deleteStaff: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    staff: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    ui: state.ui,
    staff: state.staffManagement,
});

const mapActionsToProps = {
    addStaff,
    deleteStaff,
};

export default connect(mapStateToProps, mapActionsToProps)(Staff);
