import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SummaryCard from '../../../Base/SummaryCard';
import { first } from 'lodash';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  summaryCards: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const staffSuspended = (staffArr, state) => {
  return staffArr.filter(m => m.user.active === state);
};

function StaffSummary(props) {
  const classes = useStyles();
  const {
    company: { id },
    loading,
    staff,
  } = props;

  if (loading || staff.length == 0) {
    return (
      <div className={classes.summaryCards}>
        <SummaryCard title={'Total'} value={0} />
        <SummaryCard title={'Active'} value={0} />
        <SummaryCard title={'Suspended'} value={0} />
      </div>
    );
  }

  return (
    <div className={classes.summaryCards}>
      {staff && (
        <>
          <SummaryCard title={'Total'} value={staff.length} />
          <SummaryCard title={'Active'} value={staffSuspended(staff, true).length} />
          <SummaryCard title={'Suspended'} value={staffSuspended(staff, false).length} />
        </>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  loading: state.ui.loading,
  company: first(state.company.company),
  staff: state.staffManagement.staff,
});

const mapActionsToProps = {};

StaffSummary.propTypes = {
  loading: PropTypes.bool.isRequired,
  company: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(StaffSummary);
