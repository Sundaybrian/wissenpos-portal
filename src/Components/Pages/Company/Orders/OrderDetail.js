import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SummaryCard from '../../../Base/SummaryCard';
import makeStyles from '@material-ui/core/styles/makeStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { fetchCart, clearCurrentOrder } from '../../../../Redux/actions/orderAction';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },

  root1: {
    display: 'flex',
    flexDirection: 'column',
    width: '360px',
    flexShrink: 0,
    height: '100vh',
    minHeight: '100vh',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
    overflowY: 'scroll',
    marginTop: theme.spacing(5),
  },
}));

export function AlignItemsList(props) {
  const { items, clearCurrentOrder } = props;
  const classes = useStyles();

  const evalTotal = t => {
    return t.reduce((accumulator, currentValue, index) => {
      let x = currentValue.quantity * currentValue.price;
      return accumulator + x;
    }, 0);
  };

  return (
    <>
      {' '}
      {items.map((item, index) => (
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={item.id} src={item.image_url} />
            </ListItemAvatar>
            <ListItemText
              primary={`${item.name} * ${item.quantity}`}
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                    @:ksh
                  </Typography>
                  {item.quantity}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={`Total Payable:`}
            secondary={
              <React.Fragment>
                <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                  ksh{' '}
                </Typography>
                {evalTotal(items)}
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start" spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => clearCurrentOrder()}
            style={{
              marginRight: '15px',
            }}
          >
            Close
          </Button>

          <Button variant="contained" color="primary" disabled>
            Action
          </Button>
        </ListItem>
      </List>
    </>
  );
}

function OrderDetail(props) {
  const {
    currentOrder: cart,
    loading,
    fetchCart,
    clearCurrentOrder,
    company: { company },
  } = props;

  const classes = useStyles();

  // useEffect(() => {
  //     // fecth cart items
  //     fetchCart({
  //         cart_id: cart.cart_id,
  //         company_id: company[0].id,
  //     });
  // }, [cart]);

  return (
    <div className={classes.root1}>
      <SummaryCard
        title={cart.cart_id}
        component={<AlignItemsList items={cart.items} clearCurrentOrder={clearCurrentOrder} />}
      />
    </div>
  );
}
const mapStateToProps = state => ({
  company: state.company,
});
const mapActionsToProps = {
  fetchCart,
  clearCurrentOrder,
};

OrderDetail.propTypes = {
  cart: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchCart: PropTypes.func.isRequired,
  clearCurrentOrder: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(OrderDetail);
