import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Content from '../../../Layout/Content/Content';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DriveIcon from '@material-ui/icons/SportsMotorsports';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import SummaryCard from '../../../Base/SummaryCard';
// import VehiclePie from "./VehiclePie";
// import RevenueLine from "./RevenueLine";
// import ExpensesTable from "../Dashboard/ExpensesTable";
// import PeopleDialog from "./PeopleDialog";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { get } from 'lodash';
import PeopleDialog from '../../../Base/DeleteDialog';
import PeopleEditDialog from '../../../Base/People/PeopleDialog';
import { Dialog } from '@material-ui/core';
import StaffEditForm from './StaffEditForm';
// import DriverSuspendActions from "./DriverSuspendActions";

const useStyles = makeStyles(theme => ({
  headerContainer: {
    position: 'relative',
    height: '100px',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  header: {
    display: 'flex',
    position: 'absolute',
    width: 'calc(100%)',
    top: '-70px',
    alignItems: 'flex-end',
    '& > *': {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    },
  },
  spacer: {
    flexGrow: '1',
  },
  avatar: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  actionGroup: {
    display: 'flex',
    width: '330px',
    justifyContent: 'space-between',
    marginRight: 0,
  },
  summaryCards: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  tripCard: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function StaffProfile(props) {
  /* eslint-disable no-unused-vars */
  const classes = useStyles();
  const { record, openPopup, setOpenPopup, setRecord, handleDelete, handleEdit, handleSuspend } = props;

  const handleClose = () => {
    setOpenPopup(false);
    setRecord(null);
  };

  console.log(record);

  return (
    <>
      {record && (
        <Dialog fullScreen open={openPopup} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {record.user.firstName} {record.user.lastName}
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <Content>
            <div
              style={{
                height: '200px',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                filter: 'contrast(75%)',
                backgroundImage: 'url(/img/wallpaper.jpeg)',
              }}
            />
            <div className={classes.headerContainer}>
              <div className={classes.header}>
                <Avatar
                  alt={record.user.firstName}
                  src={''}
                  classes={{
                    root: classes.avatar,
                    circle: classes.circle,
                  }}
                />
                <Typography variant={'h5'}>{record.user.firstName}</Typography>
                <Chip variant={'outlined'} icon={<DriveIcon />} label="Staff" />
                <Rating name="read-only" value={4.3} readOnly />
                <div className={classes.spacer} />
                <div className={classes.actionGroup}>
                  <PeopleEditDialog
                    title="Edit Staff"
                    render={open => (
                      <Button color="primary" variant="contained" startIcon={<EditIcon />} onClick={open}>
                        Edit
                      </Button>
                    )}
                  >
                    <StaffEditForm record={record} closeModal={handleClose} />
                  </PeopleEditDialog>

                  {/* <DriverSuspendActions
                                        record={record}
                                        closeModal={handleClose}
                                        handleSuspend={handleSuspend}
                                    /> */}
                  <PeopleDialog
                    onSave={() => {
                      handleDelete({
                        id: record.user.id,
                        closeModal: handleClose,
                      });
                    }}
                    title="Delete Staff"
                    content={`This action is not reversible. Are you sure you wish delete ${record.user.firstName} ?`}
                    render={open => (
                      <Button color="primary" variant="outlined" startIcon={<DeleteIcon />} onClick={open}>
                        Delete
                      </Button>
                    )}
                  />
                </div>
              </div>
            </div>
            {/* <div className={classes.summaryCards}>
                            <SummaryCard title={"Revenue"} value={"$" + fare} />
                            <SummaryCard title={"Trips"} value={trips} />
                            <SummaryCard title={"Miles"} value={distance} />
                            <SummaryCard title={"Rating"} value={4.32} />
                        </div> */}
            {/* <div className={classes.summaryCards}>
                            <SummaryCard
                                title="Last 30 Days"
                                component={<RevenueLine />}
                            />
                            <SummaryCard
                                title="By Vehicle"
                                component={<VehiclePie />}
                            />
                        </div>
                        <SummaryCard
                            title={"Recent expenses"}
                            component={<ExpensesTable />}
                        /> */}
          </Content>
        </Dialog>
      )}
    </>
  );
}

const mapStateToProps = (state, ownProps) => {};

StaffProfile.propTypes = {
  ui: PropTypes.object.isRequired,
  openInPopup: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(StaffProfile);
