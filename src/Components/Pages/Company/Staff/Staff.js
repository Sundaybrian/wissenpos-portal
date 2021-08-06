import React, { useState } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Content from "../../../Layout/Content/Content";
import { connect } from "react-redux";
import {
    addStaff,
    deleteStaff,
} from "../../../../Redux/actions/staffManagementActions";
import StaffTable from "./StaffTable";

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

function Staff(props) {
    const classes = useStyles();

    const {
        staff: { rows },
        addStaff,
        deleteStaff,
    } = props;

    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subTitle: "",
    });

    const [openPopup, setOpenPopup] = useState(false);
    const [record, setRecord] = useState(null);

    const onDelete = (ids) => {
        // deleted selected drivers
        // handleDelete(ids, job_id);
        console.log(ids);
    };

    // modal for driver data
    const openInPopup = (rider) => {
        setRecord(rider);
        setOpenPopup(true);
    };

    if (loading) {
        return (
            <Content>
                <CircularProgress />
            </Content>
        );
    }

    return (
        <Content>
            {/* <StaffSummaryCards /> */}
            <StaffTable
                openInPopup={openInPopup}
                onDelete={onDelete}
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                handleCreateStaff={addStaff}
            />
            {record && (
                <StaffProfile
                    record={record}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    setRecord={setRecord}
                    handleDelete={deleteStaff}
                    handleSuspend={props.suspendUser}
                />
            )}
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
