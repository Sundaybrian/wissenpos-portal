import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
//
import PeopleTable from "../../../Shared/Table/PeopleTable";
// redux
import { useSelector, useDispatch, connect } from "react-redux";
import { addStaff } from "../../../../Redux/actions/staffManagementActions";

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

function Staff(props) {
    const {} = props;
    return <PeopleTable headCells={headCells} />;
}

Staff.propTypes = {
    addStaff: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired,
    staffManagement: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    ui: state.ui,
    staffManagement: state.staffManagement,
});

const mapActionsToProps = {
    addStaff,
};

export default connect(mapStateToProps, mapActionsToProps)(Staff);
