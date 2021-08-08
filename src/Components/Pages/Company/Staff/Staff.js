import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StaffSummaryCards from './StaffSummary';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Content from '../../../Layout/Content/Content';
import { connect } from 'react-redux';
import { addStaff, deleteStaff, fetchStaff } from '../../../../Redux/actions/staffManagementActions';
import StaffTable from './StaffTable';
import StaffProfile from './StaffProfile';
import { first } from 'lodash';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import Loader from '../../../Base/Loader';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
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

  const { company, addStaff, deleteStaff, fetchStaff } = props;

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const [openPopup, setOpenPopup] = useState(false);
  const [record, setRecord] = useState(null);

  const onDelete = ids => {
    // deleted selected drivers
    // handleDelete(ids, job_id);
    console.log(ids);
  };

  // modal for driver data
  const openInPopup = rider => {
    setRecord(rider);
    setOpenPopup(true);
  };

  return (
    <Content>
      {!isLoaded(company) ? (
        <Loader />
      ) : (
        <>
          <StaffSummaryCards />
          <StaffTable
            openInPopup={openInPopup}
            company={company}
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
        </>
      )}
    </Content>
  );
}

Staff.propTypes = {
  addStaff: PropTypes.func.isRequired,
  deleteStaff: PropTypes.func.isRequired,
  staff: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    company: first(state.company.company),
  };
};

const mapActionsToProps = {
  addStaff,
  deleteStaff,
  fetchStaff,
};

export default connect(mapStateToProps, mapActionsToProps)(Staff);
