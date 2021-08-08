import React from 'react';
import PropTypes from 'prop-types';
import Content from '../../../Layout/Content/Content';
import OrderTable from './OrderTable';
import OrderDetail from './OrderDetail';

import { connect } from 'react-redux';
//mui
import makeStyles from '@material-ui/core/styles/makeStyles';
import OrderSummary from './OrderSummary';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function Orders(props) {
  const {
    order: { loading, currentOrder },
  } = props;

  const classes = useStyles();

  return (
    <Content>
      <div className={classes.root}>
        <OrderSummary />
        <OrderTable />
        {currentOrder && <OrderDetail currentOrder={currentOrder} loading={loading} />}
      </div>
    </Content>
  );
}

const mapStateToProps = state => ({
  order: state.order,
});

const mapActionsToProps = {};

Orders.propTypes = {
  order: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapActionsToProps)(Orders);
